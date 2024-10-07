import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { View, TextInput, Image, Alert, TouchableOpacity } from "react-native";

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handlePress = () => {
    if (!query) {
      return Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }

    setQuery("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 flex-row items-center space-x-4 bg-black-100 rounded-2xl focus:border-secondary">
      <TextInput
        ref={inputRef}
        className="mt-0.5 flex-1 text-white font-pregular text-base"
        value={query}
        editable={true}
        placeholder="Search for a video"
        placeholderTextColor="#CDCDE0"
        keyboardType="default"
        autoCorrect={false}
        onChangeText={setQuery}
      />

      <TouchableOpacity onPress={handlePress}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
