import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const responce = await axios.get('https://randomuser.me/api/?results=30');
      setData(responce.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {data, loading, error};
};

export default useFetch;
