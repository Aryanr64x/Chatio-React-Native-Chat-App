import { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import ChatsSection from "../components/ChatsSection";
import UsersSection from "../components/UsersSection";
import { authContext } from "../contexts/AuthContextWrapper";
import { Text, Menu, Divider, Provider } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { Dialog, Portal, Paragraph, ActivityIndicator, MD2Colors} from 'react-native-paper'
import LoadingDialog from "../components/LoadingDialog";
import HomeScreenNavbar from "../components/navbars/HomeScreenNavbar";
const popAction = StackActions.pop(1);

const HomeScreen = ({ navigation }) => {
    
    const [showUsers, setShowUsers] = useState(false)
    const [chats, setChats] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const auth = useContext(authContext)



    return (
        <Provider>
            <View>
              <HomeScreenNavbar user = {auth.user} navigation={navigation} auth={auth} />
                <View className="flex-row bg-red-500 justify-evenly py-2">
                    <View>
                        <TouchableOpacity onPress={() => { setShowUsers(false) }}>
                            <Text className="text-white text-lg">
                                Chats
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => { setShowUsers(true) }}>
                            <Text className="text-white text-lg">
                                Users
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {
                        (auth.user) ? ((showUsers) ? (<UsersSection chats={chats} navigation={navigation} />) : (<ChatsSection setChats={setChats} chats={chats} navigation={navigation} />))
                        : (<Text></Text>)
                    }
                </View>
            </View>

        <LoadingDialog setShowDialog={setShowDialog} showDialog={showDialog} />
        </Provider>
    );
}

export default HomeScreen;