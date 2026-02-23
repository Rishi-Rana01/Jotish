import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://backend.jotish.in/backend_dev/gettabledata.php", {
          username: "test",
          password: "123456"
        });
        
        if (response.data && response.data.TABLE_DATA && response.data.TABLE_DATA.data) {
          setData(response.data.TABLE_DATA.data);
        } else {
          setError("Invalid data format received from API");
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};