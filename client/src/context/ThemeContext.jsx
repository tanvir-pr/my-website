import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  const [backgroundEffect, setBackgroundEffect] = useState(() => {
    const savedBgEffect = localStorage.getItem('backgroundEffect');
    return savedBgEffect === 'false' ? false : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('backgroundEffect', backgroundEffect);
  }, [backgroundEffect]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const toggleBackgroundEffect = () => {
    setBackgroundEffect(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundEffect, toggleBackgroundEffect }}>
      {children}
    </ThemeContext.Provider>
  );
};
