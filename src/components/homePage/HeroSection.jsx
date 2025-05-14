import { SearchForm } from '../SearchForm';

/**
 * HeroSection - A hero banner section with a search form to find the next stay
 *
 * This component renders the hero section of the website, featuring a background image,
 * a heading, and a search form that allows users to search for venues.
 *
 * The heading prompts the user to "Find your next stay" and the search form allows the
 * user to input a search query, which is then passed back to the parent component via
 * the `setSearchResults` and `setSearchText` props.
 *
 * The background image and layout are styled responsively to look great on all screen sizes.
 *
 * @component
 * @example
 * return (
 *   <HeroSection setSearchResults={setSearchResults} setSearchText={setSearchText} />
 * );
 *
 * @param {Object} props - Component props
 * @param {Function} props.setSearchResults - A function to update search results in the parent component
 * @param {Function} props.setSearchText - A function to update the search query text in the parent component
 */

export function HeroSection({ setSearchResults, setSearchText }) {
  return (
    <div className="bg-[url('/public/bg-hero.jpg')] bg-cover bg-center font-roboto">
      <div className="bg-bg-black px-10 py-12 sm:px-24 lg:py-24 lg:px-32">
        <h1 className="font-boska text-white text-[32px] mb-2 text-center font-bold lg:text-[40px] lg:text-left">
          Find your next stay
        </h1>
        <SearchForm
          setSearchResults={setSearchResults}
          setSearchText={setSearchText}
        />
      </div>
    </div>
  );
}
