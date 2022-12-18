import { ToastAndroid, TouchableOpacity, View } from "react-native"
import { Divider, Menu } from "react-native-paper"

const HomeScreenNavbar = ({ user, navigation, auth, setShowDialog }) => {
    const [showMenu, setShowMenu] = useState(false)

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
}

export default HomeScreenNavbar;