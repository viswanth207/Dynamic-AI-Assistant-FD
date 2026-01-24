import React, { useState, useRef, useEffect } from 'react'

function Navbar({ onHomeClick, onCreateClick, onMyAssistantsClick, onLoginClick, onLogoutClick, user, isAuthenticated }) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileRef = useRef(null)

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen)
  }

  const handleProfileMenuClick = (action) => {
    setProfileMenuOpen(false)
    action()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div onClick={onHomeClick} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}>
          <img
            src="/datamind-logo.png"
            alt="DataMind Logo"
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'contain'
            }}
          />
          <span style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            letterSpacing: '-0.2px'
          }}>
            DataMind
          </span>
        </div>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} style={{
            color: '#e2e8f0',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
            onMouseOver={(e) => e.currentTarget.style.color = 'white'}
            onMouseOut={(e) => e.currentTarget.style.color = '#e2e8f0'}
          >
            Home
          </a>
          <a href="#features" style={{
            color: '#e2e8f0',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
            onMouseOver={(e) => e.currentTarget.style.color = 'white'}
            onMouseOut={(e) => e.currentTarget.style.color = '#e2e8f0'}
          >
            Features
          </a>
          <a href="#how-it-works" style={{
            color: '#e2e8f0',
            textDecoration: 'none',
            fontSize: '0.9375rem',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}
            onMouseOver={(e) => e.currentTarget.style.color = 'white'}
            onMouseOut={(e) => e.currentTarget.style.color = '#e2e8f0'}
          >
            How it Works
          </a>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={onCreateClick} style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Create Assistant
              </button>

              <div ref={profileRef} style={{ position: 'relative' }}>
                <button onClick={toggleProfileMenu} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </button>

                {profileMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '200px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}>
                    <div style={{
                      padding: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '8px'
                    }}>
                      <div style={{ color: 'white', fontSize: '0.875rem' }}>{user?.email}</div>
                    </div>
                    <button onClick={() => handleProfileMenuClick(onMyAssistantsClick)} style={{
                      width: '100%',
                      padding: '10px 12px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: '#cbd5e1',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      transition: 'background 0.2s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                    >
                      My Assistants
                    </button>
                    <button onClick={() => handleProfileMenuClick(onLogoutClick)} style={{
                      width: '100%',
                      padding: '10px 12px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      color: '#f87171',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      transition: 'background 0.2s'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button onClick={onLoginClick} style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
