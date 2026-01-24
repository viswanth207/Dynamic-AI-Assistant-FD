import React from 'react'

function ChatSidebar({
  conversations,
  currentConversationId,
  onNewConversation,
  onSwitchConversation,
  onDeleteConversation,
  isOpen,
  sampleQuestions = [],
  onSampleQuestionClick
}) {
  return (
    <div className={`chat-sidebar ${isOpen ? '' : 'hidden'}`}>
      <div className="sidebar-header" style={{ padding: '20px 16px' }}>
        <button className="new-chat-btn" onClick={onNewConversation} style={{
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.8rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'white',
          width: '100%'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '400' }}>+</span> New Chat
        </button>
      </div>

      <div className="sidebar-content-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

        {/* History Section - Flexible & Scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div className="sidebar-section-title">History</div>
          <div className="conversation-list" style={{ paddingBottom: '20px' }}>
            {conversations.length === 0 ? (
              <div style={{ padding: '0 20px', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                No chat history
              </div>
            ) : (
              conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`conversation-item ${conversation.id === currentConversationId ? 'active' : ''}`}
                  onClick={() => onSwitchConversation(conversation.id)}
                >
                  <span className="conversation-title" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: conversation.id === currentConversationId ? '600' : '400',
                    fontSize: '0.8rem',
                    flex: 1
                  }}>
                    {conversation.title}
                  </span>
                  <button
                    className="delete-conv-btn"
                    onClick={(e) => {
                      onDeleteConversation(conversation.id, e);
                    }}
                    title="Delete chat"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sample Questions Section - Fixed Height / Independent Scroll */}
        {sampleQuestions.length > 0 && (
          <div className="recommended-questions-section" style={{
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            maxHeight: '40%', /* Limit height so it doesn't take over if history is long */
            overflowY: 'auto',
            paddingBottom: '10px'
          }}>
            <div className="sidebar-section-title" style={{ margin: '16px 20px 12px' }}>SAMPLE QUESTIONS</div>
            <div className="sample-questions-list" style={{ padding: '0 20px 20px' }}>
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  className="sample-q-btn"
                  onClick={() => onSampleQuestionClick(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatSidebar
