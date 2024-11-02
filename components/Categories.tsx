import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { Colors } from "@/constants/Colors";
  import newsCategoryList from "@/constants/Categories";
  
  type Props = {
    onCategoryChanged: (category: string) => void
  };
  
  const Categories = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleSelectedCategory = (index: number) => {
      const selected = itemRef.current[index];
      setActiveIndex(index);
  
      selected?.measureLayout(scrollRef.current as any, (x) => {
        scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
      }, () => {
        console.log("Failed to measure layout");
      });

      onCategoryChanged(newsCategoryList[index].slug);
    };
  
    return (
      <View>
        <Text style={styles.title}>Trending Right Now</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemWrapper}
        >
          {newsCategoryList.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemRef.current[index] = el)}
              key={index}
              style={[styles.item, activeIndex === index && styles.itemActive]}
              onPress={() => handleSelectedCategory(index)}
            >
              <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  export default Categories;
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: Colors.black,
      marginBottom: 10,
      marginLeft: 20,
    },
    itemWrapper: {
      gap: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    itemActive: {
      backgroundColor: Colors.red,
      borderColor: Colors.red,
    },
    item: {
      borderWidth: 1,
      borderColor: Colors.darkGrey,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    itemText: {
      fontSize: 14,
      color: Colors.darkGrey,
      letterSpacing: 0.5,
    },
    itemTextActive: {
      fontWeight: "600",
      color: Colors.white,
    },
  });
  