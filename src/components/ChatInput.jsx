import React, { useState, useRef, useEffect } from 'react'

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    adjustHeight()
  }, [message])

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 250) + 'px'
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="input-area-wrapper">
      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
        <div className="input-container">
          <textarea
            className="chat-input"
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows="1"
            disabled={disabled}
          />
        </div>
        <button
          type="submit"
          className="send-btn"
          disabled={disabled || !message.trim()}
        >
          Send
          <svg viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
