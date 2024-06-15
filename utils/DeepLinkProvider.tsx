import React from "react";
import { useSession } from "./ctx";
import { Linking } from "react-native";

export function DeepLinkProvider({ children }) {
  const { setRedirectUrl } = useSession();
  React.useEffect(() => {
    const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
      setRedirectUrl(url);
    });
    return () => {
      linkingSubscription.remove();
    };
  }, []);
  return <>{children}</>;
}
