import SingleConversation from './SingleConversation'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { setCurrentRoomAction } from '../redux/actions'

const LeftConversations = () => {
  const allChats = useSelector((state) => state.user.chats.list.chat.chats)
  const mainRoom = useSelector((state) => state.user.room)
  const [localRoom, setLocalRoom] = useState()

  const dispatch = useDispatch()

  const accessToken = localStorage.getItem('token')
  const accessToken2 = accessToken.substring(1, accessToken.length - 1)

  const fetchRooms = async (roomId) => {
    const response = await fetch(`${process.env.REACT_APP_FETCH_ROOM_DATA}${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken2}`
      }
    })
    const body = await response.json()
    setLocalRoom(body)
    dispatch(setCurrentRoomAction(mainRoom))
  }

  useEffect(() => {
    if (localRoom) {
      fetchRooms(localRoom._id)
      console.log('fetch working')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRoom])

  useEffect(() => {
    if (mainRoom) {
      fetchRooms(mainRoom._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
