import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BASE_URL from "../../BASE_URL";

const SingleChat = ({ item, auth, navigation }) => {
    const [displayedUser, setDisplayedUser] = useState(() => {
        const tempMmembers = members.filter((member) => {
            return member.id != auth.user.id
        })
        return tempMmembers[0]
    });
  

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("chat", item)
        }}>
            <View className="flex-row py-2 px-2 items-center bg-white shadow-xl mb-2">
                <Image className="h-12 w-12 rounded-full mr-4" source={{
                    uri: (displayedUser.dp == null || displayedUser.dp == '') ? ('https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg') : BASE_URL + '/' + displayedUser.dp

                }} />
                <Text className="text-lg">
                    {
                        displayedUser.usernmae
                    }
                </Text>
            </View>
        </TouchableOpacity>
    );

}

export default SingleChat;
