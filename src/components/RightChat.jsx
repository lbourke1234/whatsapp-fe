import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'

const RightChat = () => {
  const allChats = useSelector((state) => state.user.history.history)
  console.log('ALL CHATS', allChats)

  return (
    <>
      {allChats ? (
        allChats.map((chat) => <SingleChat key={chat._id} chat={chat} />)
      ) : (
        <div></div>
      )}
    </>
  )
}

export default RightChat
