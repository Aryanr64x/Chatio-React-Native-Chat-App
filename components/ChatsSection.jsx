import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
const ChatsSection = ({ chats, setChats, navigation }) => {
    const auth = useContext(authContext)
    const [fetchingChats, setFetchingChats] = useState(true);

    useEffect(() => {
        getChats()
    }, [])

    const getChats = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/chat', { headers: { "Authorization": `Bearer ${auth.tokens}` } })
            setFetchingChats(false)

            setChats(resp.data)
        } catch (e) {
            console.log(e)
        }
    }


    const getChatDisplayName = (members) => {
        const tempMmembers = members.filter((member) => {
            return member.id != auth.user.id
        })
        return tempMmembers[0].username
    }


    const getDisplayImage = (members) => {
        const tempMmembers = members.filter((member) => {
            return member.id != auth.user.id
        })
        return tempMmembers[0].dp
    }

    return (
        <View>
            {
                (fetchingChats) ? (
                    <View>
                        <ActivityIndicator animating={true} color={MD2Colors.red800} className="mt-8" />
                    </View>
                ) : (
                    (chats.length != 0) ? (<FlatList
                    className=""
                    data={chats}
                    renderItem={({ item }) => {

                        return <TouchableOpacity onPress={() => {
                            navigation.navigate("chat", item)
                        }}>
                            <View className="flex-row py-2 px-2 items-center bg-white shadow-xl mb-2">
                                <Image className="h-12 w-12 rounded-full mr-4" source={{
                                    uri: (getDisplayImage(item.users) == null || getDisplayImage(item.users) == '') ? ('https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg') : BASE_URL + '/' + getDisplayImage(item.users)

                                }} />
                                <Text className="text-lg">
                                    {
                                        getChatDisplayName(item.users)
                                    }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }}
                    keyExtractor={item => item.id}
                />) : (<Text className="mx-auto max-w-3xl mt-8 text-lg  ">You don't have chats with anyone 😔</Text>)
                )
            }

        </View>
    );
}
export default ChatsSection;