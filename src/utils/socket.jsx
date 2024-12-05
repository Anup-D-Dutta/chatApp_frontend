import {createContext, useContext, useMemo } from "react";
import io from "socket.io-client"
import { server } from "../constants/config";


const SocketContext = createContext();

const getSocket= () =>  useContext(SocketContext);

const SocketProvider = ({children}) => {

const socket = useMemo(() => 
    io(server, 
        {withCredentials: true}),
        []
    );


    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export{SocketProvider, getSocket}






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
