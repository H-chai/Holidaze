/**
 * Handles the venue search functionality by fetching data from the API based on user input.
 *
 * This function makes a GET request to the API to search for venues based on the provided
 * `inputValue` (search query). It updates the relevant states: `setSearchResults`,
 * `setSearchText`, `setIsLoading`, `setNoResults`, and `setIsError`.
 *
 * @param {string} inputValue - The search query entered by the user.
 * @param {function} setSearchResults - The function to set the search results.
 * @param {function} setSearchText - The function to set the search text.
 * @param {function} setIsLoading - The function to set the loading state.
 * @param {function} setNoResults - The function to set whether no results were found.
 * @param {function} setIsError - The function to set the error state. */

export async function handleVenueSearch(
  inputValue,
  setSearchResults,
  setSearchText,
  setIsLoading,
  setNoResults,
  setIsError
) {
  setSearchText(inputValue);
  const url = `https://v2.api.noroff.dev/holidaze/venues/search?_bookings=true&q=${inputValue}`;

  try {
    setIsLoading(true);
    const response = await fetch(url, {
      method: 'GET',
    });
    const result = await response.json();
    setSearchResults(result.data);

    if (result.data.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  } catch (error) {
    setIsError(error.message);
  } finally {
    setIsLoading(false);
  }
}
