import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (urlLink) => {
  const [searchedText, setSearchedText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // Fetch Data
  const fetchedData = async (apiRoute) => {
    try {
      setLoading(true);
      const { data } = await axios.get(apiRoute);
      setMainData(data[urlLink]);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.msg);
      setLoading(false);
    }
  };

  // Re-fetch data
  const reFetchData = async (apiRoute) => {
    try {
      setLoading(true);
      const { data } = await axios.get(apiRoute);
      setMainData(data[urlLink]);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.msg);
      setLoading(false);
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    const searchedText = e.target.value.toLowerCase();
    setSearchedText(searchedText);

    const filtered = [];
    mainData?.forEach((item) => {
      if (
        item?.firstName?.toLowerCase().includes(searchedText) ||
        item?.middleName?.toLowerCase().includes(searchedText) ||
        item?.lastName?.toLowerCase().includes(searchedText) ||
        item?.email?.toLowerCase().includes(searchedText) ||
        item?.userName?.toLowerCase().includes(searchedText) ||
        item?.name?.toLowerCase().includes(searchedText) ||
        item?.description?.toLowerCase().includes(searchedText) ||
        item?.date?.toLowerCase().includes(searchedText) ||
        item?.user?.toLowerCase().includes(searchedText) ||
        item?.rating?.toString().includes(searchedText) ||
        item?.message?.toLowerCase().includes(searchedText) ||
        item?.marker?.toLowerCase().includes(searchedText) ||
        item?.buildingId?.name?.toLowerCase().includes(searchedText) ||
        item?.longitude?.toLowerCase().includes(searchedText) ||
        item?.latitude?.toLowerCase().includes(searchedText) ||
        item?.roomId?.name?.toLowerCase().includes(searchedText)
      ) {
        filtered.push(item);
      }
    });

    setFilteredData(filtered);
  };

  // Handle Delete
  const handleDelete = async (name, id) => {
    try {
      await axios.delete(`/${name}/${id}`);
      await reFetchData(name);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchedData(urlLink);
  }, [urlLink]);

  return {
    data: filteredData.length >= 1 ? filteredData : mainData,
    loading,
    error,
    handleSearch,
    searchedText,
    reFetchData,
    handleDelete,
  };
};

export default useFetch;
