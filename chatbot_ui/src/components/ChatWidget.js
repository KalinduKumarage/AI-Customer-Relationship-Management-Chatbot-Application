import Widget from "rasa-webchat";

function ChatWidget() {

  return (
    <div>
      <Widget
        initPayload={"/greet"}
        socketUrl={"http://localhost:5005"}
        socketPath={"/socket.io/"}
        customData={{ language: "en" }}
        title={"CRM Chatbot"}
        showFullScreenButton={true}
        inputTextFieldHint={"Type a message"}
        params={{
          storage: "session",
          images: {
            dims: {
              width: 300,
              height: 200,
            },
          },
        }}
      />
    </div>
  );
}

export default ChatWidget;
