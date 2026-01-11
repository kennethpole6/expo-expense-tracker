import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "../global.css";
export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const completed = await AsyncStorage.getItem("onboarding-complete");

        if (!completed && mounted) {
          router.replace("/onboarding");
        }
      } catch (e) {
        console.error("Onboarding check failed", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
