import Card from "@/components/card";
import RecentTransactions from "@/components/recent-transaction";
import { useRouter } from "expo-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react-native";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 mt-2 gap-1">
        <Card
          title="Expenses"
          amount="$0.00"
          category="expenses"
          onClick={() => router.push("/expenses")}
        />
        <Card
          title="Recurring"
          amount="$0.00"
          category="recurring"
          onClick={() => router.push("/recurring")}
        />
        <Card
          title="Total"
          amount="$0.00"
          category="total"
          onClick={() => router.push("/")}
        />
        <RecentTransactions />
      </View>
    </View>
  );
}

interface Props {
  isUp: boolean;
}

function ArrowIcon({ isUp }: Props) {
  return (
    <View
      className={
        isUp
          ? "bg-green-500 w-6 h-6 p-4 rounded-full flex items-center justify-center"
          : "bg-red-500 w-6 h-6 p-4 rounded-full flex items-center justify-center"
      }
    >
      {isUp ? (
        <ArrowUpRight color="#fff" className="w-6 h-6" />
      ) : (
        <ArrowDownRight color="#fff" className="w-6 h-6" />
      )}
    </View>
  );
}
