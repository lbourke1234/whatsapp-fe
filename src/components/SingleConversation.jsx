import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatIdAction, setCurrentRoomAction } from "../redux/actions";

const SingleConversation = (chat) => {
  const [localRoom, setLocalRoom] = useState();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("token");
  const accessToken2 = accessToken.substring(1, accessToken.length - 1);
  /* const roomId = useSelector((state) => state.user.room[0].room); */

  const fetchRoomData = async () => {
    const response = await fetch(
      process.env.REACT_APP_FETCH_ROOM_DATA /* + roomId */,
      {
        headers: {
          Authorization: `Bearer ${accessToken2}`,
        },
      }
    );
    if (response.ok) {
      const body = await response.json();
      console.log("ROOM DATA:", body);
      setLocalRoom(body);
      dispatch(setCurrentRoomAction(body));
    } else {
      console.log("fetch broke");
    }
  };

  return (
    <div onClick={(() => dispatch(setCurrentRoomAction(chat)), fetchRoomData)}>
      <Col md={2} className="d-flex justify-content-center align-items-center">
        {/* <img className="profile-image" src={chat.chatcontent.media} alt="kitten"></img> */}
      </Col>
      <Col md={10}>
        <Row>
          <Col md={10}>
            <span className="conversation-name">{chat.chat._id}</span>
          </Col>
          <Col md={2}>
            {/* <span className="day">{chat.createdAt}</span> */}
          </Col>
        </Row>
        <Row>
          {/* <span className="pl-3 chat-preview">{chat.content.text}</span> */}
        </Row>
        <hr></hr>
      </Col>
      hello
    </div>
  );
};
export default SingleConversation;
