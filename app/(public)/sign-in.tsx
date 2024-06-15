import { useSession } from "@/utils/ctx";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { signIn, getRedirectUrl } = useSession();
  const redirectUrl = getRedirectUrl();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          if (redirectUrl) {
            console.log("redirecting from signIn", redirectUrl);
            router.replace(redirectUrl);
          } else {
            router.replace("/");
          }
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
