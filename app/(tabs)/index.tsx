import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "@/types";
import BreakingNew from "@/components/BreakingNew";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";
import newsCategoryList from "@/constants/Categories";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10`;
      const response = await axios.get(URL);
      if (response && response.data) {
        var newsList = response.data.results;
        setBreakingNews(newsList.slice(0, 5));
        setNews(newsList);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log("Failed to fetch breaking news", err.message);
    }
  };

  const fetchDataCateChanged = async (category: string) => {
    var URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10`;
    try {
      if (category !== "") {
        URL += `&category=${category}`;
      }
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (err: any) {
      console.log("Failed to fetch news", err.message);
    }
  };

  const onCatChanged = (category: string) => {
    fetchDataCateChanged(category);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { paddingTop: safeTop }]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Header />
          <SearchBar />
        </View>
      </TouchableWithoutFeedback>

      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <BreakingNew newsList={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
