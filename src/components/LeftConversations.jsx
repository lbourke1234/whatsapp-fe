import SingleConversation from './SingleConversation'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setCurrentRoomAction } from '../redux/actions'

const LeftConversations = () => {
  const allChats = useSelector((state) => state.user.chats.list.chat.chats)
  const mainRoom = useSelector((state) => state.user.room)
  const [localRoom, setLocalRoom] = useState()
  const allRooms = useSelector((state) => state.user.allRooms)

  const dispatch = useDispatch()

  const accessToken = localStorage.getItem('token')
  const accessToken2 = accessToken.substring(1, accessToken.length - 1)

  const fetchRooms = async (roomId) => {
    const response = await fetch(`${process.env.REACT_APP_FETCH_ROOM_DATA}${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken2}`
      }
    })
    if (response.ok) {
      const body = await response.json()
      console.log('body in left convo', body)
      setLocalRoom(body)
      dispatch(setCurrentRoomAction(mainRoom))
    } else {
      console.log('fetch broke')
    }
  }

  useEffect(() => {
    if (localRoom) {
      fetchRooms(localRoom._id)
      console.log('local room', localRoom)

      console.log('component did update')
    } else {
      console.log('local room is null')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localRoom])

  useEffect(() => {
    if (mainRoom._id) {
      console.log('component did mount')
      console.log('local room', localRoom)
      console.log('mainroom', mainRoom)
      fetchRooms(mainRoom._id)
    } else {
      console.log('mainroom is undefined')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRoom._id])

  // console.log('ALL CHATS left conversation', allChats)

  return (
    <>
      {allChats.map((chat) => (
        <SingleConversation key={chat._id} chat={localRoom} />
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
