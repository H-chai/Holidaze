import { useNavigate } from 'react-router-dom';

/**
 * useLogout - A custom hook that handles user logout.
 *
 * Clears authentication-related data from sessionStorage,
 * triggers an auth state update, and navigates the user to the home page.
 *
 * @param {Function} setAuthChanged - A state setter function to signal auth state changes.
 *
 * @returns {Function} logout - A function that can be called to log the user out.
 *
 * @example
 * const logout = useLogout(setAuthChanged);
 * <button onClick={logout}>Log out</button>
 */

export function useLogout(setAuthChanged) {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setAuthChanged((prev) => !prev);
    navigate('/');
  };

  return logout;
}
