// import {createContext, useContext, useMemo } from "react";
// import io from "socket.io-client"
// import { API_URL } from "../constants/config";


// const SocketContext = createContext();

// const getSocket= () =>  useContext(SocketContext);

// const SocketProvider = ({children}) => {

// const socket = useMemo(() => 
//     io(API_URL, 
//         {withCredentials: true}),
//         []
//     );


//     return(
//         <SocketContext.Provider value={socket}>
//             {children}
//         </SocketContext.Provider>
//     )
// }

// export{SocketProvider, getSocket}



import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => 
        io(API_URL, {
            withCredentials: true,
            transports: ["websocket", "polling"], // ✅ Ensures WebSockets work on Vercel
        }), 
        [] // ✅ Ensures socket instance is created only once
    );

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, getSocket };

