'use client'

import { createContext, useState, useContext } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
  children: React.ReactNode;
}) {
  let [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{
      loading,
      setLoading
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}