/// <reference types="nativewind/types" />

import { ImageSourcePropType } from 'react-native';

declare module "*.png" {
    const value: ImageSourcePropType;
    export default value;
}

declare module "*.jpg" {
    const value: ImageSourcePropType;
    export default value;
}

declare module "*.jpeg" {
    const value: ImageSourcePropType;
    export default value;
}

declare module "*.svg" {
    const value: ImageSourcePropType;
    export default value;
}


export interface Video {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $updatedAt: string;
    creator: Creator;
    prompt: string;
    thumbnail: string;
    title: string;
    video: string;
  }
  
  export interface Creator {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[]; 
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    username: string;
  }
  