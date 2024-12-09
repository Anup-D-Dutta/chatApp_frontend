// import {createContext, useContext, useMemo } from "react";
// import io from "socket.io-client"
// import { BACKEND_URL } from "../constants/config";


// const SocketContext = createContext();

// const getSocket= () =>  useContext(SocketContext);

// const SocketProvider = ({children}) => {

// const socket = useMemo(() => 
//     io(BACKEND_URL, 
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



import { createContext, useContext, useMemo, useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "../constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        const socketInstance = io(API_URL, {
            withCredentials: true,
            transports: ['websocket'], // Ensure WebSocket transport is preferred
        });
        return socketInstance;
    }, [API_URL]);

    useEffect(() => {
        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        return () => {
            socket.disconnect(); // Clean up socket connection
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, getSocket };






// import { createContext, useContext, useEffect, useState } from "react";
// import io from "socket.io-client";

// const SocketContext = createContext();

// const getSocket = () => useContext(SocketContext);

// const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io(server, { withCredentials: true });
//     setSocket(newSocket);
    
//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export { SocketProvider,  getSocket};
