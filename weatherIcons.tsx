import React from 'react';

// This component provides SVG weather icons based on OpenWeatherMap condition codes
// See: https://openweathermap.org/weather-conditions

interface WeatherIconProps {
  iconCode: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  className = "", 
  size = 40 
}) => {
  // Map OpenWeatherMap icon codes to our SVG components
  const getIconComponent = (code: string) => {
    // Main code is the first two digits
    const mainCode = code.substring(0, 2);
    
    switch (mainCode) {
      case '01': // clear sky
        return <ClearSkyIcon className={className} size={size} />;
      case '02': // few clouds
        return <FewCloudsIcon className={className} size={size} />;
      case '03': // scattered clouds
      case '04': // broken clouds
        return <CloudyIcon className={className} size={size} />;
      case '09': // shower rain
        return <ShowerRainIcon className={className} size={size} />;
      case '10': // rain
        return <RainIcon className={className} size={size} />;
      case '11': // thunderstorm
        return <ThunderstormIcon className={className} size={size} />;
      case '13': // snow
        return <SnowIcon className={className} size={size} />;
      case '50': // mist/fog
        return <MistIcon className={className} size={size} />;
      default:
        return <ClearSkyIcon className={className} size={size} />;
    }
  };

  return getIconComponent(iconCode);
};

// Weather Icon Components as SVGs
export const ClearSkyIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <circle cx="32" cy="32" r="16" fill="#FFD600" stroke="#FF9D00" strokeWidth="2" />
    <g>
      <path d="M32 4V12" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 52V60" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 32H52" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 32H4" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M51.8 12.2L46.3 17.7" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M17.7 46.3L12.2 51.8" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M51.8 51.8L46.3 46.3" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
      <path d="M17.7 17.7L12.2 12.2" stroke="#FF9D00" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

export const FewCloudsIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <circle cx="24" cy="24" r="12" fill="#FFD600" stroke="#FF9D00" strokeWidth="2" />
    <path 
      d="M48 38C48 30.268 41.732 24 34 24C28.311 24 23.43 27.401 21.368 32.276C20.939 32.097 20.48 32 20 32C17.791 32 16 33.791 16 36C16 36.342 16.035 36.677 16.101 37C16.034 37 15.967 37 15.9 37C11.4 37 7.8 40.6 7.8 45.1C7.8 49.6 11.4 53.2 15.9 53.2H48C53.523 53.2 58 48.723 58 43.2C58 37.677 53.523 33.2 48 33.2C47.994 33.2 47.988 33.2 47.982 33.2C47.994 33.467 48 33.735 48 34"
      fill="#FFFFFF"
      stroke="#CCCCCC"
      strokeWidth="2"
    />
  </svg>
);

export const CloudyIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <path 
      d="M56 44C56 36.268 49.732 30 42 30C36.311 30 31.43 33.401 29.368 38.276C28.939 38.097 28.48 38 28 38C25.791 38 24 39.791 24 42C24 42.342 24.035 42.677 24.101 43C24.034 43 23.967 43 23.9 43C19.4 43 15.8 46.6 15.8 51.1C15.8 55.6 19.4 59.2 23.9 59.2H56C61.523 59.2 66 54.723 66 49.2C66 43.677 61.523 39.2 56 39.2C55.994 39.2 55.988 39.2 55.982 39.2C55.994 39.467 56 39.735 56 40"
      fill="#FFFFFF"
      stroke="#CCCCCC"
      strokeWidth="2"
    />
    <path 
      d="M40 30C40 22.268 33.732 16 26 16C20.311 16 15.43 19.401 13.368 24.276C12.939 24.097 12.48 24 12 24C9.791 24 8 25.791 8 28C8 28.342 8.035 28.677 8.101 29C8.034 29 7.967 29 7.9 29C3.4 29 -0.2 32.6 -0.2 37.1C-0.2 41.6 3.4 45.2 7.9 45.2H40C45.523 45.2 50 40.723 50 35.2C50 29.677 45.523 25.2 40 25.2C39.994 25.2 39.988 25.2 39.982 25.2C39.994 25.467 40 25.735 40 26"
      fill="#E6E6E6"
      stroke="#CCCCCC"
      strokeWidth="2"
    />
  </svg>
);

