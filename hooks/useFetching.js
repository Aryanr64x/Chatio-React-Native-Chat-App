import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BASE_URL from "../constants/BASE_URL";
import { authContext } from "../contexts/AuthContextWrapper";

export default useFetching = (def, url) => {
    const [data, setData] = useState(def);
    const [fetchingData, setFetchingData] = useState(true)
    const auth = useContext(authContext)

    const getData = async () => {
        try {
            const resp = await axios.get(BASE_URL + '/api/'+url, { headers: { "Authorization": `Bearer ${auth.tokens}` } })
            setFetchingData(false)
            setData(resp.data)
        } catch (e) {
            // error
            console.log(e)
        }
    }

    useEffect(() => {
        getData()
    }, [])




    return [data, fetchingData, setData];
}