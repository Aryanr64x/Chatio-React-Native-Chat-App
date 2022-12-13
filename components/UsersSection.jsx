import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import SingleUserItem from "./SingleUserItem.jsx";

const UsersSection = ({ chats, navigation }) => {
    const auth = useContext(authContext)
    const [profiles, setProfiles] = useState([])
    const [fetchingUsers, setFetchingUsers] = useState(true)
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/', { headers: { "Authorization": `Bearer ${auth.tokens.access}` } })
            setFetchingUsers(false)
            let tempUsers = resp.data
            const fusers = tempUsers.filter((profile) => { return profile.user.id != auth.user.user_id })
            setProfiles(fusers)
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
                    data={profiles}
                    renderItem={
                        ({ item }) => {

                            return (
                                <SingleUserItem profile={item} chats={chats} navigation={navigation} />
                            )
                        }
                    }
                    keyExtractor={item => item.user.id}
                />)
            }
        </View>
    );
}
export default UsersSection;