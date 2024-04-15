// // // import React, { useEffect, useState } from "react";

// // // // Text editor all imports
// // // import { EditorState, convertToRaw } from "draft-js";
// // // import { Editor } from "react-draft-wysiwyg";
// // // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // // import draftToHtml from "draftjs-to-html";
// // // import { Button } from "reactstrap";

// // // // Store data from textEditor in object
// // // let obj = [];

// // // // Maping data from obj ;
// // // let data;

// // // export default function Notes() {
// // //   // Note screen Css
// // //   const Note_screen = {
// // //     height: "100%",
// // //     position: "relative",
// // //     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
// // //   };
// // //   // textEditor css
// // //   const textEditor = {
// // //     width: "100%",
// // //     position: "absolute",
// // //     bottom: "0",
// // //   };
// // //   return (

// // //   );
// // // }

// // import React, { useEffect, useState } from "react";

// // // Text editor all imports
// // import { EditorState, convertToRaw } from "draft-js";
// // import { Editor } from "react-draft-wysiwyg";
// // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // import draftToHtml from "draftjs-to-html";
// // import { Button } from "reactstrap";

// // // Store data from textEditor in object
// // let obj = [];

// // // Maping data from obj ;
// // let data;

// // export default function Notes() {
// //   //Editor Hooks;
// //   const [editorState, setEditorState] = useState(() =>
// //     EditorState.createEmpty()
// //   );

// //   //---** Style **---\\
// //   const Container = { height: "100vh" };

// //   const Note_screen = {
// //     height: "100%",
// //     position: "relative",
// //     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
// //   };

// //   const textEditor = {
// //     width: "100%",
// //     position: "absolute",
// //     bottom: "0",
// //   };
// //   useEffect(() => {
// //     data = obj.map((i, index) => {
// //       return <div id={i} dangerouslySetInnerHTML={{ __html: i["latest"] }} />;
// //     });
// //   }, [obj]);
// //   return (
// //     <div className="App m-5" style={{ height: "100vh" }}>
// //       <Editor
// //         editorState={editorState}
// //         onEditorStateChange={setEditorState}
// //         className="border"
// //       />
// //       <Button
// //         onClick={() => {
// //           obj = [
// //             {
// //               latest: draftToHtml(
// //                 convertToRaw(editorState.getCurrentContent())
// //               ),
// //             },
// //           ];
// //         }}
// //       >
// //         Send
// //       </Button>
// //       {data}
// //     </div>
// //   );
// // }

import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
// import React, { useEffect, useState } from "react";

// // Text editor all imports
// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import { Button, Form } from "reactstrap";

// // Store data from textEditor in object
// let obj = [];

// // Maping data from obj ;
// let data;

// export default function Notes() {
//   //Editor Hooks;
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const handleClick = () => {
//     obj = [
//       {
//         latest: draftToHtml(convertToRaw(editorState.getCurrentContent())),
//       },
//     ];
//   };

//   //---** Style **---\\
//   const Container = { height: "100vh" };

//   const Note_screen = {
//     height: "100%",
//     position: "relative",
//     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//   };

//   const textEditor = {
//     width: "100%",
//     position: "absolute",
//     bottom: "0",
//   };
//   useEffect(() => {
//     data = obj.map((i, index) => {
//       return (
//         <div
//           className="m-1 p-1"
//           style={{
//             alignSelf: "end",
//             border: "1px solid black",
//             borderRadius: "30px 30px 0 30px",
//             minWidth: "max-content",
//           }}
//         >
//           {" "}
//           <div id={i} dangerouslySetInnerHTML={{ __html: i["latest"] }}></div>
//         </div>
//       );
//     });
//   }, [obj]);
//   return (
//     <div className="container-none p-5 border" style={Container}>
//       <Form
//         onSubmit={(e) => {
//           handleClick();
//           e.preventDefault();
//         }}
//         className="Note_screen"
//         style={Note_screen}
//       >
//         <div className="w-100 border d-flex flex-column pt-4">
//           <div>{data}</div>
//         </div>

//         <div className=" textEditor" style={textEditor}>
//           {/* text editor */}
//           <div className="w-100">
//             <Editor
//               editorState={editorState}
//               onEditorStateChange={setEditorState}
//               className="border"
//             />
//           </div>
//           <div className=" d-flex justify-content-end">
//             <Button type="submit" onClick={handleClick}>
//               Send
//             </Button>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }
