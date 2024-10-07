import { icons } from "@/constants";
import { Creator, Video } from "@/types";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Video as Vidz, ResizeMode, AVPlaybackStatusSuccess } from "expo-av";
import { bookmarkVideo, checkIfBookmarked, unbookmarkVideo } from "@/lib/appwrite";
import { router } from "expo-router";

interface VideoCardProps {
  video: Video;
  user: Creator;
}

const VideoCard = ({
  user,
  video: {
    title,
    $id: videoId,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

   // Check if the video is already bookmarked
   useEffect(() => {
    const checkBookmarkStatus = async () => {
      const bookmarked = await checkIfBookmarked(user.$id, videoId);
      setIsBookmarked(bookmarked);
    };

    checkBookmarkStatus();
  }, [user.$id, videoId]);

  const handleMenuPress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //Handle bookmark
  const handleSave = async () => {
    try {
      await bookmarkVideo(user.$id, videoId);
      setIsBookmarked(true);
      Alert.alert("Success", "Video bookmarked successfully");

      router.push("/bookmark");
    } catch (error) {

      if (String(error).includes("already bookmarked")) {
        Alert.alert("Info", "You have already bookmarked this video.");
      } else {
        Alert.alert("Error", String(error));
      }

    } finally {
      setDropdownVisible(false);
    }
  };

    // Handle unbookmark
    const handleUnsave = async () => {
      try {
        await unbookmarkVideo(user.$id, videoId);
        setIsBookmarked(false);
        Alert.alert("Success", "Video unbookmarked successfully");
      } catch (error) {
        Alert.alert("Error", String(error));
      } finally {
        setDropdownVisible(false);
      }
    };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="relative">
          {/* Menu Icon (3 dots) */}
          <TouchableOpacity className="pt-2" onPress={handleMenuPress}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Dropdown */}
          {dropdownVisible && (
            <TouchableOpacity
            onPress={isBookmarked ? handleUnsave : handleSave}
              className="absolute bg-slate-600 top-8 right-0 p-2 w-24 rounded-lg shadow-lg z-50 flex flex-row items-center justify-center"
            >
              <Text className="text-white text-lg mr-2">
                {isBookmarked ? "Unsave" : "Save"}
              </Text>
              <Image
                source={isBookmarked ? icons.unsave : icons.save}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {play ? (
        <Vidz
          source={{ uri: video }}
          //  source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(playbackStatus) => {
            if (playbackStatus.isLoaded) {
              const status = playbackStatus as AVPlaybackStatusSuccess;
              if (status.didJustFinish) {
                setPlay(false);
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
