//lib imports
import { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Components
import EmptyState from "@/components/EmptyState";
import SearchSavedVideos from "@/components/SearchSavedVideos";
import VideoCard from "@/components/VideoCard";

//custom fns & types
import { useAppContext } from "@/context/GlobalProvider";
import { getUserSavedVideos, searchUserSavedVideos } from "@/lib/appwrite";
import { Video } from "@/types";

const BookMark = () => {
  const { user } = useAppContext();

  const userId = user?.$id || "";

  const [videos, setVideos] = useState<Video[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  // Fetch saved videos when the component mounts or when the userId changes
  const fetchSavedVideos = async () => {
    try {
      const savedVideos = await getUserSavedVideos(userId);
      setVideos(savedVideos);
    } catch (error) {
      console.error("Error fetching saved videos:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSavedVideos();
    }
  }, [userId]);

  // Handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSavedVideos();
    setRefreshing(false);
  };

  // Handle search functionality
  const handleSearch = async (query: string) => {
    if (!query) {
      // If the query is empty, reset to all saved videos
      await fetchSavedVideos();
      return;
    }

    try {
      const filteredVideos = await searchUserSavedVideos(userId, query);
      setVideos(filteredVideos);
    } catch (error) {
      console.error("Error searching saved videos:", error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) =>
          user ? <VideoCard video={item} user={user} /> : null
        }
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-psemibold text-2xl text-white">
              Saved Videos
            </Text>
            <View className="mt-6 mb-8">
              <SearchSavedVideos onSearch={handleSearch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Saved"
              subtitle="No videos were saved or bookmarked"
              btnTitle="Back to Explore"
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default BookMark;
