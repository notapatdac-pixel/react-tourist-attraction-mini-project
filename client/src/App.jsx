import { useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import TripList from './components/TripList';
import { fetchTrips } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch trips when search query changes
  const loadTrips = useCallback(async (keywords) => {
    setLoading(true);
    try {
      // If empty, send empty string to get all trips
      const data = await fetchTrips(keywords);
      setTrips(data);
    } catch (error) {
      console.error('Error loading trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all trips on mount
  useEffect(() => {
    loadTrips('');
  }, [loadTrips]);

  // Handle search input change with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTrips(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, loadTrips]);

  // Handle tag click - add tag to search query
  const handleTagClick = useCallback((tag) => {
    const currentTags = searchQuery.split(' ').filter(t => t.trim() !== '');
    
    // Check if tag already exists
    if (currentTags.includes(tag)) {
      return; // Don't add duplicate
    }
    
    // Add tag to search query
    const newQuery = currentTags.length > 0 
      ? `${searchQuery} ${tag}`.trim()
      : tag;
    
    setSearchQuery(newQuery);
  }, [searchQuery]);

  return (
    <div className="App min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#4396C5]">
          เที่ยวไหนดี
        </h1>
        
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#4396C5]"></div>
            <p className="text-gray-500 text-lg mt-4">กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <TripList trips={trips} onTagClick={handleTagClick} />
        )}
      </div>
    </div>
  );
}

export default App;
