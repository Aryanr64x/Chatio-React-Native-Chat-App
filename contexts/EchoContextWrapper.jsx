import axios from "axios"
import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import BASE_URL from '../constants/BASE_URL.js'
import { Buffer } from "buffer";

import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native'

window.Pusher = Pusher;

export const echoContext = React.createContext()


const EchoContextWrapper = ({ children }) => {

    const [echo, setEcho] = useState(null)


    useEffect(() => {

        setEcho(new Echo({
            broadcaster: 'pusher',
            key: "b37899cff48aca7bf1a6",
            cluster: "ap2",
            forceTLS: true
        }))
}, [])





    value = {
        echo: echo
    }

return (
    <echoContext.Provider value={value} >
        {children}
    </echoContext.Provider>
)
}

export default EchoContextWrapper;