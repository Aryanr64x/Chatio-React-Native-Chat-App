import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import SingleUserItem from "./SingleUserItem.jsx";

const UsersSection = ({ chats, navigation }) => {
    const auth = useContext(authContext)
    const [users, setUsers] = useState([])
    const [fetchingUsers, setFetchingUsers] = useState(true)
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/user', { headers: { "Authorization": `Bearer ${auth.tokens}` } })
            setFetchingUsers(false)
            setUsers(resp.data)
        } catch (e) {
            // error
            console.log(e)
        }
    }


    return (
        <View>

            {
                (fetchingUsers) ? (
                    <View>
                        <ActivityIndicator animating={true} color={MD2Colors.red800} className="mt-8" />
                    </View>
                ) : (<FlatList
                    className=""
                    data={users}
                    renderItem={
                        ({ item }) => {

                            return (
                                <SingleUserItem user={item} chats={chats} navigation={navigation} />
                            )
                        }
                    }
                    keyExtractor={item => item.id}
                />)
            }
        </View>
    );
}
export default UsersSection;