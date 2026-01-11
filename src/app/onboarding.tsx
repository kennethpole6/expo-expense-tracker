import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React, { useRef } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

// --- Data Model ---
type OnboardingData = {
  id: string;
  title: string;
  description: string;
};

const onboardingData: OnboardingData[] = [
  {
    id: "1",
    title: "Track your spend with style",
    description:
      "Keep track of your daily expenses with a clean, monochrome interface designed for clarity.",
  },
  {
    id: "2",
    title: "Analyze monthly habits",
    description:
      "Review your spending patterns with intuitive black and white charts and summaries.",
  },
  {
    id: "3",
    title: "Achieve financial goals",
    description:
      "Set budget limits and save money without the distraction of colorful charts.",
  },
];

// --- Component: Single Slide ---
const OnboardingSlide = ({ item }: { item: OnboardingData }) => {
  return (
    // w-screen ensures the slide takes full width
    <View className="w-screen flex-1 px-8 pt-32">
      {/* Icon Placeholder */}
      <View className="w-16 h-16 rounded-2xl bg-neutral-200 justify-center items-center mb-10">
        <View className="w-7 h-7 rounded-full bg-white" />
      </View>

      {/* Text Content */}
      <View className="max-w-[90%]">
        <Text className="text-5xl font-extrabold text-black mb-5 leading-tight tracking-tighter">
          {item.title}
        </Text>
        <Text className="text-lg text-neutral-500 leading-7 font-normal">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

// --- Component: Animated Pagination Dot ---
const PaginationDot = ({
  index,
  translateX,
}: {
  index: number;
  translateX: any;
}) => {
  const rDotStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const dotWidth = interpolate(
      translateX.value,
      inputRange,
      [10, 32, 10], // Inactive width: 10, Active: 32
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.3, 1, 0.3], // Inactive opacity: 0.3, Active: 1
      Extrapolate.CLAMP
    );

    return {
      width: dotWidth,
      opacity: opacity,
    };
  });

  // Tailwind handles height, color, rounding. Reanimated handles width/opacity.
  return (
    <Animated.View
      className="h-2.5 rounded-full bg-black mr-2"
      style={rDotStyle}
    />
  );
};

// --- Main Component ---
const OnboardingScreen = () => {
  const translateX = useSharedValue(0);
  const router = useRouter();
  const flatListRef = useRef<FlatList<OnboardingData>>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const handleNextPress = async () => {
    const currentIndex = Math.round(translateX.value / width);
    const nextIndex = currentIndex + 1;

    if (nextIndex < onboardingData.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      await AsyncStorage.setItem("onboarding-complete", "true");
      router.replace("/");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
      />

      {/* Footer Container */}
      <View className="absolute bottom-12 left-8 right-8 flex-row justify-between items-center">
        {/* Pagination Dots */}
        <View className="flex-row items-center h-16">
          {onboardingData.map((_, index) => (
            <PaginationDot
              key={index.toString()}
              index={index}
              translateX={translateX}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className="w-16 h-16 rounded-full bg-black justify-center items-center shadow-lg shadow-black/30"
          onPress={handleNextPress}
          activeOpacity={0.8}
        >
          <ArrowRight size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
