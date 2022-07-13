import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'

const RightChat = () => {
  const allChats = useSelector((state) => state.user.history.history)
  return (
    <>
      {allChats ? (
        allChats.map((chat) => (
          <SingleChat key={chat._id} chat={chat} />
        ))
      ) : (
        <div></div>
      )}
    </>
  )
}

export default RightChat
