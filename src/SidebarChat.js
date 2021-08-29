import React, { useEffect , useState } from "react"
import './sidebarchat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase'
import { Link } from "react-router-dom"

function SidebarChat({ id, name, addNewChat }) {

const [seed, setSeed] = useState("");
const [messages, setMessages] = useState("");

    useEffect(() => {

    if (id) {
      db.collection('rooms').doc(id).collection('messages')
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
      setMessages(snapshot.docs.map((doc) =>
      doc.data()))
      );
      
    }
    }, [id]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

const createchat = () => {
  const roomName = prompt("Please Enter a name for the Chat");

  if (roomName) {

    db.collection("rooms").add({
      name: roomName
    });
  }

};

    return !addNewChat ? (
      <Link to={`/rooms/${id}`}>
         <div className="sidebarchat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}  />     

            <div className="sidebarchat__info">
           <h2>{name}</h2>  
            <p>{messages[0]?.message}</p>  
            </div>

              </div>


      </Link>
        
    ) : (
<div onClick={createchat} className="sidebarchat">
    <h2>Add new Chat</h2>
</div>
    );
}

export default SidebarChat
