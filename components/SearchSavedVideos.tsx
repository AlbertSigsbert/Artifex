import { icons } from "@/constants";
import { useState } from "react";
import { View, TextInput, Image, Alert, TouchableOpacity } from "react-native";

const SearchSavedVideos = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handlePress = () => {
    onSearch(query.trim());
  };

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 flex-row items-center space-x-4 bg-black-100 rounded-2xl focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 text-white font-pregular text-base"
        value={query}
        placeholder="Search your saved videos"
        placeholderTextColor="#CDCDE0"
        keyboardType="default"
        onChangeText={setQuery}
      />

      <TouchableOpacity onPress={handlePress}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchSavedVideos;
