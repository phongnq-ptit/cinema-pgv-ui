import {ReactNode, createContext, useState} from 'react';
import {User} from '../../models/User';

interface IAuthContext {
  accessToken: string;
  setAccessToken: Function;
  refreshToken: string;
  setRefreshToken: Function;
  LoginUser: User;
  setLoginUser: Function;
  error: {open: boolean; content: string};
  setError: Function;
}

export const AuthContext = createContext<IAuthContext>({
  accessToken: '',
  setAccessToken: (value: string) => {},
  refreshToken: '',
  setRefreshToken: (value: string) => {},
  LoginUser: {} as User,
  setLoginUser: (value: User) => {},
  error: {open: false, content: ''},
  setError: (error: any) => {},
});

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const loginObj = localStorage.getItem('login');
  const [accessToken, setAccessToken] = useState<string>(
    loginObj ? JSON.parse(loginObj).accessToken : ''
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    loginObj ? JSON.parse(loginObj).refreshToken : ''
  );
  const [LoginUser, setLoginUser] = useState<User>(
    loginObj ? JSON.parse(loginObj).user : ({} as User)
  );
  const [error, setError] = useState<{open: boolean; content: string}>({
    open: false,
    content: '',
  });

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        LoginUser,
        setLoginUser,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
