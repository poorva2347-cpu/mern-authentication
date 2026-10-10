/**
 * Auth API service.
 *
 * All calls to the backend live here so the pages never use Axios directly.
 * The base URL comes from VITE_API_URL in `frontend/.env`.
 *
 * Passwords are only sent in the request body. Nothing is stored in
 * localStorage or sessionStorage.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/**
 * Turns any Axios error into an Error with a message that is safe
 * to show to the user. `error.status` holds the HTTP status (if any).
 */
function toFriendlyError(error) {
  // The server answered with an error status (400, 401, 409, 500, ...)
  if (error.response) {
    const friendly = new Error(
      error.response.data?.message || `Request failed (${error.response.status}).`
    );
    friendly.status = error.response.status;
    return friendly;
  }

  // The request was sent but no answer came back (server down, CORS, timeout)
  if (error.request) {
    return new Error(
      'Cannot reach the server. Please check that the backend is running and try again.'
    );
  }

  return new Error('Something went wrong. Please try again.');
}

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string }} formData
 * @returns {Promise<{ message: string, user: { id, name, email } }>}
 */
export async function signupUser(formData) {
  // Only send what the backend needs (never confirmPassword)
  const { name, email, password } = formData;

  try {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  } catch (error) {
    throw toFriendlyError(error);
  }
}

/**
 * Log in an existing user.
 * @param {{ email: string, password: string }} formData
 * @returns {Promise<{ message: string, token: string, user: { id, name, email } }>}
 */
export async function loginUser(formData) {
  const { email, password } = formData;

  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw toFriendlyError(error);
  }
}
