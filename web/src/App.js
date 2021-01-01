import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000/");

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("name", (name) => {
      setState({ message: "", name });
    });
    socket.on("user.events", (message) => {
      setState({ message });
    });
  });

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state.name);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    console.log("clicked! " + state.name);
    socket.emit("name", state.name);
  };

  return (
    <div>
      <h1>Hii im a server 👋</h1>
      <form onSubmit={onMessageSubmit}>
        <input
          name="name"
          onChange={(e) => onTextChange(e)}
          value={state.name}
          label="Name"
        ></input>

        <input type="submit" name="submit"></input>
        <h1> Name is :{state.name}</h1>
        <h1> Name is :{state.message}</h1>
      </form>
    </div>
  );
}

export default App;
