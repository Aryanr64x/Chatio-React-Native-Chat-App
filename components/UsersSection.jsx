import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
import SingleUserItem from "./SingleUserItem.jsx";

const UsersSection = ({ chats, navigation }) => {
    const auth = useContext(authContext)
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/', { headers: { "Authorization": `Bearer ${auth.tokens.access}` } })
            let tempUsers = resp.data
            const fusers = tempUsers.filter((user) => { return user.id != auth.user.user_id })
            setUsers(fusers)
        } catch (e) {
            // error
            console.log(e)
        }
    }


    return (
        <View>
            <FlatList
                className=""
                data={users}
                renderItem={({ item }) => {

                    return (
                        <SingleUserItem user={item} chats={chats} navigation={navigation} />
                    )
                }}
                keyExtractor={item => item.id}
            />
           
        </View>
    );
}
export default UsersSection;