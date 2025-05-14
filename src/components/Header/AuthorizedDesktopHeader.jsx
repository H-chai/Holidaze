import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useLogout } from '../../hooks/useLogout';

/**
 * AuthorizedDesktopHeader - Navigation component for authenticated users (desktop view)
 *
 * This component displays a navigation bar specifically for users who are logged in.
 * It includes links to all venues, the user's profile, and a logout button.
 * The username is retrieved from sessionStorage and shown in the navigation.
 *
 * @component
 * @example
 * return (
 *   <AuthorizedDesktopHeader setAuthChanged={setAuthChanged} />
 * );
 *
 * @param {Object} props - Component props
 * @param {Function} props.setAuthChanged - Function to update authentication state after logout
 */

export function AuthorizedDesktopHeader({ setAuthChanged }) {
  const username = sessionStorage.getItem('username');
  const logout = useLogout(setAuthChanged);
  return (
    <nav>
      <ul className="flex gap-10">
        <li>
          <Link
            to="/allVenues"
            className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
          >
            Venues
          </Link>
        </li>
        <li>
          <Link
            to={`/profile/${username}`}
            className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
          >
            List your property
          </Link>
        </li>
        <li>
          <Link
            to={`/profile/${username}`}
            className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
          >
            Your bookings
          </Link>
        </li>
        <li className="transition-colors duration-300 hover:text-orange">
          <Link to={`/profile/${username}`} className="flex items-center">
            <PermIdentityIcon className="!w-5 mr-1" />
            {username}
          </Link>
        </li>
        <li className="transition-colors duration-300 hover:text-orange">
          <button onClick={logout} className="flex items-center cursor-pointer">
            <LogoutIcon className="!w-5 mr-1" />
            <p>Logout</p>
          </button>
        </li>
      </ul>
    </nav>
  );
}
