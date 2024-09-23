import { icons } from "@/constants";
import { Video } from "@/types";
import { useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ViewToken,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Video as Vidz, ResizeMode, AVPlaybackStatusSuccess } from "expo-av";

interface TrendingProps {
  videos: Video[];
}

interface TrendingItemProps {
  activeVideo: Video;
  video: Video;
}

const zoomIn = {
  0: { transform: [{ scale: 0.9 }] },
  1: { transform: [{ scale: 1.1 }] },
};

const zoomOut = {
  0: { transform: [{ scale: 1 }] },
  1: { transform: [{ scale: 0.9 }] },
};

const TrendingItem = ({ activeVideo, video }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
 


  // console.log('VIDEO URL',video.video)

  return (
    <Animatable.View
      className="mr-5"
      animation={activeVideo.$id === video.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Vidz
          // source={{ uri: video.video }}
          source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
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
          className="relative justify-center items-center"
        >
          <ImageBackground
            source={{ uri: video.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ videos }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<Video>(videos[0]);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item as Video);
    }
  };

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeVideo={activeItem} video={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
