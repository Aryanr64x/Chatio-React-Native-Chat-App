
import { FlatList, View, Text } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import SingleUserItem from "./SingleUserItem.jsx";
import useFetching from "../../hooks/useFetching.js";

const UsersSection = ({ chats, navigation }) => {
    
    const [users, fetchingUsers, setUsers] = useFetching([], 'user')

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