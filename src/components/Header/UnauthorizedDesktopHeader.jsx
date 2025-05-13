import { Link } from 'react-router-dom';

/**
 * UnauthorizedDesktopHeader - Navigation component for unauthenticated users (desktop view)
 *
 * This component renders a navigation bar for users who are not logged in.
 * It includes links to view venues, log in, and register.
 * The "List your property" link also redirects to the login page.
 *
 * @component
 * @example
 * return (
 *   <UnauthorizedDesktopHeader />
 * );
 */

export function UnauthorizedDesktopHeader() {
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
            to="/login"
            className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
          >
            List your property
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-orange font-medium relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-orange after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
          >
            Sign in
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="text-orange font-medium relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-orange after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
