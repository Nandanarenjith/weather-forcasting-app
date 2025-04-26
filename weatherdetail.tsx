import { useWeatherStore } from '@/hooks/useWeatherStore';
import { format } from 'date-fns';

export default function WeatherDetails() {
  const { currentWeather, currentLocation, units, oneCallData } = useWeatherStore();
  
  // If no data, show loading skeleton
  if (!currentWeather || !oneCallData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 weather-card animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
        
        <div className="space-y-4">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-light dark:border-gray-700">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24"></div>
        </div>
      </div>
    );
  }
  
  const tempUnit = units === 'metric' ? '°C' : '°F';
  
  // Format sunrise and sunset times
  const sunrise = currentWeather.sys?.sunrise 
    ? format(new Date(currentWeather.sys.sunrise * 1000), 'h:mm a')
    : 'N/A';
    
  const sunset = currentWeather.sys?.sunset 
    ? format(new Date(currentWeather.sys.sunset * 1000), 'h:mm a')
    : 'N/A';
  
  // Calculate high/low temperatures
  const tempMax = currentWeather.main?.temp_max ? Math.round(currentWeather.main.temp_max) : 'N/A';
  const tempMin = currentWeather.main?.temp_min ? Math.round(currentWeather.main.temp_min) : 'N/A';
  
  // Get UV index from one call data if available
  const uvIndex = oneCallData.current?.uvi !== undefined 
    ? oneCallData.current.uvi.toFixed(0) 
    : 'N/A';
  
  // Get UVI level description
  const getUviLevel = (uvi: number) => {
    if (uvi <= 2) return 'Low';
    if (uvi <= 5) return 'Moderate';
    if (uvi <= 7) return 'High';
    if (uvi <= 10) return 'Very High';
    return 'Extreme';
  };
  
  // Get precipitation probability
  const getPrecipitation = () => {
    if (oneCallData.hourly && oneCallData.hourly.length > 0) {
      return `${Math.round(oneCallData.hourly[0].pop * 100)}%`;
    }
    return 'N/A';
  };
  
  // Get cloud cover
  const cloudCover = currentWeather.clouds?.all !== undefined 
    ? `${currentWeather.clouds.all}%` 
    : 'N/A';
  
  // Get weather alert if any
  const weatherAlert = oneCallData.alerts?.[0] ? {
    title: oneCallData.alerts[0].event,
    description: oneCallData.alerts[0].description
  } : null;
  
  // Truncate alert description
  const truncateDescription = (description: string, maxLength = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 weather-card">
      <h3 className="text-lg font-medium mb-4">Weather Details</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">thermostat</span>
            <span>High/Low</span>
          </div>
          <span className="font-medium">{tempMax}/{tempMin}{tempUnit}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">wb_twilight</span>
            <span>Sunrise</span>
          </div>
          <span className="font-medium">{sunrise}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">wb_twilight</span>
            <span>Sunset</span>
          </div>
          <span className="font-medium">{sunset}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">opacity</span>
            <span>Precipitation</span>
          </div>
          <span className="font-medium">{getPrecipitation()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">cloud</span>
            <span>Cloud Cover</span>
          </div>
          <span className="font-medium">{cloudCover}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">grain</span>
            <span>UV Index</span>
          </div>
          <span className="font-medium">
            {uvIndex !== 'N/A' ? `${uvIndex} (${getUviLevel(Number(uvIndex))})` : 'N/A'}
          </span>
        </div>
      </div>
      
      {weatherAlert && (
        <div className="mt-6 pt-4 border-t border-gray-light dark:border-gray-700">
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="flex items-start">
              <span className="material-icons text-primary mt-0.5 mr-2">info</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {weatherAlert.title}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {truncateDescription(weatherAlert.description)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
