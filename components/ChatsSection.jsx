import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
const ChatsSection = ({ chats, setChats, navigation }) => {
    const auth = useContext(authContext)
    useEffect(() => {
        getChats()
    }, [])

    const getChats = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/chat/', { headers: { "Authorization": `Bearer ${auth.tokens.access}` } })
            console.log(resp.data)
            setChats(resp.data)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View>
            {
                chats.map((chat) => {
                    return <TouchableOpacity onPress={()=>{
                        navigation.navigate("chat", chat)
                    }}>
                        <View className="flex-row py-2 px-2 items-center bg-white shadow-xl mb-2">
                            <Image className="h-12 w-12 rounded-full mr-4" source={{
                                uri: 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg'
                            }} />
                            <Text className="text-lg">
                                {
                                    // Get the name apart from auth user name
                                    chat.members[1].username
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                })
            }
        </View>
    );
}
export default ChatsSection;