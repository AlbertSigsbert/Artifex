import { icons } from '@/constants';
import { Tabs, Redirect } from 'expo-router';
import { Image, ImageSourcePropType, Text, View } from 'react-native';


type TabBarIconProps = {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

const TabBarIcon = ({ icon, color, name, focused }: TabBarIconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image source={icon} resizeMode='contain' tintColor={color} className='w-6 h-6' />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
    </View>
  )
}

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: '#FFA001', tabBarInactiveTintColor: '#CDCDE0', 
        tabBarStyle: { backgroundColor: '#161622', borderTopWidth: 1, borderTopColor: '#232533', height: 84 } }}>
        <Tabs.Screen name="home" options={{
          title: 'Home', headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={icons.home} color={color} name="Home" focused={focused} />
          )
        }} />
        <Tabs.Screen name="bookmark" options={{
          title: 'Bookmark', headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />
          )
        }} />
        <Tabs.Screen name="create" options={{
          title: 'Create', headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={icons.plus} color={color} name="Create" focused={focused} />
          )
        }} />
        <Tabs.Screen name="profile" options={{
          title: 'Profile', headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
          )
        }} />
      </Tabs>
    </>
  );
}
