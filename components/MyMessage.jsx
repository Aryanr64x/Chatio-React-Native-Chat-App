import { Text, View } from "react-native";

const MyMessage = ({message})=>{
    return (
        <View className = "pb-2 flex-row justify-end">
            <Text className="bg-red-500 text-lg text-white px-2 py-2 mr-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                { message.text }
            </Text>
        </View>
    );
}

export default MyMessage;