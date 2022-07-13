import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const RightChat = () => {
  // const allChats = useSelector((state) => state.user.history.history)
  const chatId = useSelector((state) => state.user.chats.chatId)
  console.log('CHATID', chatId)
  const [theMessages, setTheMessages] = useState([])

  const accessToken = localStorage.getItem('token')
  const accessToken2 = accessToken.substring(1, accessToken.length - 1)

  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_HOME_GET_CHAT_INFORMATION, {
      headers: {
        Authorization: `Bearer ${accessToken2}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      console.log('DATA:', data)
      const theMessagesWeWant = data.chats.filter((event) => event.room === chatId)
      setTheMessages(theMessagesWeWant)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  return (
    <>
      {theMessages ? (
        theMessages.map((chat) => <SingleChat key={chat._id} chat={chat} />)
      ) : (
        <div></div>
      )}
      {console.log('the messages', theMessages)}
    </>
  )
}

export default RightChat
