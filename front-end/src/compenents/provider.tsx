'use client'
import { BundleApi, Channel, MCatalogues, Plan, ServiceType } from '@/_types';
import React, {createContext, useEffect, useState} from 'react';

export type AppContextInterface = {
    catalogues: MCatalogues[],
    setCatalogues: (catalogue: MCatalogues[]) => any,
    channels: Channel[],
    setChannels: (catalogue: Channel[]) => any,
    plans: Plan[],
    setPlans: (catalogue: Plan[]) => any,
    serviceTypes: ServiceType[],
    setServiceTypes: (catalogue: ServiceType[]) => any,
    bundles: BundleApi[],
    setBundles: (catalogue: BundleApi[]) => any,
    loading: boolean
} 

export const defaultContext: AppContextInterface = {
    setCatalogues: () => {},
    catalogues: [],
    setChannels: () => {},
    channels: [],
    setPlans: () => {},
    plans: [],
    setServiceTypes: () => {},
    serviceTypes: [],
    setBundles: () => {},
    bundles: [],
    loading: true
}

export const AuthContext = createContext<AppContextInterface >(defaultContext);

export const Provider = ({children}: any) => {
  const [catalogues, setCatalogues] = useState<MCatalogues[]>([])
  const [channels, setChannels] = useState<Channel[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [bundles, setBundles] = useState<BundleApi[]>([])
  const [loading, setLoading] = useState(true)


  return (
    <AuthContext.Provider
      value={{
        catalogues, 
        setCatalogues,
        channels,
        setChannels,
        plans,
        setPlans,
        setServiceTypes,
        serviceTypes,
        bundles,
        setBundles,
        loading
      }}>
      {children}
    </AuthContext.Provider>
  );
};
