import {
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    ViewToken,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { Colors } from "@/constants/Colors";
  import { NewsDataType } from "@/types";
  import SliderItem from "./SliderItem";
  import Animated, {
      scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue,
  } from "react-native-reanimated";
  import Pagination from "./Pagination";
  
  type Props = {
    newsList: Array<NewsDataType>;
  };
  
  const BreakingNew = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, SetIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);
    const { width } = useWindowDimensions();

    useEffect(() =>{
        if (isAutoPlay){
            interval.current = setInterval(() => {
                offset.value = offset.value + width * 0.999;
            }, 5000);
        }else
            clearInterval(interval.current)

        return () => {
            clearInterval(interval.current);
        }
    }, [isAutoPlay, offset, width])

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });
  
    const onViewableItemsChanged = ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
    }) => {
      if (
        viewableItems[0]?.index !== undefined &&
        viewableItems[0]?.index !== null
      ) {
        setPaginationIndex(viewableItems[0].index % newsList.length);
      }
    };
  
    const viewabilityConfig = {
      itemVisiblePercentThreshold: 50,
    };
  
    const viewabilityConfigCallbackPairs = useRef([
      {
        onViewableItemsChanged: onViewableItemsChanged,
        viewabilityConfig,
      },
    ]);
  
    const onScrollHandler = useAnimatedScrollHandler({
      onScroll: (e) => {
        scrollX.value = e.contentOffset.x;
      },
    });
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Breaking News</Text>
        <View style={styles.slideWrapper}>
          <Animated.FlatList
            ref={ref}
            data={data}
            keyExtractor={(_, index) => `list_item${index}`}
            renderItem={({ item, index }) => (
              <SliderItem sliderItem={item} index={index} scrollX={scrollX} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={onScrollHandler}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.5}
            onEndReached={() => setData(data.concat(newsList))}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            onScrollBeginDrag={() =>{
                SetIsAutoPlay(false);
            }}
            onScrollEndDrag={() =>{
                SetIsAutoPlay(true);
            }}
          />
          <Pagination
            items={newsList}
            scrollX={scrollX}
            paginationIndex={paginationIndex}
          />
        </View>
      </View>
    );
  };
  
  export default BreakingNew;
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: Colors.black,
      marginBottom: 10,
      marginLeft: 20,
    },
    slideWrapper: {
      justifyContent: "center",
    },
  });
  