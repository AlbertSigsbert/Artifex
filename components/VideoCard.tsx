import { icons } from "@/constants";
import { Video } from "@/types";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Video as Vidz, ResizeMode, AVPlaybackStatusSuccess } from "expo-av";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

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

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
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
