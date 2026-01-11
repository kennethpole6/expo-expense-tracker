import { Coffee, LucideIcon, Map, ShoppingBag, Tv } from "lucide-react-native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
// --- Types ---
type Transaction = {
  id: string;
  title: string;
  date: string;
  amount: string;
  iconName: LucideIcon;
};

// --- Mock Data (Matching your image) ---
const transactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Run",
    date: "2023-10-24",
    amount: "-$85.50",
    iconName: ShoppingBag,
  },
  {
    id: "2",
    title: "Uber Ride",
    date: "2023-10-23",
    amount: "-$24.00",
    iconName: Map, // Feather doesn't have a car, using map-pin
  },
  {
    id: "3",
    title: "Netflix",
    date: "2023-10-22",
    amount: "-$15.99",
    iconName: Tv,
  },
  {
    id: "4",
    title: "Coffee",
    date: "2023-10-22",
    amount: "-$4.50",
    iconName: Coffee,
  },
  {
    id: "5",
    title: "Grocery Run",
    date: "2023-10-24",
    amount: "-$85.50",
    iconName: ShoppingBag,
  },
  {
    id: "6",
    title: "Uber Ride",
    date: "2023-10-23",
    amount: "-$24.00",
    iconName: Map, // Feather doesn't have a car, using map-pin
  },
];

// --- Sub-Component: Transaction Card ---
const TransactionCard = ({
  item,
  index,
}: {
  item: Transaction;
  index: number;
}) => {
  const Icon = item.iconName;
  return (
    <Animated.View
      // Animation: Fade in and slide up, delayed by index for a staggered effect
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()}
      layout={Layout.springify()}
      className="mb-4 w-full"
    >
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center p-5 bg-neutral-50 rounded-3xl border border-neutral-200"
      >
        {/* Icon Container (Left) */}
        <View className="h-12 w-12 rounded-xl bg-white border border-neutral-200 justify-center items-center mr-4 shadow-sm">
          <Icon size={20} color="#000000" />
        </View>

        {/* Text Details (Middle) */}
        <View className="flex-1">
          <Text className="text-base font-bold text-black mb-1">
            {item.title}
          </Text>
          <Text className="text-xs text-neutral-500 font-medium">
            {item.date}
          </Text>
        </View>

        {/* Amount (Right - keeping it simple) 
            Note: In your image the amount is below text, 
            but for a cleaner B&W list, right-aligned is usually clearer.
            However, to match the "blocky" feel, we can make it bold. 
        */}
        <View>
          <Text className="text-lg font-extrabold text-black">
            {item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Main Component ---
const RecentTransactions = () => {
  return (
    <View className="flex-1 bg-white rounded-2xl mx-4 px-4 pt-10">
      {/* Header Section */}
      <View className="flex-row justify-between items-end mb-6">
        <Text className="text-2xl font-bold text-black tracking-tight">
          Recent Transactions
        </Text>
        <TouchableOpacity>
          <Text className="text-sm font-semibold text-neutral-400 pb-1">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TransactionCard item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default RecentTransactions;
