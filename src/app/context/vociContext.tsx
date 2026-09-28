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
  
const [vociList, setVociList] = useState<Voci[]>([
  { term: 'apple', translation: 'Apfel' },
  { term: 'banana', translation: 'Banane' },
  { term: 'cherry', translation: 'Kirsche' },
  { term: 'orange', translation: 'Orange' },
  { term: 'strawberry', translation: 'Erdbeere' },
  { term: 'grape', translation: 'Traube' },
  { term: 'pineapple', translation: 'Ananas' },
  { term: 'watermelon', translation: 'Wassermelone' },
  { term: 'lemon', translation: 'Zitrone' },
  { term: 'peach', translation: 'Pfirsich' },
  { term: 'pear', translation: 'Birne' },
  { term: 'plum', translation: 'Pflaume' },
  { term: 'raspberry', translation: 'Himbeere' },
  { term: 'blueberry', translation: 'Heidelbeere' },
  { term: 'mango', translation: 'Mango' },
  { term: 'apricot', translation: 'Aprikose' },
  { term: 'kiwi', translation: 'Kiwi' },
  { term: 'coconut', translation: 'Kokosnuss' },
  { term: 'fig', translation: 'Feige' },
  { term: 'pomegranate', translation: 'Granatapfel' },
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