// src/HomePage.js
import React, { useCallback, useEffect, useState } from 'react';
import './home.scss';
import useSWR from 'swr';
import ProductCard from '../../components/card/ProductCard';
import Loader from '../../components/Spinner/Spinner';

// Fetch function for SWR with try-catch
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

function HomePage() {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // SWR fetch for SpaceX data
  const { data, error, isValidating, isLoading } = useSWR(
    `https://api.spacexdata.com/v3/launches?limit=10&offset=${index * 10}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  // Search Bar On change
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  // To Fetch more data when scrolled to bottom
  const fetchMoreData = useCallback(() => {
    if (isValidating || !data || !hasMore) return; // Prevent fetch if no more data
    setIndex((prevIndex) => prevIndex + 1);
  }, [data, isValidating, hasMore]);

  // Scroll event handler to trigger infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchMoreData(); // Load more data when scrolled to bottom
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMoreData]);

  // UseEffect for newly fetched data to the existing list of items
  useEffect(() => {
    if (data) {
      setAllItems((prevItems) => [...prevItems, ...data]); // Append new data to the list
      setHasMore(data.length === 10); // Check if we got less than requested (10 items)
    }
  }, [data]);

  // UseEffect for Filter Searchbar
  useEffect(() => {
    if (searchQuery) {
      const filtered = allItems.filter((launch) =>
        launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems); // Show all items if search is cleared
    }
  }, [searchQuery, allItems]);

  // Handle errors from SWR
  if (error)
    return (
      <div className='error-message'>
        Failed to load data. Please try again later.
      </div>
    );

  // Initial loading state
  if (!data && !isValidating) return <Loader />;

  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'col',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
        gap: '20px',
      }}
    >
      <div className='col' style={{ marginBottom: '30px' }}>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: '10px',
            height: '45px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '500px',
            margin: '10px 0px',
          }}
        />
        {filteredItems.map((item) => (
          <ProductCard data={item} key={item.flight_number} />
        ))}
        {isLoading && <Loader />}
        {!hasMore && <p>End of List.</p>}{' '}
      </div>
    </div>
  );
}

export default HomePage;
