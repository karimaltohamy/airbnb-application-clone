import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { defaultStyles } from "@/constants/Styles";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { places } from "@/assets/data/places";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";
import Colors from "@/constants/Colors";

interface Guest {
  name: string;
  text: string;
  count: number;
}

const guestsGropus: Guest[] = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export default function booking() {
  const router = useRouter();
  const [selectPlace, setSelectPlace] = useState<number>(0);
  const [openCard, setOpenCard] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [groups, setGroups] = useState<Guest[]>(guestsGropus);

  return (
    <BlurView style={{ flex: 1 }} intensity={100} tint="light">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 18 }}>
          {/* where */}
          <View style={styles.card}>
            {openCard !== 0 && (
              <AnimatedTouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => setOpenCard(0)}
                entering={FadeIn.delay(200)}
                exiting={FadeOut.delay(200)}
              >
                <Text
                  style={{ fontSize: 13, fontFamily: "mon-sb", color: "gray" }}
                >
                  Where
                </Text>
                <Text
                  style={{ fontSize: 13, fontFamily: "mon-sb", color: "black" }}
                >
                  I'm flexible
                </Text>
              </AnimatedTouchableOpacity>
            )}
            {openCard == 0 && (
              <Animated.View entering={FadeIn}>
                <Text style={styles.titleCard}>Where to ?</Text>
                <View style={styles.SearchInput}>
                  <Ionicons name="search-outline" size={24} color="black" />
                  <TextInput placeholder="Search destination" />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ alignItems: "center", gap: 12 }}
                >
                  {places.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectPlace(index)}
                      >
                        <Image
                          source={item.img}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor:
                              selectPlace === index ? "black" : "white",
                            marginBottom: 5,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "mon-sb",
                            color: selectPlace === index ? "black" : "gray",
                          }}
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </Animated.View>
            )}
          </View>
          {/* when */}
          <View style={styles.card}>
            {openCard !== 1 && (
              <AnimatedTouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => setOpenCard(1)}
                entering={FadeIn.delay(200)}
                exiting={FadeOut.delay(200)}
              >
                <Text
                  style={{ fontSize: 13, fontFamily: "mon-sb", color: "gray" }}
                >
                  When
                </Text>
                <Text
                  style={{ fontSize: 13, fontFamily: "mon-sb", color: "black" }}
                >
                  Any week
                </Text>
              </AnimatedTouchableOpacity>
            )}
            {openCard == 1 && (
              <Animated.View entering={FadeIn}>
                <Text style={styles.titleCard}>When's your trip?</Text>
                <DatePicker
                  current={selectedDate}
                  selected={selectedDate}
                  mode="calendar"
                  onSelectedChange={(date: any) => setSelectedDate(date)}
                  options={{
                    mainColor: Colors.primary,
                  }}
                  style={{ width: "100%" }}
                />
              </Animated.View>
            )}
          </View>
          {/* who */}
          <View style={styles.card}>
            {openCard != 2 && (
              <AnimatedTouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => setOpenCard(2)}
                entering={FadeIn.delay(200)}
                exiting={FadeOut.delay(200)}
              >
                <Text
                  style={{ fontSize: 13, fontFamily: "mon-sb", color: "gray" }}
                >
                  Who
                </Text>
                <Text
                  style={{ fontSize: 13, fontFamily: "mon-sb", color: "black" }}
                >
                  Add guests
                </Text>
              </AnimatedTouchableOpacity>
            )}
            {openCard == 2 && (
              <Animated.View entering={FadeIn}>
                <Text style={styles.titleCard}>Who's Coming?</Text>
                {groups.map((group, index) => (
                  <View
                    key={index}
                    style={[
                      styles.group,
                      {
                        marginBottom: index == groups.length - 1 ? 0 : 5,
                        paddingBottom: index == groups.length - 1 ? 0 : 5,
                        borderBottomColor: "#ebebeb",
                        borderBottomWidth: index == groups.length - 1 ? 0 : 1,
                      },
                    ]}
                  >
                    <View>
                      <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                        {group.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "mon",
                          color: "gray",
                        }}
                      >
                        {group.text}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6 }}>
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups];
                          newGroups[index].count =
                            newGroups[index].count == 0
                              ? 0
                              : newGroups[index].count - 1;
                          setGroups(newGroups);
                        }}
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={20}
                          color={group.count > 0 ? "black" : "gray"}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "mon-sb",
                          minWidth: 10,
                          textAlign: "center",
                        }}
                      >
                        {group.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newGroups = [...groups];
                          newGroups[index].count = newGroups[index].count + 1;
                          setGroups(newGroups);
                        }}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={20}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </Animated.View>
            )}
          </View>
        </View>

        {/* footer */}
        <Animated.View
          style={defaultStyles.footer}
          entering={SlideInDown.delay(200)}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "mon-sb",
              color: "black",
              textDecorationLine: "underline",
            }}
          >
            Clear All
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              defaultStyles.btn,
              {
                paddingHorizontal: 14,
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              },
            ]}
          >
            <Ionicons name="search-outline" size={20} color="white" />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    marginBottom: 10,
  },
  titleCard: {
    fontSize: 18,
    fontFamily: "mon-sb",
    color: "black",
    marginBottom: 20,
  },
  SearchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c9c9c9",
    borderWidth: 1,
    width: "100%",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
});
