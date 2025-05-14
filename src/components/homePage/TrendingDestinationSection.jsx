import { Link } from 'react-router-dom';

/**
 * TrendingDestinationSection - Displays a grid of popular destination links.
 *
 * This component visually highlights trending travel destinations as large square images
 * overlaid with a title and gradient. Each destination is wrapped in a link that navigates
 * to a filtered venue list for that location.
 *
 * The layout is responsive and optimized for both mobile and desktop views,
 * with smooth hover animations for interactivity.
 *
 * @component
 * @example
 * return (
 *   <TrendingDestinationSection />
 * );
 */

export function TrendingDestinationSection() {
  return (
    <div className="px-4 pb-8 lg:pb-20 lg:px-32">
      <h1 className="text-xl font-bold mb-4">Trending destinations</h1>
      <ul className="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-none lg:gap-3">
        <li className="rounded-[10px] aspect-square relative group overflow-hidden">
          <img
            src="public/norway.jpg"
            alt="destination - norway"
            className="aspect-square absolute top-0 right-0 bottom-0 left-0 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Link
            to="venues/norway"
            className="flex justify-end items-end p-4 bg-gradient-to-b from-transparent-black to-semi-transparent-black w-full h-full relative z-10 lg:p-6"
          >
            <p className="font-boska font-bold text-2xl text-white lg:text-[32px]">
              Norway
            </p>
          </Link>
        </li>
        <li className="rounded-[10px] aspect-square relative group overflow-hidden">
          <img
            src="public/japan.jpg"
            alt="destination - japan"
            className="aspect-square absolute top-0 right-0 bottom-0 left-0 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Link
            to="venues/japan"
            className="flex justify-end items-end p-4 bg-gradient-to-b from-transparent-black to-semi-transparent-black w-full h-full relative z-10 lg:p-6"
          >
            <p className="font-boska font-bold text-2xl text-white lg:text-[32px]">
              Japan
            </p>
          </Link>
        </li>
        <li className="rounded-[10px] aspect-square relative group overflow-hidden">
          <img
            src="public/spain.jpg"
            alt="destination - spain"
            className="aspect-square absolute top-0 right-0 bottom-0 left-0 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Link
            to="venues/spain"
            className="flex justify-end items-end p-4 bg-gradient-to-b from-transparent-black to-semi-transparent-black w-full h-full relative z-10 lg:p-6"
          >
            <p className="font-boska font-bold text-2xl text-white lg:text-[32px]">
              Spain
            </p>
          </Link>
        </li>
        <li className="rounded-[10px] aspect-square relative group overflow-hidden">
          <img
            src="public/thailand.jpg"
            alt="destination - thailand"
            className="aspect-square absolute top-0 right-0 bottom-0 left-0 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Link
            to="venues/thailand"
            className="flex justify-end items-end p-4 bg-gradient-to-b from-transparent-black to-semi-transparent-black w-full h-full relative z-10 lg:p-6"
          >
            <p className="font-boska font-bold text-2xl text-white lg:text-[32px]">
              Thailand
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
