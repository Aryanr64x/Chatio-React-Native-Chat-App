import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
import SingleUserItem from "./SingleUserItem.jsx";

const UsersSection = ({ chats, navigation }) => {
    const auth = useContext(authContext)
    const [profiles, setProfiles] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/', { headers: { "Authorization": `Bearer ${auth.tokens.access}` } })
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
            <FlatList
                className=""
                data={profiles}
                renderItem={({ item }) => {

                    return (
                        <SingleUserItem profile={item} chats={chats} navigation={navigation} />
                    )
                }}
                keyExtractor={item => item.user.id}
            />
           
        </View>
    );
}
export default UsersSection;