export const RainIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <path 
      d="M48 30C48 22.268 41.732 16 34 16C28.311 16 23.43 19.401 21.368 24.276C20.939 24.097 20.48 24 20 24C17.791 24 16 25.791 16 28C16 28.342 16.035 28.677 16.101 29C16.034 29 15.967 29 15.9 29C11.4 29 7.8 32.6 7.8 37.1C7.8 41.6 11.4 45.2 15.9 45.2H48C53.523 45.2 58 40.723 58 35.2C58 29.677 53.523 25.2 48 25.2C47.994 25.2 47.988 25.2 47.982 25.2C47.994 25.467 48 25.735 48 26"
      fill="#FFFFFF"
      stroke="#CCCCCC"
      strokeWidth="2"
    />
    <path d="M24 45L21 52" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 45L29 52" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 45L37 52" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 49L25 56" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 49L33 56" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ShowerRainIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <path 
      d="M48 30C48 22.268 41.732 16 34 16C28.311 16 23.43 19.401 21.368 24.276C20.939 24.097 20.48 24 20 24C17.791 24 16 25.791 16 28C16 28.342 16.035 28.677 16.101 29C16.034 29 15.967 29 15.9 29C11.4 29 7.8 32.6 7.8 37.1C7.8 41.6 11.4 45.2 15.9 45.2H48C53.523 45.2 58 40.723 58 35.2C58 29.677 53.523 25.2 48 25.2C47.994 25.2 47.988 25.2 47.982 25.2C47.994 25.467 48 25.735 48 26"
      fill="#E6E6E6"
      stroke="#CCCCCC"
      strokeWidth="2"
    />
    <path d="M20 45L19 49M17 51L16 55" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M28 45L27 49M25 51L24 55" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 45L35 49M33 51L32 55" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 45L43 49M41 51L40 55" stroke="#3498DB" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ThunderstormIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <path 
      d="M48 30C48 22.268 41.732 16 34 16C28.311 16 23.43 19.401 21.368 24.276C20.939 24.097 20.48 24 20 24C17.791 24 16 25.791 16 28C16 28.342 16.035 28.677 16.101 29C16.034 29 15.967 29 15.9 29C11.4 29 7.8 32.6 7.8 37.1C7.8 41.6 11.4 45.2 15.9 45.2H48C53.523 45.2 58 40.723 58 35.2C58 29.677 53.523 25.2 48 25.2C47.994 25.2 47.988 25.2 47.982 25.2C47.994 25.467 48 25.735 48 26"
      fill="#515A6E"
      stroke="#454C5E"
      strokeWidth="2"
    />
    <path d="M32 44L27 50H34L29 59" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
    <path d="M42 44L37 50H44L39 59" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" />
  </svg>
);

export const SnowIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <path 
      d="M48 30C48 22.268 41.732 16 34 16C28.311 16 23.43 19.401 21.368 24.276C20.939 24.097 20.48 24 20 24C17.791 24 16 25.791 16 28C16 28.342 16.035 28.677 16.101 29C16.034 29 15.967 29 15.9 29C11.4 29 7.8 32.6 7.8 37.1C7.8 41.6 11.4 45.2 15.9 45.2H48C53.523 45.2 58 40.723 58 35.2C58 29.677 53.523 25.2 48 25.2C47.994 25.2 47.988 25.2 47.982 25.2C47.994 25.467 48 25.735 48 26"
      fill="#FFFFFF"
      stroke="#CCCCCC"
      strokeWidth="2"
    />
    <circle cx="24" cy="49" r="2" fill="#E6E6E6" />
    <circle cx="32" cy="53" r="2" fill="#E6E6E6" />
    <circle cx="40" cy="49" r="2" fill="#E6E6E6" />
    <circle cx="32" cy="45" r="2" fill="#E6E6E6" />
    <circle cx="24" cy="57" r="2" fill="#E6E6E6" />
    <circle cx="40" cy="57" r="2" fill="#E6E6E6" />
  </svg>
);

export const MistIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 40 
}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width={size} 
    height={size} 
    className={className}
  >
    <path d="M16 24H48" stroke="#B7B7B7" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 30H54" stroke="#B7B7B7" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 36H52" stroke="#B7B7B7" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 42H46" stroke="#B7B7B7" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 48H42" stroke="#B7B7B7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
