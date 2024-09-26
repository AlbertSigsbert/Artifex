import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";

// others
import useAppwrite from "@/lib/useAppwrite";
import { getUserVideos, signOut } from "@/lib/appwrite";
import { Video } from "@/types";
import { useAppContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";


const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useAppContext();
  const userId = user?.$id || "";

  const { data: videos } = useAppwrite<Video[]>(() => getUserVideos(userId));

  const logout = async () => {
     await signOut();
     setUser(null);
     setIsLoggedIn(false);

     router.replace('/sign-in');
  }

  return (
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={videos}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
               <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
               </TouchableOpacity>

               <View className="w-16 h-16 justify-center items-center border border-secondary rounded-lg">
                  <Image source={{ uri: user?.avatar }} className="h-[90%] w-[90%] rounded-lg" resizeMode="cover"/>
               </View>

               <InfoBox title={user?.username as string} containerStyles="mt-5" titleStyles="text-lg"  />

               <View className="mt-5 flex-row">
                 <InfoBox title={videos?.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl"  />
                 <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl"  />
               </View>
            </View>
          )}
  
          ListEmptyComponent={() => {
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

export default Profile;
