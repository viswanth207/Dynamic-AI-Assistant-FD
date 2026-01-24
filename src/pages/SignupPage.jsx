import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

function SignupPage({ onLoginClick, onSignupSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      onSignupSuccess();
    } catch (err) {
      setError(err.message || 'Signup failed');
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
          <h1 className="auth-title">SIGN UP</h1>
          <p className="auth-tagline">Create your DataMind account</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form modern">
          <div className="input-wrapper">
            <span className="input-icon"></span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              disabled={loading}
              className="input-with-icon"
            />
          </div>

          <div className="input-wrapper">
            <span className="input-icon"></span>
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

          <div className="input-wrapper">
            <span className="input-icon"></span>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              minLength={6}
              disabled={loading}
              className="input-with-icon"
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <button
              onClick={onLoginClick}
              className="link-button"
              disabled={loading}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
