const {useState, useEffect} = require("react");

export const useRequest = (apiCall, deps = [], cb) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const makeApiCall = async () => {
    try {
      const response = await apiCall()
      console.log("response: ", response);
      setData(response.data)

      cb && cb(data);
    } catch(err) {
      setError(err)
    }
  }

  useEffect(() => {
    makeApiCall()
  }, []);

  const loading = !data && !error;

  return {
    data,
    loading,
    error,
    setData
  };
}
