import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const RightChat = () => {
  // const userInfo = useSelector((state) => state)
  const allChats = useSelector((state) => state.user.history.history)

  // useEffect(() => {
  //   console.log(allChats)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   console.log(allChats)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [allChats])

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
