import { StyleSheet } from "react-native";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

const AuthUserStateContext = createContext({
  initializing: false,
  user: null as User | null,
});

const AuthUserProvider = (props: AuthUserProviderProps) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onAuthStateChangedCallback = (newUser: User | null) => {
    setUser(newUser);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedCallback);
    return () => unsubscribe();
  }, []);

  return (
    <AuthUserStateContext.Provider
      value={{ initializing: initializing, user: user }}
    >
      {props.children}
    </AuthUserStateContext.Provider>
  );
};

export default AuthUserProvider;

export const useAuthStateContext = () => useContext(AuthUserStateContext);

const styles = StyleSheet.create({});

interface AuthUserProviderProps {
  children: ReactNode;
}
