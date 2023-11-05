// src/contexts/MapApiLoaderContext.tsx
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import { LoadScriptProps, useLoadScript } from '@react-google-maps/api';

interface MapApiLoaderContextProps {
  isLoaded: boolean;
  loadError?: Error;
}

const MapApiLoaderContext = createContext<MapApiLoaderContextProps | undefined>(undefined);

interface MapApiLoaderProviderProps {
  children: ReactNode;
  apiKey: string;
}

export const useMapApiLoader = (): MapApiLoaderContextProps => {
  const context = useContext(MapApiLoaderContext);
  if (context === undefined) {
    throw new Error('useMapApiLoader must be used within a MapApiLoaderProvider');
  }
  return context;
};

export const MapApiLoaderProvider: FC<MapApiLoaderProviderProps> = ({ children, apiKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | undefined>(undefined);

  const { isLoaded: scriptLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    setIsLoaded(scriptLoaded);
    setLoadError(scriptLoadError);
  }, [scriptLoaded, scriptLoadError]);

  return (
    <MapApiLoaderContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapApiLoaderContext.Provider>
  );
};