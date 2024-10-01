import { FormState, Media } from "@/app/(tabs)/create";
import { Creator, Video } from "@/types";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
  ImageGravity,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66e2ac4500188595982f",
  databaseId: "66e2b3e6000e18e67a64",
  usersCollectionId: "66e2b407001e210b20e7",
  videoCollectionId: "66e2b5070022ac3dc96a",
  storageId: "66e2c03d0034cb3c3072",
};

let client;

client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await db.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser as Creator;
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0] as Creator;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideos = async () => {
  try {
    const videos = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return videos.documents as Video[];
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getLatestVideos = async () => {
  try {
    const videos = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return videos.documents as Video[];
  } catch (error) {
    throw new Error(String(error));
  }
};

export const searchPosts = async (query: string) => {
  try {
    const videos = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    return videos.documents as Video[];
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getUserVideos = async (userId: string) => {
  if (!userId) {
    // Return an empty array if the userId is empty
    return [];
  }

  try {
    const videos = await db.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [
        Query.equal("creator", userId),
        Query.orderDesc("$createdAt"),
        Query.limit(7),
      ]
    );

    return videos.documents as Video[];
  } catch (error) {
    throw new Error(String(error));
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getFilePreview = async (
  fileId: string,
  type: "image" | "video"
) => {
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );

  
    } else if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);

    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw new Error();

    return fileUrl;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const uploadFile = async (
  file: Media | null,
  type: "image" | "video"
) => {
  if (!file) return;

  const asset = {
    name: file.name,
    type: file.mimeType,
    size: file.size,
    uri: file.uri,
  };

  const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    asset
  );

  const fileUrl = await getFilePreview(uploadedFile.$id, type);

  return fileUrl;
};

export const createVideo = async (form: FormState) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newVideo = await db.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newVideo;
  } catch (error) {
    throw new Error(String(error));
  }
};
