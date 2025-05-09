
import { createContext, useContext, useReducer, useEffect } from "react";
import { User, AuthState } from "@/types/auth";
import authService from "@/services/authService";
import { toast } from "@/components/ui/use-toast";

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        
        if (user) {
          console.log('User authenticated', user);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user },
          });
        } else {
          console.log('No authenticated user found');
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error('Error during auth initialization:', error);
        dispatch({ type: "LOGOUT" });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await authService.login({ email, password });
      
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: response.user },
      });
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.user.name}`,
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Authentication failed. Please try again.";
      
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await authService.register({ name, email, password });
      
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: response.user },
      });
      
      toast({
        title: "Registration Successful",
        description: `Welcome, ${response.user.name}`,
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Registration failed. Please try again.";
      
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
      
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
