import SendMessage from "./SendMessage"
import { useState, useEffect, useRef, useContext } from 'react';
import {socketIO} from "../App"
import {DataContext} from "../Context"


export default function Messages(){
   const {messagesReceived, setMessagesReceived, activeUser} = useContext(DataContext)

   const messagesContainerRef = useRef(null);

   useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [messagesReceived]);

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    scrollToBottom();
  }, []);


  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };
 
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
        <div ref={messagesContainerRef} className="row-span-2 col-span-4 overflow-auto">
     <div className="chat-grid">
      {messagesReceived.map((msg, i) => (
        <div
          className={`chat chat-start ${msg.sender_username === activeUser ? 'right' : 'left'}`}
          key={i}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
            </div>
          </div>
          <div className="chat-content">
            <div className="chat-header">
              {msg.sender_username}
              <span className="text-xs opacity-50 p-2">{formatDateFromTimestamp(msg.date_sent)}</span>
            </div>
            <div className="chat-bubble">{msg.message}</div>
            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>
        </div>
      ))}
    </div>


        <SendMessage/>

        </div>
        
    )
}