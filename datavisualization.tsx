import { useState } from 'react';
import { useWeatherStore } from '@/hooks/useWeatherStore';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { format, addDays } from 'date-fns';

export default function DataVisualization() {
  const { hourlyForecast, dailyForecast, units } = useWeatherStore();
  const [temperatureView, setTemperatureView] = useState('weekly');
  const [precipitationView, setPrecipitationView] = useState('weekly');
  
  // If no data, show loading skeleton
  if (!hourlyForecast || !dailyForecast) {
    return (
      <div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex justify-between mt-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-36 mb-3"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex justify-between mt-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Prepare temperature data
  const getTemperatureData = () => {
    if (temperatureView === 'weekly') {
      return hourlyForecast.slice(0, 24).map((hour) => ({
        time: format(new Date(hour.dt * 1000), 'ha'),
        temperature: Math.round(hour.temp),
        feels_like: Math.round(hour.feels_like)
      }));
    } else {
      return dailyForecast.slice(0, 7).map((day, index) => ({
        day: format(addDays(new Date(), index), 'EEE'),
        max: Math.round(day.temp.max),
        min: Math.round(day.temp.min)
      }));
    }
  };
  
  // Prepare precipitation data
  const getPrecipitationData = () => {
    if (precipitationView === 'weekly') {
      return hourlyForecast.slice(0, 24).map((hour) => ({
        time: format(new Date(hour.dt * 1000), 'ha'),
        probability: Math.round(hour.pop * 100),
        humidity: hour.humidity
      }));
    } else {
      return dailyForecast.slice(0, 7).map((day, index) => ({
        day: format(addDays(new Date(), index), 'EEE'),
        probability: Math.round(day.pop * 100),
        humidity: day.humidity
      }));
    }
  };
  
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const temperatureData = getTemperatureData();
  const precipitationData = getPrecipitationData();
  
  // Toggle chart views
  const toggleTemperatureView = () => {
    setTemperatureView(prev => prev === 'weekly' ? 'monthly' : 'weekly');
  };
  
  const togglePrecipitationView = () => {
    setPrecipitationView(prev => prev === 'weekly' ? 'monthly' : 'weekly');
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Weather Trends</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-3">Temperature Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {temperatureView === 'weekly' ? (
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }} 
                    interval={3}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    unit={tempUnit}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [`${value}${tempUnit}`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#3498db" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                    activeDot={{ r: 5 }}
                    name="Temperature"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="feels_like" 
                    stroke="#e74c3c" 
                    strokeWidth={2} 
                    strokeDasharray="3 3"
                    dot={{ r: 3 }}
                    name="Feels Like"
                  />
                </LineChart>
              ) : (
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    unit={tempUnit}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [`${value}${tempUnit}`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="max" 
                    stroke="#e74c3c" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Max Temp"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="min" 
                    stroke="#3498db" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Min Temp"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{temperatureView === 'weekly' ? 'Next 24 hours' : 'Next 7 days'}</span>
            <button 
              className="text-primary dark:text-blue-400"
              onClick={toggleTemperatureView}
            >
              View {temperatureView === 'weekly' ? 'weekly' : 'hourly'}
            </button>
          </div>
        </div>
        
        {/* Precipitation Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-medium mb-3">Precipitation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={precipitationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={precipitationView === 'weekly' ? 'time' : 'day'} 
                  tick={{ fontSize: 12 }}
                  interval={precipitationView === 'weekly' ? 3 : 0}
                />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="probability" 
                  fill="#3498db" 
                  name="Precipitation" 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="humidity" 
                  fill="#2ecc71" 
                  name="Humidity" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{precipitationView === 'weekly' ? 'Next 24 hours' : 'Next 7 days'}</span>
            <button 
              className="text-primary dark:text-blue-400"
              onClick={togglePrecipitationView}
            >
              View {precipitationView === 'weekly' ? 'weekly' : 'hourly'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
