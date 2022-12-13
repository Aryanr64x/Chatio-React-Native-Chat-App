import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import BASE_URL, { SOCKET_BASE_URL } from "../BASE_URL";
import { authContext } from "../contexts/AuthContextWrapper";
import { Dimensions } from 'react-native';
import MyMessage from "../components/MyMessage";
import OtherMessage from "../components/OtherMessage";

import Ionicons from '@expo/vector-icons/Ionicons';


const ChatScreen = ({ route }) => {
    const auth = useContext(authContext)
    const chatroom = route.params
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState([])
    const text = useRef('')

    const titleText = () => {

        let others = [];

        others = chatroom.members.filter((member) => {

            return member.user.id != auth.user.user_id
        })

        return others[0].user.username
    }


    useEffect(() => {
        socket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            console.log("I HAVE RECIEVD A MESSAGE ")

            setMessages((m) => {
                return [...m, data.message]
            })
        };

        socket.onclose = function (e) {
            console.log('Chat socket closed unexpectedly');
        };

    }, [socket])


    useEffect(() => {
        getMessages()
        setSocket(new WebSocket(
            SOCKET_BASE_URL
            + '/ws/chat/'
            + chatroom.id.toString()
            + '/'
        ));
        return () => {
            // socket.close()
        }


    }, [])


    const getMessages = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/chat/message/' + chatroom.id, { headers: { "Authorization": `Bearer ${auth.tokens.access}` } })

            setMessages(resp.data)
        } catch (e) {
            console.log(e)
        }
    }

    const sendMessage = async () => {
        socket.send(JSON.stringify({
            'message': { id: 100, text: text.current, user: { id: auth.user.user_id } }
        }));
        // TODO: if server failed last message has to be removed from the messages list ofc. But we know that face book and messenger care the about it 
        try {
            const resp = await axios.post(BASE_URL + '/api/chat/message/create/', {
                text: text.current,
                chatroom: chatroom,

            }, { headers: { "Authorization": `Bearer ${auth.tokens.access}` } })

        } catch (e) {
            console.log(e)
        }
    }

    const displayAsPerSender = (message) => {
        if (message.profile.user.id == auth.user.user_id) {
            return <MyMessage message={message} />
        }
        return <OtherMessage message={message} />
    }

    return (
        <KeyboardAvoidingView  behavior="height" className=" h-full">

          
                <View className="h-24 bg-red-600 flex-row items-center px-6 pt-8">
                    <Image className="h-12 w-12 rounded-full mr-4" source={{
                        uri: 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg'
                    }} />
                    <Text className="text-2xl text-white">
                        {titleText()}
                    </Text>
                    <View className="h-full">

                    </View>
                </View>
                
                    <View className="grow">
                        <FlatList
                            className=""
                            data={messages}
                            renderItem={({ item }) => {

                                return displayAsPerSender(item)
                            }}
                            keyExtractor={item => item.id}
                        />

                    </View>
                    <View className="flex-row items-center justify-between  mb-4">
                        <TextInput onChangeText={(t) => {
                            text.current = t
                        }} placeholder="Enter you message.." className="px-2 py-2 mx-2 border border-black mt-6 grow" />
                        <TouchableOpacity className="p-3 mt-6 mr-2 rounded-full bg-red-600" onPress={sendMessage}>
                            <Ionicons name='send' size={24} color='white' />
                        </TouchableOpacity>
                    </View>
           
        </KeyboardAvoidingView>
    );
}

export default ChatScreen;