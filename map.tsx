import { useState, useEffect, useRef } from 'react';
import { useWeatherStore } from '@/hooks/useWeatherStore';

export default function WeatherMap() {
  const { currentLocation } = useWeatherStore();
  const [activeLayer, setActiveLayer] = useState('temperature');
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Generate the OpenWeatherMap tile URL based on the selected layer
  const getMapUrl = (layer: string) => {
    const apiKey = 'b90417292c58c3bed06d3fd1d0a0d7fc'; // Default API key for the tiles
    let layerParam = '';
    
    switch(layer) {
      case 'precipitation':
        layerParam = 'precipitation_new';
        break;
      case 'wind':
        layerParam = 'wind_new';
        break;
      case 'clouds':
        layerParam = 'clouds_new';
        break;
      case 'temperature':
      default:
        layerParam = 'temp_new';
        break;
    }
    
    return `https://tile.openweathermap.org/map/${layerParam}/{z}/{x}/{y}.png?appid=${apiKey}`;
  };
  
  // Create or update map when component mounts or active layer changes
  useEffect(() => {
    if (!mapRef.current || !currentLocation) return;
    
    // Initialize the map container with an iframe to OpenWeatherMap
    const lat = currentLocation.lat || 40.7128;
    const lon = currentLocation.lon || -74.006;
    const zoom = 10;
    
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';
    iframe.src = `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=${activeLayer}&lat=${lat}&lon=${lon}&zoom=${zoom}`;
    
    // Clear previous content
    while (mapRef.current.firstChild) {
      mapRef.current.removeChild(mapRef.current.firstChild);
    }
    
    mapRef.current.appendChild(iframe);
    
  }, [activeLayer, currentLocation]);
  
  // Switch map layer
  const handleSetMapLayer = (layer: string) => {
    setActiveLayer(layer);
  };
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Weather Map</h2>
        <div className="flex">
          <button 
            className={`text-sm px-3 py-1 ${activeLayer === 'temperature' ? 'bg-primary text-white' : 'bg-gray-light dark:bg-gray-700 text-dark dark:text-gray-300'} rounded-l-lg`} 
            onClick={() => handleSetMapLayer('temperature')}
          >
            Temperature
          </button>
          <button 
            className={`text-sm px-3 py-1 ${activeLayer === 'precipitation' ? 'bg-primary text-white' : 'bg-gray-light dark:bg-gray-700 text-dark dark:text-gray-300'}`}
            onClick={() => handleSetMapLayer('precipitation')}
          >
            Precipitation
          </button>
          <button 
            className={`text-sm px-3 py-1 ${activeLayer === 'wind' ? 'bg-primary text-white' : 'bg-gray-light dark:bg-gray-700 text-dark dark:text-gray-300'}`}
            onClick={() => handleSetMapLayer('wind')}
          >
            Wind
          </button>
          <button 
            className={`text-sm px-3 py-1 ${activeLayer === 'clouds' ? 'bg-primary text-white' : 'bg-gray-light dark:bg-gray-700 text-dark dark:text-gray-300'} rounded-r-lg`}
            onClick={() => handleSetMapLayer('clouds')}
          >
            Clouds
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div ref={mapRef} className="aspect-video bg-gray-light dark:bg-gray-700 rounded relative overflow-hidden">
          {/* Map will be rendered in this div */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Loading weather map...
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          <p>Interactive weather map - displaying {activeLayer} data</p>
        </div>
      </div>
    </div>
  );
}
