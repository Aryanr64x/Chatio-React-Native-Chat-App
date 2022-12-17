import { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import ChatsSection from "../components/ChatsSection";
import UsersSection from "../components/UsersSection";
import { authContext } from "../contexts/AuthContextWrapper";
import { Text, Menu, Divider, Provider } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { Dialog, Portal, Paragraph, ActivityIndicator, MD2Colors} from 'react-native-paper'
const popAction = StackActions.pop(1);

const HomeScreen = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const [chats, setChats] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const auth = useContext(authContext)

    const signOut = async () => {
        setShowDialog(true)
        const isSuccess = await auth.logout();
        if (isSuccess) {

            auth.setTokens(null)
            auth.setUser(null)
            navigation.replace('welcome');


        } else {
            ToastAndroid.LONG("Cannot log you out at the moment , Please try again later");
        }

        setShowDialog(false)

    }
auth

    return (
        <Provider>
            <View>
                <View className="h-24 bg-red-600 flex-row items-center px-6 pt-8">
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Menu
                            visible={showMenu}
                            onDismiss={() => { setShowMenu(false) }}
                            anchor={<TouchableOpacity onPress={() => { setShowMenu(true) }}>
                                <Image className="h-12 w-12 rounded-full mr-4" source={{
                                    uri: (auth.user == null || auth.user.dp == null || auth.user.dp == '') ? ('https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg') : (BASE_URL + '/' + auth.user.dp)
                                }}
                                    resizeMode="stretch" />
                            </TouchableOpacity>} >
                            <Menu.Item onPress={() => { navigation.navigate("Update Profile") }} title="Update Profile" />
                            <Divider />

                            <Menu.Item onPress={signOut} title="Sign Out" />
                            <Divider />

                        </Menu>
                    </View>

                    <Text className="text-white text-2xl">
                        {(auth.user) ? auth.user.username : ''}
                    </Text>
                    <View className="h-full">

                    </View>
                </View>
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

            <Portal>
            <Dialog visible={showDialog} onDismiss={()=>{setDialog(false)}}>
            
            <Dialog.Content className="flex-row">
              <Paragraph className="">  Please wait for some time..</Paragraph>
              <ActivityIndicator animating={true} color={MD2Colors.red800} className="ml-4" /> 
            </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>
    );
}

export default HomeScreen;