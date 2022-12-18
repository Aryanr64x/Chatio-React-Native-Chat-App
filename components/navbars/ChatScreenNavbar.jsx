import { Image, Text, View } from "react-native";
import BASE_URL from "../../constants/BASE_URL";

const ChatScreenNavbar = ({ username, dp }) => {
    return (
        <View className="h-24 bg-red-600 flex-row items-center px-6 pt-8">
            <Image className="h-12 w-12 rounded-full mr-4" source={{
                uri: BASE_URL+ '/' + dp
            }} />
            <Text className="text-2xl text-white">
                {username}
            </Text>
            <View className="h-full">

            </View>
        </View>
    );
}

export default ChatScreenNavbar;