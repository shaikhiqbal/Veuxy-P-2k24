import React, { useEffect, useState } from "react";

// Text editor all imports
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Button } from "reactstrap";

// Store data from textEditor in object
// let obj = [];

// Maping data from obj ;
let data;

export default function Notes() {
  //Editor Hooks;
  const [obj, setObj] = useState([]);
  const [storeData, setStoreData] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  //---** Style **---\\
  const Container = { height: "100vh" };

  const Note_screen = {
    height: "100%",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };

  const textEditor = {
    width: "100%",
    position: "absolute",
    bottom: "0",
  };
  useEffect(() => {
    data = obj.map((i, index) => {
      return (
        <div
          className="m-1 p-1"
          style={{
            alignSelf: "end",
            border: "1px solid black",
            borderRadius: "30px 30px 0 30px",
            minWidth: "max-content",
          }}
        >
          <div id={i} dangerouslySetInnerHTML={{ __html: i["latest"] }}></div>
        </div>
      );
    });
  }, [obj]);
  return (
    <div className="container-none p-5 border" style={Container}>
      <div className="Note_screen" style={Note_screen}>
        <div className="d-flex justify-content-center p-1 bg-primary">
          <h1 style={{ color: "white" }}> NOTE</h1>
        </div>
        <div className="w-100 d-flex flex-column pt-4">
          <div>{data}</div>
        </div>

        <div className=" textEditor" style={textEditor}>
          {/* text editor */}
          <div className="w-100">
            <Editor
              placeholder="write here...."
              editorState={editorState}
              onEditorStateChange={setEditorState}
              className="border"
            />
          </div>
          <div className=" d-flex justify-content-end">
            <Button
              color="primary"
              type="submit"
              onClick={() => {
                setObj([
                  ...{
                    latest: draftToHtml(
                      convertToRaw(editorState.getCurrentContent())
                    ),
                  },
                ]);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
