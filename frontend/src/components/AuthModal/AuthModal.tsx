import React, { useState } from 'react';
import { api } from '../../services/api';
import { Button } from '../Button';
import './AuthModal.css';

type AuthMode = 'signup' | 'login';

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
  onAuthSuccess: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  mode,
  onClose,
  onModeChange,
  onAuthSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setLogin('');
    setPassword('');
    setError(null);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    resetForm();
    onClose();
  };

  const switchMode = (nextMode: AuthMode) => {
    if (loading || nextMode === mode) {
      return;
    }
    setError(null);
    onModeChange(nextMode);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const result = await api.signup({
          username: username.trim(),
          email: email.trim(),
          password,
        });

        onAuthSuccess(result.user.username);
      } else {
        const result = await api.login({
          login: login.trim(),
          password,
        });

        onAuthSuccess(result.user.username);
      }

      resetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className="auth-modal__overlay" onClick={handleClose} />
      <div className="auth-modal__panel">
        <button
          type="button"
          className="auth-modal__close"
          onClick={handleClose}
          aria-label="Close authentication modal"
        >
          ×
        </button>

        <div className="auth-modal__tabs" role="tablist" aria-label="Authentication options">
          <button
            type="button"
            className={`auth-modal__tab ${mode === 'signup' ? 'is-active' : ''}`}
            onClick={() => switchMode('signup')}
            role="tab"
            aria-selected={mode === 'signup'}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={`auth-modal__tab ${mode === 'login' ? 'is-active' : ''}`}
            onClick={() => switchMode('login')}
            role="tab"
            aria-selected={mode === 'login'}
          >
            Login
          </button>
        </div>

        <h2 id="auth-modal-title" className="auth-modal__title">
          {mode === 'signup' ? 'Create your account' : 'Sign in to your account'}
        </h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {mode === 'signup' ? (
            <>
              <label className="auth-modal__label">
                Username
                <input
                  className="auth-modal__input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  minLength={2}
                  required
                />
              </label>

              <label className="auth-modal__label">
                Email
                <input
                  className="auth-modal__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </label>
            </>
          ) : (
            <label className="auth-modal__label">
              Email or Username
              <input
                className="auth-modal__input"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                type="text"
                required
              />
            </label>
          )}

          <label className="auth-modal__label">
            Password
            <input
              className="auth-modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              minLength={6}
              required
            />
          </label>

          {error ? <p className="auth-modal__error">{error}</p> : null}

          <Button type="submit" variant="primary" size="md" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};
