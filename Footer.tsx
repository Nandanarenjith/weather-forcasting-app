import { ThemeProvider } from 'next-themes';

interface FooterProps {
  units: string;
  onUnitsChange: (units: string) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
  autoRefresh: boolean;
  onAutoRefreshChange: (autoRefresh: boolean) => void;
}

export default function Footer({
  units,
  onUnitsChange,
  theme,
  onThemeChange,
  autoRefresh,
  onAutoRefreshChange
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white mt-10">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">WeatherCast</h3>
            <p className="text-gray-400 text-sm">
              Your comprehensive weather forecasting application with real-time weather data, 
              forecast predictions, and interactive weather maps.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Current weather conditions</li>
              <li>7-day weather forecast</li>
              <li>Interactive weather maps</li>
              <li>Weather data visualization</li>
              <li>Location-based weather services</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Settings</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Units:</span>
                <div className="flex rounded-full bg-gray-700 p-1">
                  <button 
                    className={`px-3 py-1 rounded-full ${units === 'metric' ? 'bg-primary text-white' : ''}`}
                    onClick={() => onUnitsChange('metric')}
                  >
                    °C
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full ${units === 'imperial' ? 'bg-primary text-white' : ''}`}
                    onClick={() => onUnitsChange('imperial')}
                  >
                    °F
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Theme:</span>
                <div className="flex rounded-full bg-gray-700 p-1">
                  <button 
                    className={`px-3 py-1 rounded-full ${theme === 'light' ? 'bg-primary text-white' : ''}`}
                    onClick={() => onThemeChange('light')}
                  >
                    Light
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-primary text-white' : ''}`}
                    onClick={() => onThemeChange('dark')}
                  >
                    Dark
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Auto-refresh:</span>
                <div className="flex rounded-full bg-gray-700 p-1">
                  <button 
                    className={`px-3 py-1 rounded-full ${autoRefresh ? 'bg-primary text-white' : ''}`}
                    onClick={() => onAutoRefreshChange(true)}
                  >
                    On
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full ${!autoRefresh ? 'bg-primary text-white' : ''}`}
                    onClick={() => onAutoRefreshChange(false)}
                  >
                    Off
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} WeatherCast. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">help_outline</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">settings</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="material-icons">info</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
