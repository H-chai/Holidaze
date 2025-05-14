/**
 * Calculates the number of nights between two dates.
 *
 * This function takes two date objects (start and end) and returns the difference
 * between them in terms of nights. It calculates the difference in milliseconds
 * and then converts that into the number of days by dividing by the number of
 * milliseconds in a day.
 *
 * If either of the dates is not provided, it returns 0.
 *
 * @param {Date} start - The start date.
 * @param {Date} end - The end date.
 *
 * @returns {number} The number of nights between the two dates.
 *
 * @example
 * // Usage:
 * const start = new Date('2025-06-01');
 * const end = new Date('2025-06-05');
 * const nights = getNights(start, end); // Returns 4
 */

export function getNights(start, end) {
  if (!start || !end) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((end - start) / msPerDay);
}
