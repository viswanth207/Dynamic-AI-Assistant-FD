import React, { useState, useEffect, useRef } from 'react'
import ChatSidebar from '../components/ChatSidebar'
import ChatMessages from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'
import DataInsightsSidebar from '../components/DataInsightsSidebar'
import {
  getAllConversations,
  saveConversation,
  getConversation,
  deleteConversationById,
  generateUUID
} from '../utils/storage'
import { fetchWithTimeout } from '../utils/api'

function ChatPage({ assistantId, assistantName, onNewAssistant, onHome }) {
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [assistantDetails, setAssistantDetails] = useState({
    attributes: [],
    sample_questions: [],
    data_source_type: ''
  })

  useEffect(() => {
    loadConversations()
    loadChatHistoryFromBackend()
    fetchAssistantDetails()

    const allConversations = getAllConversations()
    const assistantConversations = Object.values(allConversations)
      .filter(conv => conv.assistantId === assistantId)

    if (assistantConversations.length > 0) {
      const mostRecent = assistantConversations.sort((a, b) =>
        new Date(b.updatedAt) - new Date(a.updatedAt)
      )[0]
      switchConversation(mostRecent.id)
    } else {
      startNewConversation()
    }
  }, [assistantId])

  const fetchAssistantDetails = async () => {
    try {
      const response = await fetchWithTimeout(`/api/assistants/${assistantId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setAssistantDetails({
          attributes: data.attributes || [],
          sample_questions: data.sample_questions || [],
          data_source_type: data.data_source_type,
          graph_data: data.graph_data || {}
        })
      }
    } catch (error) {
      console.error('Error fetching assistant details:', error)
    }
  }

  const loadChatHistoryFromBackend = async () => {
    try {
      const response = await fetchWithTimeout(`/api/assistants/${assistantId}/chat-history?limit=100`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.messages && data.messages.length > 0) {
          // Convert backend messages to frontend format
          const formattedMessages = data.messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp
          }))
          setMessages(formattedMessages)

          // Save to local storage
          if (currentConversationId) {
            const conversation = getConversation(currentConversationId)
            if (conversation) {
              conversation.messages = formattedMessages
              saveConversation(currentConversationId, conversation)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  const loadConversations = () => {
    const allConversations = getAllConversations()
    const filtered = Object.values(allConversations)
      .filter(conv => conv.assistantId === assistantId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    setConversations(filtered)
  }

  const startNewConversation = () => {
    const conversationId = generateUUID()
    const conversationData = {
      id: conversationId,
      assistantId,
      assistantName,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: 'New Chat'
    }

    saveConversation(conversationId, conversationData)
    setCurrentConversationId(conversationId)
    setMessages([])
    loadConversations()
  }

  const switchConversation = (conversationId) => {
    const conversation = getConversation(conversationId)
    if (!conversation) return

    setCurrentConversationId(conversationId)
    setMessages(conversation.messages)
  }

  const deleteConversation = (conversationId, event) => {
    event.stopPropagation()

    if (!window.confirm('Delete this conversation?')) return

    deleteConversationById(conversationId)

    if (conversationId === currentConversationId) {
      startNewConversation()
    } else {
      loadConversations()
    }
  }

  const saveMessage = (role, content) => {
    if (!currentConversationId) {
      startNewConversation()
      return
    }

    const conversation = getConversation(currentConversationId)
    if (!conversation) return

    const userMessagesBefore = conversation.messages.filter(m => m.role === 'user').length

    conversation.messages.push({
      role,
      content,
      timestamp: new Date().toISOString()
    })
    conversation.updatedAt = new Date().toISOString()

    if (role === 'user' && userMessagesBefore === 0) {
      const title = content.length > 30
        ? content.substring(0, 30) + '...'
        : content
      conversation.title = title
    }

    saveConversation(currentConversationId, conversation)

    if (role === 'user' && userMessagesBefore === 0) {
      loadConversations()
    }
  }

  const sendMessage = async (message) => {
    if (!message.trim() || !assistantId) return

    if (!currentConversationId) {
      startNewConversation()
    }

    setIsLoading(true)

    // Optimistically add user message
    const newUserMessage = { role: 'user', content: message, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, newUserMessage])
    saveMessage('user', message)

    // Create a 2-second delay bubble promise
    const thinkingDelay = new Promise(resolve => setTimeout(resolve, 2000))
    let assistantMessageAdded = false
    const assistantMessageId = Date.now()
    let currentResponse = ""

    try {
      // Use standard fetch for streaming to handle ReadableStream correctly
      // but use relative path to leverage API_BASE_URL from a helper or manually construction
      // Actually fetchWithTimeout is okay if we don't need abort on timeout mid-stream? 
      // Timeouts on streams are tricky. Usually we want a connection timeout.
      // Let's use fetchWithTimeout but maybe with a longer timeout?
      // Or just standard fetch if we want to stream indefinitely.
      // But the user asked for "frontend timeouts". 
      // A common pattern is to timeout the *start* of the stream.
      // My fetchWithTimeout times out the whole request?
      // "const id = setTimeout(() => controller.abort(), timeout);"
      // Yes, it aborts after timeout. This breaks long streams.
      // So for streaming, we should probably NOT use fetchWithTimeout or use a very long one.
      // Or just implement connection timeout.
      // However, the requested task is "add frontend timeouts".
      // I will use fetchWithTimeout but maybe increase timeout for chat?
      // Or better: keep using native fetch for stream but fix the URL.
      // I will fix the URL first.

      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://7ba3a0ff89c0.ngrok-free.app';
      const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          assistant_id: assistantId,
          message: message
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || error.error || 'Failed to get response')
      }

      // Read the stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Wait for the thinking delay to finish before showing content
      await thinkingDelay

      // Hide thinking symbol and add message bubble
      setIsLoading(false)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        id: assistantMessageId
      }])
      assistantMessageAdded = true

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.trim() === '') continue

          try {
            const cleanLine = line.replace(/^data: /, '').trim()
            if (!cleanLine) continue

            const data = JSON.parse(cleanLine)

            if (data.type === 'content') {
              currentResponse += data.data
              setMessages(prev => prev.map(msg =>
                msg.id === assistantMessageId
                  ? { ...msg, content: currentResponse }
                  : msg
              ))
            } else if (data.type === 'sources') {
              console.log("Sources:", data.data)
            } else if (data.type === 'error') {
              throw new Error(data.data)
            }
          } catch (e) {
            console.warn("Error parsing chunk:", e)
          }
        }
      }

      // Save final message
      saveMessage('assistant', currentResponse)

    } catch (error) {
      console.error('Error sending message:', error)
      setIsLoading(false)
      const errorMsg = `Sorry, I encountered an error: ${error.message}`

      if (assistantMessageAdded) {
        setMessages(prev => prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: errorMsg }
            : msg
        ))
      } else {
        const errMessage = { role: 'assistant', content: errorMsg, timestamp: new Date().toISOString() }
        setMessages(prev => [...prev, errMessage])
      }
      saveMessage('assistant', errorMsg)
    }
  }

  return (
    <div className="page active chat-page-wrapper">
      <div className="chat-layout-triple">
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewConversation={startNewConversation}
          onSwitchConversation={switchConversation}
          onDeleteConversation={deleteConversation}
          isOpen={isSidebarOpen}
          sampleQuestions={assistantDetails.sample_questions}
          onSampleQuestionClick={sendMessage}
        />

        <div className="chat-center-column">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>{assistantName}</h3>
              <span className="status-badge">Active</span>
            </div>
          </div>

          <ChatMessages
            messages={messages}
            assistantName={assistantName}
            isLoading={isLoading}
          />

          <ChatInput
            onSendMessage={sendMessage}
            disabled={isLoading}
          />
        </div>

        <DataInsightsSidebar
          attributes={assistantDetails.attributes}
          data_source_type={assistantDetails.data_source_type}
          assistantName={assistantName}
          graphData={assistantDetails.graph_data}
        />
      </div>
    </div>
  )
}

export default ChatPage
