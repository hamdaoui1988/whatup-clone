import React, {useState, useEffect} from "react"
import './chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined } from "@material-ui/icons"
import { AttachFile } from "@material-ui/icons"
import { MoreVert } from "@material-ui/icons"
import { InsertEmoticon } from "@material-ui/icons"
import MicIcon from "@material-ui/icons/Mic"
import { useParams } from "react-router-dom"
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"


function Chat() {


    const[input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName , setRoomName] = useState("");
    const [messages , setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue([]);


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                 
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
                    
                    )
             
        }

    }, [roomId]);


    const sendMessage = (e) => {
       e.preventDefault();
       db.collection('rooms').doc(roomId).collection('messages').add({
           message: input,
           name: user.displayName,
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
       })
       setInput("");
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__header__info">
                   <h3>{roomName}</h3>
                   <p>Last seen{" "}
                   {new Date(
                     messages[messages.length - 1]?.
                     timestamp?.toDate()
                   ).toUTCString()  
                   }
                   
                   </p>
               </div>
               <div className="chat__headerright">
                 <IconButton>
                    <SearchOutlined />
                 </IconButton>

                 <IconButton>
                    <AttachFile />
                 </IconButton>

                 <IconButton>
                     <MoreVert />
                 </IconButton>
               </div>

               
            </div>
            <div className="chat_body">
                {messages.map((message) => (

               
                <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
                </p>
                ))}   
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" />
                    <button type="submit" onClick={sendMessage}>Send a Message</button>
                </form>
                <MicIcon />

            </div>

        </div>
    )
}

export default Chat
