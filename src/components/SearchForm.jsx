import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { clearInput } from '../utils/clearInput';
import { handleVenueSearch } from '../utils/handleVenueSearch';

/**
 * SearchForm - A form component for searching venues based on user input.
 *
 * This component includes input handling, basic validation, search triggering,
 * and user feedback such as loading state, error messages, and no-result indicators.
 *
 * It interacts with a `handleVenueSearch` function (not shown here) to fetch and update search results.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setSearchResults - Function to update the search results state in the parent component.
 * @param {Function} props.setSearchText - Function to update the search keyword (used for displaying titles or re-use).
 *
 * @example
 * <SearchForm setSearchResults={setResults} setSearchText={setQuery} />
 */

export function SearchForm({ setSearchResults, setSearchText }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    handleVenueSearch(
      inputValue,
      setSearchResults,
      setSearchText,
      setIsLoading,
      setNoResults,
      setIsError
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="lg:bg-white lg:flex lg:items-center lg:gap-2 lg:p-10 lg:rounded-[10px] lg:w-3/5"
    >
      <div className="relative bg-white rounded-[10px] py-3 mb-2 md:w-1/2 md:mx-auto lg:border lg:border-outline lg:mb-0 lg:w-3/4">
        <PlaceOutlinedIcon className="absolute left-4 text-black !w-5" />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setNoResults(false);
          }}
          type="text"
          placeholder="Where are you going?"
          className="w-full pl-10 placeholder:text-black placeholder:text-sm relative z-10 focus-visible:outline-0"
        />
        {isError && !isFocused && (
          <p className="absolute bottom-[-60%] text-sm text-error">{isError}</p>
        )}
        {noResults && (!isFocused || inputValue === '') && (
          <p className="absolute top-1/2 right-10 -translate-y-1/2 text-sm text-error">
            No results found.
          </p>
        )}
        {inputValue && (
          <CloseIcon
            className="absolute right-4 text-black !w-5 cursor-pointer z-[11]"
            onClick={() => clearInput(setInputValue, setNoResults)}
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue text-white cursor-pointer rounded-[10px] py-3 w-full font-medium block md:w-1/2 md:mx-auto lg:w-1/4 transition-all duration-300 hover:bg-white hover:text-blue hover:border disabled:cursor-not-allowed"
        disabled={isLoading || inputValue === ''}
      >
        Search
      </button>
    </form>
  );
}
