import logo from '../assets/logo.svg';

/**
 * Shared shell for the auth pages: background, centered card,
 * logo, heading and an optional footer (e.g. "Already have an account?").
 */
function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <header className="auth-header">
          <img src={logo} alt="" className="auth-logo" width="40" height="40" />
          <h1 id="auth-title" className="auth-title">
            {title}
          </h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </header>

        {children}

        {footer && <footer className="auth-footer">{footer}</footer>}
      </section>
    </main>
  );
}

export default AuthLayout;
