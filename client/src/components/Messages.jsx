import SendMessage from "./SendMessage"
import { useState, useEffect, useRef, useContext } from 'react';
import {socketIO} from "../App"
import {DataContext} from "../Context"


export default function Messages(){
   const {messagesReceived, setMessagesReceived} = useContext(DataContext)

 // const messagesColumnRef = useRef(null); // Add this

 
 useEffect(() => {
  socketIO.on('receive_message', (data) => {
    console.log(data);
    setMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]);
  });

// Remove event listener on component unmount
  return () => socketIO.off('receive_message');
}, [socketIO]);
  





    function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
 console.log("CHatss",messagesReceived)


    return(
        <div className="row-span-2 col-span-4 overflow-auto">
        <div>
        {messagesReceived.map((msg,i)=>(
        <div className="chat chat-start" key={i}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
   {msg.sender_username}
    <span className="text-xs opacity-50 p-2">{formatDateFromTimestamp(msg.date_sent)}</span>
  </div>
  <div className="chat-bubble">{msg.message}</div>
  <div className="chat-footer opacity-50">
    Delivered
  </div>
</div>
))}

{/* <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full mr-4">
      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <span className="text-xs opacity-50 p-2">12:46</span>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">
    Seen at 12:46
  </div>
</div> */}
        </div>
    


        <SendMessage/>

        </div>
        
    )
}