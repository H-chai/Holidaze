import { HeaderRight } from './HeaderRight';
import logo from '../../assets/Holidaze.svg';

/**
 * Header - Main site header with logo and navigation
 *
 * This component displays the top navigation bar for the application,
 * including the Holidaze logo on the left and the dynamic header
 * (based on auth status and screen size) on the right.
 *
 * It wraps and positions the layout responsively using Tailwind utility classes.
 *
 * @component
 * @example
 * return (
 *   <Header setAuthChanged={setAuthChanged} />
 * );
 *
 * @param {Object} props - Component props
 * @param {Function} props.setAuthChanged - Callback function to update auth state
 */

export function Header({ setAuthChanged }) {
  return (
    <header className="flex items-center justify-between p-4 text-black relative font-roboto lg:py-4 lg:px-32">
      <a href="/" className="w-1/4 lg:w-1/5">
        <img src={logo} alt="Holidaze logo" />
      </a>
      <HeaderRight setAuthChanged={setAuthChanged} />
    </header>
  );
}
