import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import { loginUser } from '../services/authService.js';
import { validateLogin } from '../utils/validation.js';

const initialForm = { email: '', password: '' };

function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // ignore extra clicks while a request is running

    const validationErrors = validateLogin(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const result = await loginUser({ email: form.email.trim(), password: form.password });
      // The backend also returns result.token. We don't save it anywhere yet;
      // storing it and sending it on protected requests is the next step.
      // A fixed id means repeated submits replace the toast instead of stacking
      toast.success(result.message, {
        id: 'login-result',
        description: `Welcome back, ${result.user.name}!`,
      });
      setForm(initialForm);
    } catch (err) {
      // Wrong email/password (401), missing fields (400) or a network error
      toast.error(err.message, { id: 'login-result' });
      setForm((prev) => ({ ...prev, password: '' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your account"
      footer={
        <>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email" className="form-label">
            Email
          </label>
          <div className={`input-wrapper ${errors.email ? 'has-error' : ''}`}>
            <input
              id="login-email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="login-email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <PasswordInput
          id="login-password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          disabled={loading}
        />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" /> Logging in…
            </>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
