import { useState } from 'react';
import { HeroSection } from '../components/homePage/heroSection';
import { MostPopularSection } from '../components/homePage/MostPopularSection';
import { NewlyAddedSection } from '../components/homePage/NewlyAddedSection';
import { TrendingDestinationSection } from '../components/homePage/TrendingDestinationSection';
import { SearchResultSection } from '../components/homePage/SearchResultSection';
import { CallToActionSection } from '../components/homePage/CallToActionSection';

/**
 * Home component - The main landing page of the application.
 *
 * This component renders various sections including the Hero section, search results,
 * newly added items, popular items, trending destinations, and a call to action.
 * It also handles the search functionality and displays relevant results based on user input.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.authChanged - A flag to indicate if authentication status has changed.
 * @param {function} props.setSearchResults - A function to update the search results.
 * @param {function} props.setSearchText - A function to update the search text.
 * @param {string} props.searchText - The current search text entered by the user.
 * @param {Array} props.searchResults - The list of search results based on the search text.
 *
 * @returns {JSX.Element} The Home component JSX.
 */

export function Home({
  authChanged,
  setSearchResults,
  setSearchText,
  searchText,
  searchResults,
}) {
  return (
    <div className="overflow-hidden">
      <HeroSection
        setSearchResults={setSearchResults}
        setSearchText={setSearchText}
      />
      {searchResults.length > 0 && (
        <SearchResultSection
          searchResults={searchResults}
          searchText={searchText}
          setSearchResults={setSearchResults}
        />
      )}
      <NewlyAddedSection />
      <MostPopularSection />
      <TrendingDestinationSection />
      <CallToActionSection authChanged={authChanged} />
    </div>
  );
}
