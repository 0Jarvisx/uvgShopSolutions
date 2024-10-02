import { useState, useCallback } from 'react';

const useApiRequest = (initialUrl = '', initialOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = useCallback(async (url = initialUrl, options = initialOptions) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      return responseData;  // Devolvemos los datos directamente
    } catch (err) {
      setError(err.message);
      throw err;  // Lanzamos el error para manejarlo en el componente
    } finally {
      setLoading(false);
    }
  }, [initialUrl, initialOptions]);

  return { data, loading, error, sendRequest };
};

export default useApiRequest;
