import { useRef, useState } from "react";
import { UseUserContext } from "../hooks/useUserContext";
import { UseProductContext } from "../hooks/useProductContext";
import { UseBackendAPI } from "../backendAPI/useBackendAPI";
import moment from "moment";

export function DiscussionContainer(props) {
  const { getUser } = UseUserContext();
  const user = getUser();

  const message = useRef();
  const productID = props.productID;
  const userName = props.userName;
  const userID = props.userID;
  const sender = props.sender;

  const { sendMessage } = UseBackendAPI();
  const { dispatch } = UseProductContext();

  // Create a new state variable to track the messages in the discussion
  const [messages, setMessages] = useState(
    props.discussionArray.filter((dat) => dat.chatWithName === userName)
  );

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const data = await sendMessage({
      productID,
      message: message.current.value,
      chatWithName: userName,
      chatWith: userID,
      sender: sender,
    });

    if (data) {
      // Update the messages state variable with the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          chatWithName: userName,
          chatWith: userID,
          sender: sender,
          message: message.current.value,
          time: new Date(),
        },
      ]);

      message.current.value = "";
      dispatch({ type: "UpdateProduct", payload: data });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="review">
        <div>
          <h6 className="review-name">{user.userName}</h6>
          <br />
          {messages
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((diss) => (
              <div key={diss.time}>
                <div style={{ clear: "both" }}>
                  <p
                    className="review-name"
                    style={{
                      float: diss.sender === "seller" ? "left" : "right",
                      color: diss.sender === "seller" ? "brown" : "green",
                      fontWeight: 400,
                    }}
                  >
                    {diss.message}
                  </p>
                  <br />
                  <br />
                  <h6
                    style={{
                      fontWeight: 200,
                      float: diss.sender === "seller" ? "left" : "right",
                    }}
                  >
                    {moment(diss.time).fromNow()}
                  </h6>
                </div>
              </div>
            ))}

          <div className="review-content">
            <textarea
              className="form-control"
              id="validationCustom01"
              placeholder="Type a message"
              rows={1}
              style={{ float: "left", marginBottom: "10px" }}
              cols={100}
              ref={message}
            />

            <input
              className="btn btn-primary btn-sm btn-block"
              type="button"
              value="Send"
              style={{ padding: 5, width: "100%" }}
              onClick={(e) => sendMessageHandler(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
