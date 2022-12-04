import axios from "axios";
import { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import BASE_URL from "../BASE_URL";
import { authContext } from "../contexts/AuthContextWrapper";

const SingleUserItem = ({ profile, chats, navigation }) => {
    const auth = useContext(authContext)
    // Not group otimised loop ! reasonable
    const openOrCreateChatRoom = async()=>{
        let chatroom = null;
        for(let i = 0;i < chats.length; i ++ ){
            let chatFound = false;
            
            for(let j = 0; j < chats[i].members.length; j++){
                
                if(profile.user.id == chats[i].members[j].user.id){
                    
                    chatroom = chats[i]
                    chatFound = true
                }
            }

            if (chatFound  == true) {
                break;
            }
        }
        

        if(!chatroom){
            chatroom = await createChatroom()           
        }
        navigation.navigate("chat", chatroom)

    }


    const createChatroom = async()=>{
        try{
            const response = await axios.post(BASE_URL+'/api/chat/create/', {user_id: profile.user.id},  { headers: {"Authorization" : `Bearer ${auth.tokens.access}`} });
            console.log(response.data)
            return response.data
        }catch(e){
            console.log(e)
        }
    }

    

    return (
       <TouchableOpacity onPress={openOrCreateChatRoom}>
         <View className="flex-row py-2 px-2 items-center bg-white shadow-xl mb-2">
            <Image className="h-12 w-12 rounded-full mr-4" source={{
                // uri: 'https://f3a8-2405-201-a409-c1dc-4d5-b994-5554-79c4.ngrok.io/media/images/callbg.jpg'
                uri: (profile.dp == null || profile.dp == '') ? ('https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg') : (BASE_URL+profile.dp) 
            }} />
            <Text className="text-lg">
                {profile.user.username}
            </Text>
        </View>
       </TouchableOpacity>
    );
}

export default SingleUserItem;