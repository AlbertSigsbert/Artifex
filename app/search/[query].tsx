import { useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";

// others
import useAppwrite from "@/lib/useAppwrite";
import { searchPosts } from "@/lib/appwrite";
import { Video } from "@/types";
import { useAppContext } from "@/context/GlobalProvider";

const Search = () => {

  const { query } = useLocalSearchParams();
  const searchQuery = useMemo(() => (Array.isArray(query) ? query.join(" ") : query || ""), [query]);

  // Use the useAppwrite hook
  const { data: videos, isLoading, refetch } = useAppwrite<Video[]>(() => searchPosts(searchQuery));
  const { user } = useAppContext();

  return (

      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => user ? <VideoCard video={item} user={user} /> : null}
          ListHeaderComponent={() => (
            <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
              <Text className="font-psemibold text-2xl text-white">{query}</Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={searchQuery} />
              </View>
            </View>
          )}
  
          ListEmptyComponent={() => {
            return (
              <EmptyState
                title="No Videos Found"
                subtitle="No videos found for this search query"
                  btnTitle="Create Video"
              />
            );
          }}
        />
      </SafeAreaView>
  );
};

export default Search;
