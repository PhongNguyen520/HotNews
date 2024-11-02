import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

type Props = {
  sliderItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ sliderItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]} key={sliderItem.article_id}>
      <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.background}
      >
        <View style={styles.sourceInfo}>
          {sliderItem.source_icon && (
            <Image
              source={{ uri: sliderItem.source_icon }}
              style={styles.sourceIcon}
            />
          )}
          <Text style={styles.sourceName}>{sliderItem.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {sliderItem.title}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    width: width * 0.999,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    width: width - 60,
    height: 200,
    borderRadius: 20,
    padding: 20,
  },
  sourceIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "stretch",
  },
  sourceInfo: {
    position: "absolute",
    flexDirection: "row",
    gap: 10,
    top: "68%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  sourceName: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "500",
  },
  title: {
    color: Colors.white,
    fontSize: 13,
    position: "absolute",
    top: "90%",
    paddingHorizontal: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
});
