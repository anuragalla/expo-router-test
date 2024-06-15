import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider, useSession } from "@/utils/ctx";
import { Text } from "react-native";
import { useBootstrap } from "@/hooks/useBootstrap";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const { session, isLoading, getRedirectUrl } = useSession();
  const redirectUrl = getRedirectUrl();
  const { data, isLoading: isBootStrapLoading } = useBootstrap();
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);
  if (isLoading || isBootStrapLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  console.log(data);
  return <Slot initialRouteName={"(tabs)"} />;
}
