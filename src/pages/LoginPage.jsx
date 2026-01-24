import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

function LoginPage({ onSignupClick, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card modern">
        <div className="auth-logo">
          <img
            src="/datamind-logo.png"
            alt="DataMind Logo"
            style={{
              width: '64px',
              height: '64px',
              objectFit: 'contain',
              marginBottom: '20px'
            }}
          />
          <h1 className="auth-title">LOGIN</h1>
          <p className="auth-tagline">Welcome to DataMind</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form modern">
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Username"
              disabled={loading}
              className="input-with-icon"
            />
          </div>

          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              minLength={6}
              disabled={loading}
              className="input-with-icon"
            />
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password ?</a>
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button
              onClick={onSignupClick}
              className="link-button"
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
