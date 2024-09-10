import { images } from "@/constants";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full px-4 justify-center items-center">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
                    <Image source={images.cards} className="max-w-[380px] h-[300px] w-full" resizeMode="contain" />
                    <View className="relative mt-5 items-center justify-center">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities with{' '}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] -mt-2 -right-8"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="mt-7 text-sm text-center text-gray-100 font-pregular">
                        Where creativity meets innovation: embark on a journey of limitless exploration with Aora

                    </Text>

                    <CustomButton title="Continue with Email" handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7"/>

                </View>
            </ScrollView>


         <StatusBar backgroundColor="#161622" style="light"/>
        </SafeAreaView>
    )
}

