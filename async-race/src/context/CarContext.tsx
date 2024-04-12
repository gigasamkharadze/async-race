import React, {
  createContext, useState, useEffect, useContext, ReactNode, useMemo,
  useCallback,
} from 'react';

interface Car {
  id: number;
  name: string;
  color: string;
}

interface GarageContextType {
  garage: Car[];
  setGarage: React.Dispatch<React.SetStateAction<Car[]>>,
  refetchGarage: () => void;
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
  const [garage, setGarage] = useState<Car[]>([]);
  const [garagePage, setGaragePage] = useState(1);
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
    refetchGarage,
    goToNextPage: () => {
      if (garage.length < limit) return;
      setGaragePage((prevPage) => prevPage + 1);
    },
    goToPrevPage: () => setGaragePage((prevPage) => Math.max(prevPage - 1, 1)),
  }), [garage, refetchGarage]);

  return (
    <GarageContext.Provider value={fireBaseProviderValue}>
      {children}
    </GarageContext.Provider>
  );
}
