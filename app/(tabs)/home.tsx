import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";

//appwrite
import useAppwrite from "@/lib/useAppwrite";
import { getAllVideos, getLatestVideos } from "@/lib/appwrite";

//constants and types
import { Video } from "@/types";
import { images } from "@/constants";
import VideoCard from "@/components/VideoCard";
import { useAppContext } from "@/context/GlobalProvider";


const Home = () => {
  const { data: videos, refetch } = useAppwrite<Video[]>(getAllVideos);
  const { data: latestVideos, refetch:refetchLatest } = useAppwrite<Video[]>(getLatestVideos);
  
  const { user } = useAppContext();
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetchLatest()

    await refetch();


    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          user ? <VideoCard video={item} user={user} /> : null
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending videos={latestVideos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
            btnTitle="Create Video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
