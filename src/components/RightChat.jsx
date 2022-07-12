import SingleChat from './SingleChat'
import { useEffect } from 'react'

const RightChat = () => {
  const token = window.localStorage.getItem('token')

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMessages = async () => {
    const response = await fetch('http://localhost:5001/messages', {
      headers: {
        Authentication: `Bearer ${token}`
      }
    })
    const body = await response.json()
    console.log(body)
  }

  return (
    <>
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
    </>
  )
}

export default RightChat
