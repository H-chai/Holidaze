import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * CallToActionSection - Section that encourages users to explore venues and list their property
 *
 * This component renders two key call-to-action sections:
 * - "Explore all venues" with a link to view all venues.
 * - "List your property" which redirects the user to their profile page if logged in, or to the login page if not.
 *
 * The component tracks the user's login status using sessionStorage to display the correct links.
 * - When the user is logged in, it shows their profile page under "List your property".
 * - When the user is not logged in, it redirects to the login page instead.
 *
 * @component
 * @example
 * return (
 *   <CallToActionSection authChanged={authChanged} />
 * );
 *
 * @param {Object} props - Component props
 * @param {boolean} props.authChanged - Boolean that indicates if the authentication state has changed
 */

export function CallToActionSection({ authChanged }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(name || '');
  }, [authChanged]);

  return (
    <div className="px-4 pb-8 sm:flex sm:justify-between sm:items-center sm:gap-2 lg:gap-3 lg:pb-20 lg:px-32">
      <div>
        <h1 className="text-xl font-bold mb-4">Explore all venues</h1>
        <Link
          to="/allVenues"
          className="block rounded-[10px] group overflow-hidden"
        >
          <img
            src="public/allVenues.jpg"
            alt="View all venues"
            className="rounded-[10px] aspect-[21/9] object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="mt-8 sm:mt-0">
        <h1 className="text-xl font-bold mb-4">List your property</h1>
        <Link
          className="block rounded-[10px] group overflow-hidden"
          to={isLoggedIn ? `/profile/${username}` : '/login'}
        >
          <img
            src="public/property.jpg"
            alt="To your profile page"
            className="rounded-[10px] aspect-[21/9] object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
}
