import { createContext, useContext, useState, ReactNode } from 'react';
import Voci from '../models/voci';

interface VociContextType {
  vociList: Voci[];
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
  // TODO Fügen Sie hier Ihre eigenen Vokabeln ein
  const [vociList, setVociList] = useState<Voci[]>([
    { term: 'apple', translation: 'Apfel' },
    { term: 'banana', translation: 'Banane' },
    { term: 'cherry', translation: 'Kirsche' },
  ]);

  const addVoci = (voci: Voci) => {
    setVociList((current) => [...current, voci]);
  };

  const updateVoci = (term: string, updatedVoci: Voci) => {
    setVociList((current) =>
      current.map((voci) => (voci.term === term ? updatedVoci : voci)),
    );
  };

  const removeVoci = (term: string) => {
    setVociList((current) => current.filter((voci) => voci.term !== term));
  };

  return (
    <VociContext.Provider value={{ vociList, addVoci, updateVoci, removeVoci }}>
      {children}
    </VociContext.Provider>
  );
}

export function useVoci() {
  const context = useContext(VociContext);
  if (!context) {
    throw new Error('useVoci muss innerhalb von VociProvider verwendet werden');
  }
  return context;
}