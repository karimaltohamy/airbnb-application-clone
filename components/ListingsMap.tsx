import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";

interface Props {
  listings: any;
}
const INITIAL_REGION = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const { height } = Dimensions.get("window");

const renderCluster = (cluster: any) => {
  const { id, geometry, onPress, properties } = cluster;
  const points = properties.point_count;

  return (
    <Marker
      key={id}
      style={styles.mark}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      onPress={onPress}
      onCalloutPress={onPress}
    >
      <Text
        style={{
          color: "#000",
          textAlign: "center",
          fontFamily: "mon-sb",
        }}
      >
        {points}
      </Text>
    </Marker>
  );
};

const ListingsMap: React.FC<Props> = ({ listings }) => {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const selectListing = (listing: any) => {
    router.push(`/listing/${listing.properties.id}`);
  };

  return (
    <View style={[defaultStyles.container]}>
      <MapView
        ref={mapRef}
        animationEnabled={false}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((listing: any) => (
          <Marker
            style={styles.mark}
            key={listing.properties.id}
            coordinate={{
              latitude: +listing.properties.latitude,
              longitude: +listing.properties.longitude,
            }}
            title={listing.name}
            onPress={() => selectListing(listing)}
          >
            <Text style={styles.markText}>€ {listing.properties.price}</Text>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
  },
  mark: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
  },
  markText: {
    fontSize: 15,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ListingsMap;
