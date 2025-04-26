import { useWeatherStore } from '@/hooks/useWeatherStore';
import { WeatherIcon } from './WeatherIcons';
import { format, addDays } from 'date-fns';

export default function ForecastSection() {
  const { dailyForecast, units } = useWeatherStore();
  
  // If no data, show loading skeleton
  if (!dailyForecast || dailyForecast.length === 0) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {Array(7).fill(0).map((_, index) => (
            <div key={index} className="p-4 border-b border-gray-light dark:border-gray-700 last:border-b-0 flex items-center justify-between">
              <div className="w-20">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              
              <div className="flex items-center flex-1 px-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              
              <div className="w-24 text-right">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-1 ml-auto"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const tempUnit = units === 'metric' ? '°C' : '°F';
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {dailyForecast.slice(0, 7).map((day, index) => {
          const date = addDays(new Date(), index);
          return (
            <div key={index} className="p-4 border-b border-gray-light dark:border-gray-700 last:border-b-0 flex items-center justify-between">
              <div className="w-20">
                <p className="font-medium">
                  {index === 0 ? 'Today' : format(date, 'EEEE')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(date, 'MMM d')}
                </p>
              </div>
              
              <div className="flex items-center flex-1 px-4">
                {day.weather && day.weather[0] && (
                  <WeatherIcon 
                    iconCode={day.weather[0].icon} 
                    size={40} 
                    className="mr-3" 
                  />
                )}
                <span className="dark:text-gray-200">
                  {day.weather?.[0]?.description}
                </span>
              </div>
              
              <div className="w-24 text-right">
                <p className="font-medium">
                  {Math.round(day.temp.max)}/{Math.round(day.temp.min)}{tempUnit}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-3 h-3 rounded-full bg-primary mr-1"></span>
                  <span>{Math.round(day.pop * 100)}%</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
