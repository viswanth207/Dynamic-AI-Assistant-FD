import React, { useEffect, useRef } from 'react'

function ChatMessages({ messages, assistantName, isLoading }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const escapeHtml = (text) => {
    return text.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\n/g, '<br>')
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="messages-container">
      {messages.length === 0 && !isLoading && (
        <div className="welcome-message">
          <div className="welcome-icon">◈</div>
          <h3>System Online</h3>
          <p>Assistant <strong>{assistantName}</strong> is ready. Initialize query.</p>
        </div>
      )}

      {messages.map((message, index) => {
        const isUser = message.role === 'user'
        const avatar = isUser ? '👤' : '🤖'
        const time = formatTime(message.timestamp)

        return (
          <div key={index} className={`message-row ${message.role}`}>
            <div className={`message-avatar ${message.role}`}>{avatar}</div>

            <div className="message-bubble">
              {isUser ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', color: 'white' }}>model vs am</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)' }}>{time}</span>
                </div>
              ) : null}

              <div
                dangerouslySetInnerHTML={{ __html: escapeHtml(message.content) }}
              />

              {!isUser && (
                <div style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                  {time}
                </div>
              )}
            </div>
          </div>
        )
      })}

      {isLoading && (
        <div className="message-row assistant">
          <div className="message-avatar assistant">🤖</div>
          <div className="message-bubble">
            <div className="typing-indicator" style={{ display: 'flex', gap: '4px', padding: '10px 0' }}>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages
