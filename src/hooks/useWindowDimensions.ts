import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface WindowDimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export const useWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() => {
    const window = Dimensions.get('window');
    return {
      width: window.width,
      height: window.height,
      scale: window.scale,
      fontScale: window.fontScale,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', (result: { window: ScaledSize }) => {
      setDimensions({
        width: result.window.width,
        height: result.window.height,
        scale: result.window.scale,
        fontScale: result.window.fontScale,
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}; 