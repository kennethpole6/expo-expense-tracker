import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Text className="text-xl font-bold">Expense Tracker</Text>
      <Link href="/onboarding">Get Started</Link>
    </SafeAreaView>
  );
}
