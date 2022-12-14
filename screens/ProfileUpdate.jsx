import { Image, Text, View , TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../contexts/AuthContextWrapper";
import LoadingDialog from "../components/LoadingDialog";




const ProfileUpdate = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const auth = useContext(authContext)
    const [dialog, setDialog] = useState(false);



    const sendPhoto = async () => {
        setDialog(true)
        try {

            const resp = await axios.put(BASE_URL + '/api/user', { image: image.base64 }, { headers: { "Authorization": `Bearer ${auth.tokens}` } });
            setDialog(false)
            auth.setUser({...auth.user, dp: resp.data})
            navigation.pop()
        } catch (e) {
            setDialog(false)
            console.log(e)
        }

    }



    const uploadPhoto = async () => {
        console.log("Image has been uploaded")
        await pickImage()
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,

            quality: 1,
        });

       

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    return (<View className="px-2">
        <View className="mt-8">
            <Text className="text-3xl">
                Update Your Profile Here!
            </Text>
        </View>
        <View className="items-center mt-8">
            <Image className="h-32 w-32 rounded-full mr-4" source={{
                uri:  (!image) ? 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-set-image-stock-isolated-object-icon-collection-137161298.jpg' : `data:image/jpeg;base64,${image.base64}`
            }} />
            <TouchableOpacity onPress={uploadPhoto} className="mt-2 px-2 py-2 rounded-3xl bg-red-600"><Text className="text-white">Upload Image</Text></TouchableOpacity>
            <TouchableOpacity onPress={sendPhoto} className="mt-2 px-2 py-2 rounded-3xl bg-red-600"><Text className="text-white">Update Profile</Text></TouchableOpacity>

        </View>
        <LoadingDialog setShowDialog={setDialog} showDialog={dialog} />
    </View>)
}

export default ProfileUpdate;