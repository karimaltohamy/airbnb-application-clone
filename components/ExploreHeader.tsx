import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

export default function ExploreHeader({ onCategoryChanged }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const itemsRef = useRef<Array<any>>([]);
  const [activeItem, setActiveItem] = useState<number>(0);

  const selectCategory = (index: number, name: string) => {
    const selectedEle = itemsRef.current[index];
    setActiveItem(index);

    selectedEle.measure((x: number) => {
      scrollViewRef.current?.scrollTo({
        x: x - 16,
        y: 0,
        animated: true,
      });
    });

    onCategoryChanged(name);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            gap: 10,
          }}
        >
          {/* <Link href={"/(modal)/booking"} style={{ flex: 1 }}> */}
          <TouchableOpacity
            style={styles.searchBox}
            onPress={() => router.push("/(modal)/booking")}
          >
            <Ionicons name="search-outline" size={24} color="black" />
            <View>
              <Text
                style={{ fontSize: 14, color: "black", fontFamily: "mon-sb" }}
              >
                Where to ?
              </Text>
              <Text style={{ fontSize: 12, color: "gray", fontFamily: "mon" }}>
                Anywhere . AnyWeek
              </Text>
            </View>
          </TouchableOpacity>
          {/* </Link> */}
          <TouchableOpacity style={styles.btnOptions}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
          }}
          ref={scrollViewRef}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              style={[
                styles.btnCategory,
                {
                  borderBlockColor: "black",
                  borderBottomWidth: activeItem === index ? 2 : 0,
                },
              ]}
              ref={(el) => (itemsRef.current[index] = el)}
              key={category.name}
              onPress={() => selectCategory(index, category.name)}
            >
              <MaterialIcons
                name={category.icon as any}
                size={24}
                color={activeItem === index ? "black" : "gray"}
              />
              <Text
                style={
                  activeItem === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  btnOptions: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#dddddd",
    borderWidth: 1,
    width: "100%",
    alignSelf: "stretch",
    padding: 10,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  btnCategory: { paddingBottom: 12, alignItems: "center" },
  categoryText: {
    fontSize: 14,
    // fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    // fontFamily: "mon-sb",
    color: "#000",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
