import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import newsCategoryList from "@/constants/Categories";
import CountryList from "@/constants/CountryList";
import { Colors } from "@/constants/Colors";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    // <ImageBackground
    // source={require("@/assets/images/discover-news.png")}
    //     style={{ flex: 1 }}
    //     resizeMode="cover"
    // >
      <View style={[styles.container, { paddingTop: safeTop }]}>
        <Text style={styles.cateText}>Categories</Text>
        <View style={styles.optionCate}>
          {newsCategoryList.map((category, index) => (
            <TouchableOpacity key={index} style={styles.optionCa}>
              <Text>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.countryText}>Countries</Text>
        <View style={styles.optionCountry}>
          {CountryList.map((country, index) => (
            <TouchableOpacity key={index} style={styles.optionCo}>
              <Text>{country.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <TouchableOpacity style={styles.discoverBtn}>
            <Text style={styles.discoverText}>Discover</Text>
          </TouchableOpacity>
        </View>
      </View>
    // </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: "column",
  },
  optionCate: {
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
  optionCountry: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    marginBottom: 30,
  },
  cateText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: Colors.tint,
    padding: 10,
    paddingHorizontal: 15,
  },
  countryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: Colors.tint,
    padding: 10,
    paddingHorizontal: 15,
  },
  optionCa: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginVertical: 2,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  optionCo: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginVertical: 2,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  discoverBtn: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
    
  },
  discoverText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.darkGrey,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.red,
  },
});
