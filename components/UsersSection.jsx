import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import BASE_URL from '../BASE_URL.js'
import { authContext } from "../contexts/AuthContextWrapper";
import SingleUserItem from "./SingleUserItem.jsx";

const UsersSection = ({chats, navigation})=>{
    const auth = useContext(authContext)
    const [users, setUsers] = useState([])
    useEffect(()=>{
        getUsers()
    }, [])

    const getUsers = async()=>{
        try{
            const resp = await axios.get(BASE_URL+'/api/', { headers: {"Authorization" : `Bearer ${auth.tokens.access}`} })
            console.log(resp.data)
            setUsers(resp.data)
        }catch(e){
            // error
            console.log(e)
        }
    }
    

    return (
        <View>
            {
                users.map((user)=>{
                    return (
                        <SingleUserItem user = {user} chats={chats} navigation={navigation} />
                    )
                })
            }
        </View>
    );
}
export default UsersSection;