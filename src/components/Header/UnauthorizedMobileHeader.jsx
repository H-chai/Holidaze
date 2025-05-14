import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link } from 'react-router-dom';

/**
 * UnauthorizedMobileHeader - Navigation component for unauthenticated users (mobile view)
 *
 * This component renders a mobile-friendly navigation menu for users who are not logged in.
 * It includes a toggle hamburger menu that reveals navigation links such as:
 * "Venues", "List your property", "Sign in", and "Register".
 * The "List your property" and "Sign in" links both redirect to the login page.
 *
 * The component uses internal state to manage the visibility of the mobile menu.
 *
 * @component
 * @example
 * return (
 *   <UnauthorizedMobileHeader />
 * );
 */

export function UnauthorizedMobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/login" className="mr-6">
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
            <Link to="/login" onClick={toggleHamburgerMenu}>
              List your property
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={toggleHamburgerMenu}
              className="text-orange"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              onClick={toggleHamburgerMenu}
              className="text-orange"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
