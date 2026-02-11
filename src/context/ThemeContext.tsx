import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  glow: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  setColorsFromImage: (imageUrl: string) => void;
  resetColors: () => void;
}

const defaultColors: ThemeColors = {
  primary: '180 100% 50%', // Cyan
  secondary: '300 100% 50%', // Magenta
  glow: '180 100% 50%', // Cyan
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Adjust color brightness
function adjustBrightness(hsl: string, targetLightness: number): string {
  const parts = hsl.split(' ');
  const h = parts[0];
  const s = parts[1];
  return `${h} ${s} ${targetLightness}%`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  const applyColors = (newColors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-primary', newColors.primary);
    root.style.setProperty('--dynamic-secondary', newColors.secondary);
    root.style.setProperty('--dynamic-glow', newColors.glow);
  };

  const setColorsFromImage = async (imageUrl: string) => {
    try {
      // Dynamic import of color-thief
      const ColorThief = (await import('colorthief')).default;
      const colorThief = new ColorThief();
      
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        try {
          const palette = colorThief.getPalette(img, 3);
          
          if (palette && palette.length >= 2) {
            const [r1, g1, b1] = palette[0];
            const [r2, g2, b2] = palette[1];
            
            const primary = rgbToHsl(r1, g1, b1);
            const secondary = rgbToHsl(r2, g2, b2);
            
            // Use the more vibrant color for glow
            const primarySaturation = parseInt(primary.split(' ')[1]);
            const secondarySaturation = parseInt(secondary.split(' ')[1]);
            const glow = primarySaturation >= secondarySaturation 
              ? adjustBrightness(primary, 50) 
              : adjustBrightness(secondary, 50);

            const newColors = {
              primary: adjustBrightness(primary, 50),
              secondary: adjustBrightness(secondary, 50),
              glow,
            };
            
            setColors(newColors);
            applyColors(newColors);
          }
        } catch (e) {
          console.warn('Could not extract colors from image:', e);
        }
      };
      
      img.src = imageUrl;
    } catch (e) {
      console.warn('ColorThief error:', e);
    }
  };

  const resetColors = () => {
    setColors(defaultColors);
    applyColors(defaultColors);
  };

  // Apply initial colors
  useEffect(() => {
    applyColors(colors);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        colors,
        setColorsFromImage,
        resetColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
