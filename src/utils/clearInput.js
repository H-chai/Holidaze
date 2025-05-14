/**
 * Clears the input value and resets the no results state.
 * This function sets the input value to an empty string and sets the `noResults` state to false.
 * Typically used to reset form fields or search inputs.
 *
 * @param {Function} setInputValue - The setter function to update the input value state.
 * @param {Function} setNoResults - The setter function to update the noResults state.
 *
 * @returns {void} This function does not return any value.
 *
 * @example
 * // Usage:
 * clearInput(setSearchText, setNoResults);
 */

export function clearInput(setInputValue, setNoResults) {
  setInputValue('');
  setNoResults(false);
}
