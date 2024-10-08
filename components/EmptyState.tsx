import { images } from "@/constants";
import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  btnTitle:string;
}

const EmptyState = ({ title, subtitle, btnTitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-psemibold text-xl text-center text-white mb-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton title={btnTitle} handlePress={()=> router.push("/create")} containerStyles="w-full my-5"/>
    </View>
  );
};

export default EmptyState;
