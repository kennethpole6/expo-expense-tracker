import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  amount: string;
  category: "expenses" | "recurring" | "total";
  onClick?: () => void;
}

export default function Card({ title, amount, category, onClick }: Props) {
  return (
    <TouchableOpacity
      onPress={onClick}
      className={
        category === "expenses"
          ? "bg-[#850E35] p-4 rounded-3xl my-1 mx-4"
          : category === "recurring"
          ? "bg-[#EE6983] p-4 rounded-3xl my-1 mx-4"
          : "bg-[#FFC4C4] p-4 rounded-3xl mt-1 mx-4"
      }
    >
      <View className="flex-row items-center gap-2 mb-1">
        <View className="size-2 rounded-full bg-white"></View>
        <Text className="text-white font-medium">{title}</Text>
      </View>
      <Text className="text-white font-bold text-4xl">{amount}</Text>
    </TouchableOpacity>
  );
}
