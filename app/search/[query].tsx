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

const Search = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = useMemo(() => (Array.isArray(query) ? query.join(" ") : query || ""), [query]);

  // Use the useAppwrite hook
  const { data: videos, isLoading, refetch } = useAppwrite<Video[]>(() => searchPosts(searchQuery));

  return (

      <SafeAreaView className="bg-primary h-full">

        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
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
            // if (isLoading) {
            //   return (
            //     <View className="flex-1 items-center justify-center">
            //       <ActivityIndicator size="large" color="#fff" />
            //     </View>
            //   );
            // }

            // Show "No Videos Found" message if not loading and no data
            return (
              <EmptyState
                title="No Videos Found"
                subtitle="No videos found for this search query"
              />
            );
          }}
        />
      </SafeAreaView>
  );
};

export default Search;
