import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import BASE_URL from '../../BASE_URL.js'
import { authContext } from "../../contexts/AuthContextWrapper";
import useFetching from "../../hooks/useFetching.js";
import SingleChat from "./SinglChat.jsx";



const ChatsSection = ({ chats, setChats, navigation }) => {
    const auth = useContext(authContext)
    const [chats, fetchingChats, setChats] = useFetching([], 'chat');


   

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

                        return <SingleChat item = {item} auth = {auth}  navigation={navigation}/>
                    }}
                    keyExtractor={item => item.id}
                />) : (<Text className="mx-auto max-w-3xl mt-8 text-lg  ">You don't have chats with anyone 😔</Text>)
                )
            }

        </View>
    );
}
export default ChatsSection;