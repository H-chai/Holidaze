import { useEffect, useState } from 'react';

/**
 * useApi - A reusable custom hook for fetching data from an API.
 *
 * Handles loading state, error state, and extracts `data` and `meta` from the response.
 * Expects the API response to follow the format: { data: [...], meta: {...} }
 *
 * @param {string} url - The endpoint to fetch data from.
 * @param {Object} [options={}] - Optional fetch options (e.g., method, headers, body).
 *
 * @returns {Object} An object containing:
 * - {Array|Object} data - The main data returned from the API.
 * - {Object|string} meta - Additional metadata returned from the API.
 * - {boolean} isLoading - True while the fetch request is in progress.
 * - {string|null} isError - Contains the error message if an error occurred, otherwise null.
 *
 * @example
 * const { data, isLoading, isError, meta } = useApi('/api/venues');
 */

export function useApi(url, options = {}) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(null);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json.data);
        setMeta(json.meta);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);

  return { data, isLoading, isError, meta };
}
