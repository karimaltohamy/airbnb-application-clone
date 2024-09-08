import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";

interface Props {
  items: any;
  category: string;
}

const renderItem: ListRenderItem<Listing> = ({ item }) => {
  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity style={styles.listing}>
        <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 14, fontFamily: "mon-sb", color: "black" }}
            >
              {item.name.length > 40
                ? item.name.slice(0, 40) + "..."
                : item.name}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Ionicons name="star-outline" size={15} color="black" />
              <Text
                style={{ fontSize: 12, fontFamily: "mon-sb", color: "black" }}
              >
                {Number(
                  item.review_scores_rating / item.number_of_reviews
                ).toFixed(1)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "mon",
              color: "black",
              marginTop: 5,
            }}
          >{`${item.room_type}`}</Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "mon-sb",
              color: "black",
              marginTop: 5,
            }}
          >{`€ ${item.price} night`}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default function Listings({ items, category }: Props) {
  const listRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={loading ? [] : items}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listing: {
    padding: 14,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});
