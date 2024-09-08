import { View, Text, SafeAreaView } from "react-native";
import { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/listingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function index() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const items = useMemo(() => listingsData as any, []);

  const onCategoryChanged = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 120 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      ></Stack.Screen>
      <GestureHandlerRootView>
        <ListingsMap listings={listingsDataGeo} />
        <ListingsBottomSheet listings={items} category={selectedCategory} />
      </GestureHandlerRootView>
    </View>
  );
}
