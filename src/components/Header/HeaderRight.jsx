import { useMediaQuery } from '@mui/material';
import { AuthorizedDesktopHeader } from './AuthorizedDesktopHeader';
import { AuthorizedMobileHeader } from './AuthorizedMobileHeader';
import { UnauthorizedDesktopHeader } from './UnauthorizedDesktopHeader';
import { UnauthorizedMobileHeader } from './UnauthorizedMobileHeader';

/**
 * HeaderRight - Renders the appropriate header based on auth status and screen size
 *
 * This component conditionally renders one of four navigation components based on:
 * - Whether the user is logged in (determined by the presence of a token in sessionStorage)
 * - Whether the screen width matches a mobile layout (using a custom `useMediaQuery` hook)
 *
 * It displays one of the following components accordingly:
 * - AuthorizedMobileHeader
 * - AuthorizedDesktopHeader
 * - UnauthorizedMobileHeader
 * - UnauthorizedDesktopHeader
 *
 * @component
 * @example
 * return (
 *   <HeaderRight setAuthChanged={setAuthChanged} />
 * );
 *
 * @param {Object} props - Component props
 * @param {Function} props.setAuthChanged - Callback function to update auth state when user logs out
 */

export function HeaderRight({ setAuthChanged }) {
  const isLoggedIn = sessionStorage.getItem('token');
  const isMobile = useMediaQuery('(max-width: 1023px)');

  if (isLoggedIn && isMobile)
    return <AuthorizedMobileHeader setAuthChanged={setAuthChanged} />;
  if (isLoggedIn && !isMobile)
    return <AuthorizedDesktopHeader setAuthChanged={setAuthChanged} />;
  if (!isLoggedIn && isMobile) return <UnauthorizedMobileHeader />;
  return <UnauthorizedDesktopHeader />;
}
