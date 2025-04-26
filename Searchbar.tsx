import { useState, useRef, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { useWeatherStore } from '@/hooks/useWeatherStore';
import { useToast } from '@/hooks/use-toast';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { searchLocations, getWeatherByCoordinates } = useWeather();
  const { loading } = useWeatherStore();
  const { toast } = useToast();

  // Handle search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    if (e.target.value.length > 2) {
      searchLocations(e.target.value)
        .then(results => {
          setSearchResults(results);
          setShowSearchResults(results.length > 0);
        })
        .catch(error => {
          console.error('Error searching locations:', error);
          toast({
            title: 'Search Error',
            description: 'Failed to search for locations. Please try again.',
            variant: 'destructive'
          });
        });
    } else {
      setShowSearchResults(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery && searchQuery.length > 2) {
      searchLocations(searchQuery)
        .then(results => {
          if (results.length > 0) {
            // Use the first result
            const location = results[0];
            getWeatherByCoordinates(location.lat, location.lon);
            setShowSearchResults(false);
          } else {
            toast({
              title: 'No Results',
              description: 'No locations found matching your search.',
              variant: 'destructive'
            });
          }
        })
        .catch(error => {
          console.error('Error searching locations:', error);
          toast({
            title: 'Search Error',
            description: 'Failed to search for locations. Please try again.',
            variant: 'destructive'
          });
        });
    }
  };

  // Handle location selection from dropdown
  const selectLocation = (location: any) => {
    setSearchQuery(`${location.name}, ${location.country}`);
    getWeatherByCoordinates(location.lat, location.lon);
    setShowSearchResults(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle enter key in search field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="relative flex items-center">
          <span className="material-icons absolute left-3 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search for a city..." 
            className="pl-10 pr-20 py-2 w-full rounded-lg border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button 
            className="absolute right-3 bg-primary text-white rounded-lg px-4 py-1 text-sm"
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </button>
        </div>
        
        {/* Search Results Dropdown */}
        {showSearchResults && (
          <div 
            ref={searchResultsRef}
            className="absolute z-10 mt-1 w-full max-w-full md:max-w-lg bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {searchResults.map((result, index) => (
              <div 
                key={index}
                className="px-4 py-2 hover:bg-gray-light dark:hover:bg-gray-600 cursor-pointer flex items-center"
                onClick={() => selectLocation(result)}
              >
                <span className="material-icons text-gray-400 dark:text-gray-300 mr-2">location_on</span>
                <span className="dark:text-white">
                  {result.name}, {result.state ? `${result.state}, ` : ''}{result.country}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
