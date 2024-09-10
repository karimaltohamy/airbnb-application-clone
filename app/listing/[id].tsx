import { useGlobalSearchParams, useNavigation } from "expo-router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import listingsData from "@/assets/data/airbnb-listings.json";
import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import MainContext from "@/context/main.context";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

export default function Page() {
  const { id } = useGlobalSearchParams();
  const navigation = useNavigation();
  const listing: Listing = (listingsData as any[]).find(
    (listing: any) => listing.id === id
  );
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { wishlist, saveWishlist } = useContext(MainContext);
  const [isExist, setIsExist] = useState<boolean>(
    wishlist.some((listing: Listing) => listing.id === id)
  );

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isExist);

  useLayoutEffect(() => {
    navigation.setOptions({
      headeTitle: "",
      headerTransparent: true,
      headerBackground: () => {
        return (
          <Animated.View
            style={[headerAnimatedStyle, styles.header]}
          ></Animated.View>
        );
      },
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity style={styles.btnHeader} onPress={shareListing}>
            <Feather name="share" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnHeader}
            onPress={() => {
              saveWishlist(listing);
              setIsExist(
                wishlist.some((listing: Listing) => listing.id === id)
              );
            }}
          >
            <Ionicons
              name={isExist ? "heart" : "heart-outline"}
              size={24}
              color={isExist ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnHeader}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-sharp" size={20} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [isExist]);

  useEffect(() => {
    setIsExist(wishlist.some((listing: Listing) => listing.id === id));
  }, [id, wishlist]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[{ width, height: IMG_HEIGHT }, imageAnimatedStyle]}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{listing.name}</Text>
          <Text
            style={styles.subtitle}
          >{`${listing.room_type} In ${listing.host_location}`}</Text>
          <Text
            style={styles.details}
          >{`${listing.guests_included} guests · ${listing.bedrooms} bedrooms · ${listing.bathrooms} bathrooms · ${listing.beds} beds`}</Text>
          <View style={styles.rate}>
            <Ionicons name="star" size={16} color="black" />
            <Text
              style={{ fontSize: 13, fontFamily: "mon-b", color: "black" }}
            >{`${Number(
              listing.review_scores_rating / listing.number_of_reviews
            ).toFixed(1)} · ${listing.review_scores_rating} reviews`}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.desc}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "mon-sb",
              color: "black",
            }}
          >
            {`€ ${listing.price}`}
          </Text>
          <Text style={{ fontSize: 12, fontFamily: "mon-sb", color: "black" }}>
            night
          </Text>
        </View>
        <TouchableOpacity style={styles.btnReserve}>
          <Text style={styles.textReserve}>Reserve</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnHeader: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontFamily: "mon-sb",
    color: "black",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "black",
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "gray",
    marginBottom: 10,
  },
  rate: { flexDirection: "row", gap: 10 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  desc: {
    fontSize: 15,
    fontFamily: "mon-sb",
    color: "#353535",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderColor: "#dddddd",
    borderTopWidth: 1,
    // paddingVertical: 10,
    height: 80,
    paddingHorizontal: 24,
  },
  btnReserve: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textReserve: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
});
