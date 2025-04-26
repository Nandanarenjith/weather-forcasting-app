import { WeatherIcon } from './WeatherIcons';
import { useWeatherStore } from '@/hooks/useWeatherStore';
import { format } from 'date-fns';

export default function CurrentWeather() {
  const { currentWeather, hourlyForecast, units } = useWeatherStore();
  
  // If no data, show loading skeleton
  if (!currentWeather) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 weather-card lg:col-span-2 animate-pulse">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
              <div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-light dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="text-center py-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10 mx-auto mb-1"></div>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto my-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 weather-card lg:col-span-2">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center">
            {currentWeather.weather && currentWeather.weather[0] && (
              <WeatherIcon 
                iconCode={currentWeather.weather[0].icon} 
                size={64} 
                className="mr-4"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {Math.round(currentWeather.main?.temp)}{tempUnit}
              </h2>
              <p className="text-lg">
                {currentWeather.weather?.[0]?.description}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Feels like {Math.round(currentWeather.main?.feels_like)}{tempUnit}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">water_drop</span>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="font-medium">{currentWeather.main?.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">air</span>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
              <p className="font-medium">{Math.round(currentWeather.wind?.speed)} {windUnit}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">visibility</span>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
              <p className="font-medium">{(currentWeather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="material-icons text-gray-400 mr-2">compress</span>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
              <p className="font-medium">{currentWeather.main?.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-light dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Today's Forecast</h3>
          <button className="text-primary flex items-center text-sm">
            Hourly
            <span className="material-icons ml-1">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {hourlyForecast?.slice(0, 8).map((hour, index) => (
            <div key={index} className="text-center py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(hour.dt * 1000), 'h a')}
              </p>
              {hour.weather && hour.weather[0] && (
                <WeatherIcon 
                  iconCode={hour.weather[0].icon} 
                  size={32} 
                  className="mx-auto my-1" 
                />
              )}
              <p className="font-medium">
                {Math.round(hour.temp)}{tempUnit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
