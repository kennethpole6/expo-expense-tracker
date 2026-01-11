import RecentTransactions from "@/components/recent-transaction";
import { ArrowDownRight, ArrowUpRight, WalletIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <View className="flex-1 flex flex-col">
      <SafeAreaView className="flex-1 p-4">
        <View className="bg-white rounded-2xl mx-4 p-4 gap-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-semibold">Total Balance</Text>
              <Text className="text-2xl font-bold">$0.00</Text>
            </View>
            <View>
              <WalletIcon size={24} color="black" />
            </View>
          </View>
          <View className="flex-row justify-around items-center">
            <View className="flex-1 flex-row gap-2 items-center">
              <ArrowIcon isUp={true} />
              <View>
                <Text>Income</Text>
                <Text>$0.00</Text>
              </View>
            </View>
            <View className="flex-1 flex-row gap-2 items-center">
              <ArrowIcon isUp={false} />
              <View>
                <Text>Expenses</Text>
                <Text>$0.00</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <RecentTransactions />
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
