import { icons } from '@/constants';
import { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FormFieldProps {
    title:string;
    value: string;
    handleChangeText:(text: string) => void;
    otherStyles:string;
    placeholder?:string;
    keyboardType?:string;
}

const FormField = ({title, value, handleChangeText, placeholder, otherStyles, ...props}:FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 flex-row items-center bg-black-100 rounded-2xl focus:border-secondary'>
        <TextInput 
          className='flex-1 text-white font-psemibold text-base'
          value={value} 
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText }
          secureTextEntry={title === 'Password' && !showPassword}
          />
          {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
               <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
            </TouchableOpacity>
          )}
      </View>
    </View>
  )
}

export default FormField