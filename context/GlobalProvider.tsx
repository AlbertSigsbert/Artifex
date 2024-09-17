import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";


interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: { username: string; email: string; avatar: string; } | null;
  setUser:React.Dispatch<React.SetStateAction<{ username: string; email: string; avatar: string } | null>>;
  isLoading: boolean;
}

// Initial/default values for the context
const defaultState: AppContextType = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setIsLoggedIn: () => { },
  setUser:() => {},
};

// Create the context
const AppContext = createContext<AppContextType>(defaultState);

// Custom hook to use the AppContext
const useAppContext = () => useContext(AppContext);



interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     getCurrentUser().then((currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      }else{
        setIsLoggedIn(false);
        setUser(null)
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    })

   
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
