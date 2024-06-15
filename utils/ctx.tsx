import { useStorageState } from "@/hooks/useStorageState";
import React from "react";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  setRedirectUrl: (url: string | null) => void;
  getRedirectUrl: () => string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  setRedirectUrl: () => null,
  getRedirectUrl: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [redirectUrl, _setRedirectUrl] = React.useState<string | null>(null);
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        setRedirectUrl: (url) => {
          console.log("setting redirect url", url);
          _setRedirectUrl(url);
        },
        getRedirectUrl: () => {
          console.log("getting redirect url", redirectUrl);
          if (redirectUrl) {
            return redirectUrl.replaceAll("myapp://", "");
          } else {
            return null;
          }
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
