import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  const updateData = () => {
    setFetchAgain(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData[Object.keys(fetchedData)[0]]);
      }
      setFetchAgain(false);
    };
    fetchData();
  }, [url, fetchAgain]);

  return [data, updateData];
};

export default useFetch;
