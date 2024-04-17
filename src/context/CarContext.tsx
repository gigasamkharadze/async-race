import React, {
  createContext, useState, useEffect, useContext, ReactNode, useMemo,
  useCallback,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import CarWithId from '../interfaces/cars/carWithId.ts';

interface GarageContextType {
  garage: CarWithId[];
  setGarage: React.Dispatch<React.SetStateAction<CarWithId[]>>,
  refetchGarage: () => void;
  garagePage: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

const GarageContext = createContext<GarageContextType | undefined>(undefined);

export const useGarage = (): GarageContextType => {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used within a GarageProvider');
  }
  return context;
};

interface GarageProviderProps {
  children: ReactNode;
}

export function GarageProvider({ children }: GarageProviderProps) {
  const [garage, setGarage] = useState<CarWithId[]>([]);
  const [garagePage, setGaragePage] = useLocalStorage('garagePage', 1);
  const limit = 7;

  const refetchGarage = useCallback(() => {
    fetch(`http://127.0.0.1:3000/garage?_page=${garagePage}&_limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setGarage(data);
      });
  }, [garagePage, limit, setGarage]);

  useEffect(() => {
    refetchGarage();
  }, [garagePage, refetchGarage]);

  const fireBaseProviderValue = useMemo(() => ({
    garage,
    setGarage,
    garagePage,
    refetchGarage,
    goToNextPage: () => {
      if (garage.length < limit) return;
      setGaragePage(garagePage + 1);
    },
    goToPrevPage: () => setGaragePage(Math.max(garagePage - 1, 1)),
  }), [garage, refetchGarage, garagePage, setGaragePage]);

  return (
    <GarageContext.Provider value={fireBaseProviderValue}>
      {children}
    </GarageContext.Provider>
  );
}
