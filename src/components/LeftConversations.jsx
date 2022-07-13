import SingleConversation from './SingleConversation'
import { useSelector } from 'react-redux'

const LeftConversations = () => {
  const allChats = useSelector((state) => state.user.chats.list.chat.chats)

  // console.log('ALL CHATS left conversation', allChats)

  return (
    <>
      {allChats.map((chat) => (
        <SingleConversation key={chat._id} chat={chat} />
      ))}
      {/* <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation />
      <SingleConversation /> */}
    </>
  )
}

export default LeftConversations
