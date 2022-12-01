import { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ChatsSection from "../components/ChatsSection";
import UsersSection from "../components/UsersSection";
import { authContext } from "../contexts/AuthContextWrapper";

const HomeScreen = ({ navigation }) => {
    const [showUsers, setShowUsers] = useState(false)
    const [chats, setChats] = useState([])
    const auth = useContext(authContext)

    return (
        <View>
            <View className="h-24 bg-red-600 flex-row items-center px-6 pt-8">
                <Image className="h-12 w-12 rounded-full mr-4" source={{
                    uri: 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg'
                }} />
                <Text className="text-2xl text-white">
                    {auth.user.username}
                </Text>
                <View className="h-full">

                </View>
            </View>
            <View className="flex-row bg-red-500 justify-evenly py-2">
                <View>
                    <TouchableOpacity onPress={()=>{setShowUsers(false)}}>
                        <Text className="text-white text-lg">
                            Chats
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{setShowUsers(true)}}>
                        <Text className="text-white text-lg">
                            Users
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {
                    (showUsers) ? (<UsersSection chats = {chats} navigation={navigation} />) : (<ChatsSection setChats={setChats} chats = {chats} navigation={navigation} />)
                }
            </View>
        </View>
    );
}

export default HomeScreen;