import { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import ChatsSection from "../components/ChatsSection";
import UsersSection from "../components/UsersSection";
import { authContext } from "../contexts/AuthContextWrapper";
import { Text, Menu, Divider, Provider } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const [chats, setChats] = useState([])
    const auth = useContext(authContext)

    console.log(auth.user)
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
                                    uri: (auth.user.dp == null || auth.user.dp == '') ? ('https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg') : (BASE_URL + auth.user.dp)

                                }} resizeMode="stretch" />
                            </TouchableOpacity>}>
                            <Menu.Item onPress={() => { navigation.navigate("Update Profile") }} title="Update Profile" />
                            <Divider />

                            <Menu.Item onPress={() => { }} title="Sign Out" />
                            <Divider />

                        </Menu>
                    </View>

                    <Text className="text-white text-2xl">
                        {auth.user.username}
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
                        (showUsers) ? (<UsersSection chats={chats} navigation={navigation} />) : (<ChatsSection setChats={setChats} chats={chats} navigation={navigation} />)
                    }
                </View>
            </View>
        </Provider>
    );
}

export default HomeScreen;