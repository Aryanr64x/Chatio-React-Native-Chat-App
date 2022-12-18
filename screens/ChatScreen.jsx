import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import BASE_URL, { SOCKET_BASE_URL } from "../constants/BASE_URL";
import { authContext } from "../contexts/AuthContextWrapper";

import MyMessage from "../components/chats/MyMessage";
import OtherMessage from "../components/chats/OtherMessage";

import Ionicons from '@expo/vector-icons/Ionicons';

import { echoContext } from "../contexts/EchoContextWrapper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import ChatScreenNavbar from "../components/navbars/ChatScreenNavbar";
import useFetching from "../hooks/useFetching";

const ChatScreen = ({ route }) => {
    const auth = useContext(authContext)
    const chatroom = route.params
    const [messages, loading, setMessages] = useFetching([], 'message/'+chatroom.id)
    const [displayedUser, setDisplayedUser] = useState(() => {
        let others = [];

        others = chatroom.users.filter((member) => {

            return member.id != auth.user.id
        })

        return others[0];
    })
    
    const echo = useContext(echoContext)
    const text = useRef('')

  


    useEffect(() => {
        echo.echo.channel('chatio' + chatroom.id).subscribed(() => {
            console.log('You are subscribed');
        }).listen('.message.new', (e) => {

            setMessages((messages) => { return [...messages, e] });

        })
       
    }, [])


    const sendMessage = async () => {

        try {
            const resp = await axios.post(BASE_URL + '/api/message/' + chatroom.id, {
                text: text.current,
            }, { headers: { "Authorization": `Bearer ${auth.tokens}` } })

        } catch (e) {
            console.log(e)
        }
    }

    const displayAsPerSender = (message) => {
        if (message.user_id == auth.user.id) {
            return <MyMessage message={message} />
        }
        return <OtherMessage message={message} />
    }




    return (
        <KeyboardAvoidingView behavior="height" className=" h-full">   


            <ChatScreenNavbar username={displayedUser.username} dp={displayedUser.dp} />

            {
                (loading) ? (<View className="grow justify-center items-center"><ActivityIndicator animating={true} color={MD2Colors.red800} className="ml-4" /></View>) :
                    ((messages.length != 0) ? (<View className="grow">
                        <FlatList
                            className=""
                            data={messages}
                            renderItem={({ item }) => {

                                return displayAsPerSender(item)
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>) : (<Text className=" grow text-lg max-w-2xl mx-auto mt-8">No Messages Yet ! Start up a conversation 😉</Text>))
            }
            <View className="flex-row items-center justify-between  mb-4">
                <TextInput onChangeText={(t) => {
                    text.current = t
                }} placeholder="Enter you message....." className="px-2 py-2 mx-2 border border-black mt-6 grow" />
                <TouchableOpacity className="p-3 mt-6 mr-2 rounded-full bg-red-600" onPress={sendMessage}>
                    <Ionicons name='send' size={24} color='white' />
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView >
    );
}

export default ChatScreen;