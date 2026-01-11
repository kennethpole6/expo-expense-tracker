import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="add-expense" />
      <Tabs.Screen name="recurring" />
    </Tabs>
  );
}
