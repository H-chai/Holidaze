import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useLogout } from '../../hooks/useLogout';

/**
 * AuthorizedMobileHeader - Navigation component for authenticated users (mobile view)
 *
 * This component displays a mobile-friendly navigation bar for logged-in users.
 * It features a hamburger menu that toggles to reveal links such as "Venues",
 * "List your property", "Your bookings", and the user profile. It also includes a logout button.
 *
 * The component handles menu toggle state internally using `useState`,
 * and retrieves the username from `sessionStorage`.
 *
 * @component
 * @example
 * return (
 *   <AuthorizedMobileHeader setAuthChanged={setAuthChanged} />
 * );
 *
 * @param {Object} props - Component props
 * @param {Function} props.setAuthChanged - Callback function to update authentication state after logout
 */

export function AuthorizedMobileHeader({ setAuthChanged }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = sessionStorage.getItem('username');
  const logout = useLogout(setAuthChanged);

  function toggleHamburgerMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <div>
      {isMenuOpen ? (
        <button onClick={toggleHamburgerMenu} className="relative z-30">
          <CloseIcon />
        </button>
      ) : (
        <div>
          <Link to={`/profile/${username}`} className="mr-6">
            <PermIdentityIcon className="!text-black" />
          </Link>
          <button onClick={toggleHamburgerMenu} className="text-black">
            <MenuIcon />
          </button>
        </div>
      )}
      <nav
        className="fixed top-0 right-0 left-0 h-screen flex justify-center bg-white transition-transform duration-500 transform ease-in-out z-20"
        style={{
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <ul className="flex flex-col items-center justify-center gap-10 text-2xl font-medium">
          <li>
            <Link onClick={toggleHamburgerMenu} to="/allVenues">
              Venues
            </Link>
          </li>
          <li>
            <Link onClick={toggleHamburgerMenu} to={`/profile/${username}`}>
              List your property
            </Link>
          </li>
          <li>
            <Link onClick={toggleHamburgerMenu} to={`/profile/${username}`}>
              Your bookings
            </Link>
          </li>
          <li>
            <Link
              onClick={toggleHamburgerMenu}
              to={`/profile/${username}`}
              className="flex items-center"
            >
              <PermIdentityIcon className="!w-6 mr-1" />
              {username}
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="flex items-center cursor-pointer"
            >
              <LogoutIcon className="!w-6 mr-1" />
              <p>Logout</p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
