import { useState } from "react";

/**
 * A custom hook to standardize API calls.
 * 
 * @param {Function} apiFunc - The actual API function (must return a promise).
 * @returns {{
 *   callApi: Function,
 *   loading: boolean,
 *   error: any
 * }}
 */
export const useApi = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setLoading(false);
      return response;
    } catch (err) {
      const normalizedError = err?.response?.data?.message || err.message || "Unknown error occurred";
      setError(normalizedError);
      setLoading(false);
      return { error: normalizedError };
    }
  };
  
  return {
    callApi,
    loading,
    error,
  };
};
