import {ReactNode, createContext, useState} from 'react';

interface ILoadingContext {
  loadingPage: boolean;
  setLoadingPage: Function;
}

export const LoadingContext = createContext<ILoadingContext>({
  loadingPage: false,
  setLoadingPage: (loading: boolean) => {},
});

export const LoadingContextProvider = ({children}: {children: ReactNode}) => {
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{loadingPage, setLoadingPage}}>
      {children}
    </LoadingContext.Provider>
  );
};
