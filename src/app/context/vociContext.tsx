import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Text, View } from 'react-native';
import Voci from '../models/voci';

interface VociContextType {
  vociList: Voci[];
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const [isLoadVocisDone, setIsLoadVocisDone] = useState(false);

  const [isLoadingDataDone, setIsLoadingDataDone] = useState(false);

  useEffect(() => {
    async function loadvoci() {
      console.log("loading vocis")
      try {
        await delay(2000);
        const storedVoci = await AsyncStorage.getItem('vociList');
        console.log("loaded vocis:")
        console.log(storedVoci)

        if (storedVoci !== null) {
          console.log("setting...")
          setVociList(JSON.parse(storedVoci));
        }
        else {
          console.log("Keine neuen Vocis zum Laden")
        }
      }
      catch {
        console.error("JSON.parse() error")
      }
      finally {
        setIsLoadVocisDone(true)
        setIsLoadingDataDone(true)
      }
    }
    loadvoci();
  }, []);

  useEffect(() => {

    async function vocisChanged() {
      if (isLoadVocisDone == false) {
        console.log("Waiting for loadvoci")
        return;
      }

      try {
        await AsyncStorage.setItem('vociList', JSON.stringify(vociList));
        console.log("saving vocis")
        console.log(vociList)
      }
      catch {
        console.error("couldnt save data in asyncstorage")
      }

    }
    vocisChanged();
  }, [vociList]);

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

if (!isLoadingDataDone) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Lade Vokabeln...</Text>
      </View>
    );
  }

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


