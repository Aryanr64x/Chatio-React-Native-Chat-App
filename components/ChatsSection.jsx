import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
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


    const getChatDisplayName = (members)=>{
        const tempMmembers = members.filter((member)=>{
            return member.user.id != auth.user.user_id
        })
        return tempMmembers[0].user.username
    }

    return (
        <View>
            <FlatList
                className=""
                data={chats}
                renderItem={({ item }) => {

                    return <TouchableOpacity onPress={() => {
                        navigation.navigate("chat", item)
                    }}>
                        <View className="flex-row py-2 px-2 items-center bg-white shadow-xl mb-2">
                            <Image className="h-12 w-12 rounded-full mr-4" source={{
                                uri: 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg'
                            }} />
                            <Text className="text-lg">
                                {
                                    getChatDisplayName(item.members)
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                }}
                keyExtractor={item => item.id}
            />
        
        </View>
    );
}
export default ChatsSection;