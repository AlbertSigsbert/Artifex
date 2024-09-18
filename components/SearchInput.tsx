import { icons } from "@/constants";
import { View, Text, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface FormFieldProps {
  value?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  placeholder?: string;
}

const SearchInput = ({
  value,
  handleChangeText,
  placeholder,
}: FormFieldProps) => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 flex-row items-center space-x-4 bg-black-100 rounded-2xl focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 text-white font-pregular text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
