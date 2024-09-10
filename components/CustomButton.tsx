import {  TouchableOpacity, Text } from 'react-native'

interface CustomButtonProps {
    title: string;
    handlePress: () => void; 
    containerStyles?:string;
    textStyles?:string;
    isLoading?:boolean
}

const CustomButton = ({title, handlePress, containerStyles, isLoading, textStyles}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}  disabled={isLoading}
          className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50': ''}`}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton