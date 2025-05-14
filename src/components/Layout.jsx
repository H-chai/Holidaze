import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header/Header';
import { Footer } from './Footer';

/**
 * Layout - The main layout wrapper for authenticated and public routes.
 *
 * This component conditionally renders the `Header` and `Footer` based on the current route.
 * Specifically, it omits the header and footer for `/login` and `/register` pages
 * to provide a simplified view during authentication processes.
 *
 * The `Outlet` is used to render matched child routes via React Router.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setAuthChanged - A function to update authentication state (typically triggers re-render on login/logout).
 *
 * @example
 * return (
 *   <Layout setAuthChanged={setAuthChanged} />
 * );
 */

export function Layout({ setAuthChanged }) {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register')
    return <Outlet />;
  return (
    <div>
      <Header setAuthChanged={setAuthChanged} />
      <Outlet />
      <Footer />
    </div>
  );
}
