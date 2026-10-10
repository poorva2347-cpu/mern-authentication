import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import { signupUser } from '../services/authService.js';
import { validateSignup } from '../utils/validation.js';

const initialForm = { name: '', email: '', password: '', confirmPassword: '' };

function Signup() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // ignore extra clicks while a request is running

    const validationErrors = validateSignup(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      // confirmPassword is only checked here in the browser, never sent
      const result = await signupUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      // A fixed id means repeated submits replace the toast instead of stacking
      toast.success(result.message, {
        id: 'signup-result',
        description: 'You can now log in with your email and password.',
        action: { label: 'Log in', onClick: () => navigate('/login') },
      });
      setForm(initialForm);
    } catch (err) {
      // 409 = email already registered: also highlight the email field
      if (err.status === 409) {
        setErrors({ email: err.message });
      }
      toast.error(err.message, { id: 'signup-result' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get started in less than a minute"
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="signup-name" className="form-label">
            Full name
          </label>
          <div className={`input-wrapper ${errors.name ? 'has-error' : ''}`}>
            <input
              id="signup-name"
              name="name"
              type="text"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              autoComplete="name"
              disabled={loading}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'signup-name-error' : undefined}
            />
          </div>
          {errors.name && (
            <p id="signup-name-error" className="form-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="signup-email" className="form-label">
            Email
          </label>
          <div className={`input-wrapper ${errors.email ? 'has-error' : ''}`}>
            <input
              id="signup-email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="signup-email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <PasswordInput
          id="signup-password"
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          disabled={loading}
        />

        <PasswordInput
          id="signup-confirm-password"
          name="confirmPassword"
          label="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          disabled={loading}
        />


        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" /> Creating account…
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
