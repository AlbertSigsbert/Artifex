import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useAppContext } from "@/context/GlobalProvider";

export interface Media {
  uri: string;
  mimeType: string;
  name: string;
  size: number;
}

export interface FormState {
  title: string;
  video: Media | null;
  thumbnail: Media | null;
  prompt: string;
  userId?:string;
}

const Create = () => {
  const {user} = useAppContext();
  const [form, setForm] = useState<FormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectType: "video" | "image") => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images:ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
  

    if (!result.canceled) {
      const pickedFile = result.assets[0];

      const mediaFile: Media = {
        uri: pickedFile.uri,
        mimeType: pickedFile.mimeType || "",
        name: pickedFile.fileName || "",
        size: pickedFile.fileSize || 0,
      };

      if (selectType === "image") {
        setForm({ ...form, thumbnail: mediaFile });
      }
      if (selectType === "video") {
        setForm({ ...form, video: mediaFile });
      }
    }
  };

  const submit = async () => {
    if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
      return Alert.alert("Please fill in all the fields");
    }


    setUploading(true);

    
    await createVideo({ ...form, userId:user?.$id })


    try {
      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", String(error));
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title ..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              ></Video>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />

                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
