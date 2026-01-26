import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './utils/AuthContext'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import CreateFormPage from './pages/CreateFormPage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MyAssistantsPage from './pages/MyAssistantsPage'

function AppContent() {
  const [currentPage, setCurrentPage] = useState(() => {
    console.log("Dynamic Assistant Frontend v1.1 - Production API");
    return localStorage.getItem('currentPage') || 'landing'
  })
  const [currentAssistant, setCurrentAssistant] = useState(() => {
    const savedAssistant = localStorage.getItem('currentAssistant')
    return savedAssistant ? JSON.parse(savedAssistant) : null
  })

  const { user, loading, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage)
  }, [currentPage])

  useEffect(() => {
    if (currentAssistant) {
      localStorage.setItem('currentAssistant', JSON.stringify(currentAssistant))
    } else {
      localStorage.removeItem('currentAssistant')
    }
  }, [currentAssistant])

  const navigateToLanding = () => {
    setCurrentPage('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToCreateForm = () => {
    if (!isAuthenticated) {
      setCurrentPage('login')
      return
    }
    setCurrentPage('create')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToChat = (assistantId, assistantName) => {
    setCurrentAssistant({ id: assistantId, name: assistantName })
    setCurrentPage('chat')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToLogin = () => {
    setCurrentPage('login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToSignup = () => {
    setCurrentPage('signup')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToMyAssistants = () => {
    if (!isAuthenticated) {
      setCurrentPage('login')
      return
    }
    setCurrentPage('assistants')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('currentPage')
    localStorage.removeItem('currentAssistant')
    navigateToLanding()
  }

  const [showSlowLoadingMessage, setShowSlowLoadingMessage] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowSlowLoadingMessage(true);
      }, 8000); // Show message after 8 seconds
      return () => clearTimeout(timer);
    } else {
      setShowSlowLoadingMessage(false);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
        <div className="spinner"></div>
        <p>Connecting to backend...</p>
        {showSlowLoadingMessage && (
          <p style={{ color: '#888', maxWidth: '400px', textAlign: 'center', padding: '0 20px' }}>
            Note: The free tier server on Render may take up to 60 seconds to wake up from inactivity. Please wait...
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <Navbar
        onHomeClick={navigateToLanding}
        onCreateClick={navigateToCreateForm}
        onMyAssistantsClick={navigateToMyAssistants}
        onLoginClick={navigateToLogin}
        onLogoutClick={handleLogout}
        user={user}
        isAuthenticated={isAuthenticated}
      />
      <div className="app-content">
        {currentPage === 'landing' && (
          <LandingPage onGetStarted={navigateToCreateForm} />
        )}
        {currentPage === 'login' && (
          <LoginPage
            onSignupClick={navigateToSignup}
            onLoginSuccess={() => {
              // Redirect to what was intended or landing
              const dest = localStorage.getItem('currentPage') === 'login' ? 'landing' : currentPage
              setCurrentPage(dest || 'landing')
            }}
          />
        )}
        {currentPage === 'signup' && (
          <SignupPage
            onLoginClick={navigateToLogin}
            onSignupSuccess={() => setCurrentPage('landing')}
          />
        )}
        {currentPage === 'create' && (
          <CreateFormPage
            onBack={navigateToLanding}
            onSuccess={navigateToChat}
          />
        )}
        {currentPage === 'assistants' && (
          <MyAssistantsPage
            onSelectAssistant={navigateToChat}
            onCreateNew={navigateToCreateForm}
            onBack={navigateToLanding}
          />
        )}
        {currentPage === 'chat' && currentAssistant && (
          <ChatPage
            assistantId={currentAssistant.id}
            assistantName={currentAssistant.name}
            onNewAssistant={navigateToCreateForm}
            onHome={navigateToLanding}
          />
        )}
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
