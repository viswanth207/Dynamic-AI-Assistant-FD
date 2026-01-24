import React from 'react'

function LandingPage({ onGetStarted }) {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px'
      }}>
        {/* Gradient Background */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '0.875rem',
            marginBottom: '32px',
            color: '#a5b4fc'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#6366f1',
              borderRadius: '50%',
              boxShadow: '0 0 10px #6366f1'
            }}></span>
            AI-Powered Knowledge Platform
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '24px',
            background: 'linear-gradient(to bottom, #ffffff, #a5b4fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Transform Your Data Into<br />
            Intelligent Conversations
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Create custom AI assistants that understand your business data. Upload documents, connect URLs, and get instant, accurate insights through natural conversations.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onGetStarted} style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Started Free →
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '48px',
            justifyContent: 'center',
            marginTop: '80px',
            flexWrap: 'wrap'
          }}>
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '50M+', label: 'Messages Processed' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6366f1' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '120px 24px', background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              Powerful Features
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
              Everything you need to build intelligent AI assistants
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: '🚀',
                title: 'Instant Deployment',
                description: 'Go from raw data to a fully functional AI assistant in minutes. No complex setup or coding required.'
              },
              {
                icon: '🧠',
                title: 'Smart Context Understanding',
                description: 'Advanced RAG technology retrieves exact information from your documents for accurate, relevant responses.'
              },
              {
                icon: '📊',
                title: 'Visual Analytics',
                description: 'Automatically generate charts and insights from your data queries for better decision making.'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Your data is encrypted and isolated. Private workspaces ensure your information stays secure.'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Optimized vector search delivers instant responses. No waiting, just results.'
              },
              {
                icon: '🎨',
                title: 'Fully Customizable',
                description: 'Tailor your assistant\'s personality, tone, and behavior to match your brand perfectly.'
              }
            ].map((feature, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '32px',
                transition: 'all 0.3s ease'
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '120px 24px', background: '#050505' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
              Get started in three simple steps
            </p>
          </div>

          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { num: '01', title: 'Upload Your Data', desc: 'Upload CSV, JSON files, or connect to any website URL' },
              { num: '02', title: 'Customize Instructions', desc: 'Define how your assistant should behave and respond' },
              { num: '03', title: 'Start Chatting', desc: 'Get instant, accurate answers based on your data' }
            ].map((step, idx) => (
              <div key={idx} style={{
                maxWidth: '300px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '5rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: '0.3',
                  marginBottom: '-30px'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px', position: 'relative' }}>
                  {step.title}
                </h3>
                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 24px', background: '#000' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '24px',
          padding: '80px 40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            marginBottom: '24px'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '40px' }}>
            Join thousands of users creating intelligent AI assistants. No credit card required.
          </p>
          <button onClick={onGetStarted} style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '18px 40px',
            fontSize: '1.125rem',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.3s ease'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Create Your Assistant Now →
          </button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
