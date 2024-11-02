import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Loading from "./Loading";
// import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

type Props = {
  newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.length === 0 ? (
        <Loading size={"large"} />
      ) : (
        // <FlatList
        //     data={newsList}
        //     keyExtractor={(item) => item.article_id.toString()}
        //     renderItem={({item}) => (
        //         <View style={styles.itemContainer}>
        //     <Image source={{ uri: item.image_url }} style={styles.itemImg} />
        //     <View style={styles.itemInfo}>
        //       <Text style={styles.itemCategory}>{item.category}</Text>
        //       <Text style={styles.itemTitle} numberOfLines={2}>
        //         {item.title}
        //       </Text>
        //       <View style={styles.sourceInfo}>
        //         <Image
        //           source={{ uri: item.source_icon }}
        //           style={styles.sourceImg}
        //         />
        //         <Text style={styles.sourceName}>{item.source_name}</Text>
        //       </View>
        //     </View>
        //   </View> 
        //     )}
        //     showsVerticalScrollIndicator={false}
        //   />

        newsList.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={{ uri: item.image_url }} style={styles.itemImg} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.sourceInfo}>
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.sourceImg}
                />
                <Text style={styles.sourceName}>{item.source_name}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: "cover",
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.black,
  },
  sourceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sourceImg: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    resizeMode: "contain",
  },
  sourceName: {
    fontSize: 12,
    color: Colors.darkGrey,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
});
