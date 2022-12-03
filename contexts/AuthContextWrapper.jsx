import axios from "axios"
import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import BASE_URL from '../BASE_URL.js'

export const authContext = React.createContext()


const AuthContextWrapper = ({ children }) => {
    const [tokens, setTokens] = useState(null)
    const [user, setUser] = useState(null)




    const signIn = async (username, password) => {
        try {
            const resp = await axios.post(BASE_URL + "/api/token/", {
                username, password
            })
            setTokens(resp.data)
            setUser(jwt_decode(resp.data.access))
            return true
        } catch (e) {
            console.log(e)
            return false
        }

    }


    const signUp = async (username, password) => {
        try {
            const resp = await axios.post(BASE_URL + "/api/users/create/", {
                username, password
            })
            const isSuccess = await signIn(username, password)
            if(isSuccess == true){
                return true
            }else{
                return false;
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }


    value = {
        signIn: signIn,
        user: user,
        signUp: signUp,
        tokens: tokens
    }

    return (
        <authContext.Provider value={value} >
            {children}
        </authContext.Provider>
    )
}

export default AuthContextWrapper;