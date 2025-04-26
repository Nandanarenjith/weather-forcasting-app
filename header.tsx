import { useWeatherStore } from '@/hooks/useWeatherStore';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Header() {
  const { units, toggleUnits } = useWeatherStore();
  const { theme, setTheme } = useTheme();
  
  // Sync theme with weather store
  useEffect(() => {
    if (theme) {
      useWeatherStore.getState().setTheme(theme);
    }
  }, [theme]);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">wb_sunny</span>
          <h1 className="text-xl md:text-2xl font-bold">WeatherCast</h1>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={toggleUnits}
            className="mr-4 px-3 py-1 bg-white/20 rounded-full text-sm flex items-center"
          >
            <span>{units === 'metric' ? '°C' : '°F'}</span>
            <span className="material-icons text-sm ml-1">sync</span>
          </button>
          
          <button 
            onClick={handleThemeToggle}
            className="bg-white/20 rounded-full p-1"
          >
            <span className="material-icons">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
