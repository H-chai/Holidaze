import { Link } from 'react-router-dom';
import logo from '../assets/Holidaze.svg';

/**
 * Footer - A site-wide footer component displaying navigation links and branding.
 *
 * This footer includes the Holidaze logo and grouped navigation links such as venues,
 * profile-related pages, about/contact information, and legal links.
 *
 * It dynamically adjusts the destination of certain links based on user login status,
 * using session storage (`token` and `username`) to determine if a user is logged in.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * );
 */

export function Footer() {
  const isLoggedIn = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('username');
  return (
    <footer className="px-4 py-8 bg-light-orange text-black lg:px-32 lg:py-16">
      <a href="/" className="block w-1/4 mb-6 lg:w-1/5 lg:mb-12">
        <img src={logo} alt="Holidaze logo" />
      </a>
      <nav className="flex flex-col gap-6 lg:flex-row lg:gap-24">
        <ul className="flex flex-col gap-1.5 lg:gap-4">
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
              className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
              to={isLoggedIn ? `/profile/${username}` : '/login'}
            >
              List your property
            </Link>
          </li>
          <li>
            <Link
              className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
              to={isLoggedIn ? `/profile/${username}` : '/login'}
            >
              Your bookings
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-1.5 lg:gap-4">
          <li>
            <Link
              to="#"
              className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
            >
              Contact us
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-1.5 lg:gap-4">
          <li>
            <Link
              to="#"
              className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
            >
              Terms & conditions
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="relative after:absolute after:content-[] after:w-full after:h-[1px] after:bg-black after:bottom-[-4px] after:left-0 after:transform-[scale(0,1)] after:origin-top-left after:transition-transform after:duration-300 hover:after:transform-[scale(1,1)]"
            >
              Privacy & cookies
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
