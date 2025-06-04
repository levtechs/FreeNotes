"use client"
import { useState, useCallback} from "react";

import NewNoteButton from "./components/NewNoteButton";
import NoteRows from "./components/NoteRows";
import NoteEditor from "./components/NoteEditor";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [numNoteRows, setNumNoteRows] = useState(0);

  //const [isEditing, setIsEditing] = useState<[boolean, string]>([false, "0"]);
  const [isEditing, setIsEditing] = useState(false);

  // called when a new note is added in NewNoteButton
  function handleNewNote() {
    setRefreshKey((prev) => prev + 1);
  }

  const [currentID, setCurrentID] = useState("");

  const UpdateID = (newID: string) => {
    setCurrentID(newID);
  };

  const NoteSelector = () => {
    return (
      <>
        <div style={{
          backgroundColor: "var(--panel)", width: "100%", height: "80px", borderRadius: '20px', 
          display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <h1 style={{fontWeight: 'bold', color: "var(--text-main)", fontSize: '320%', textAlign: 'center', whiteSpace: "nowrap"}}>Recent Notes</h1>
        </div>
        <div style={{backgroundColor: "var(--panel)", width: "100%", height: "90%", minHeight: "40px", borderRadius: '20px'}}>
          <div style={{margin: "3% auto", width: "94%", height: "100%", display: "flex", flexDirection: "column", gap: "4%"}}>
            <NewNoteButton onNewNote={handleNewNote} />
            <NoteRows refreshKey = {refreshKey} setNumNoteRows={setNumNoteRows} setIsEditing={setIsEditing} UpdateID={UpdateID}/>
          </div>
        </div>
      </>
    );
  }

  if (isEditing){
    return (
      <div style={{display: "flex", flexDirection: "row", margin: "10vh auto", height: "80vh", gap: "5%", padding: "0 5%"}}>
        <div style={{width: "50%", minWidth: "500px", height: "100%", display: "flex", flexDirection: "column", gap: '5%'}}>
          <NoteSelector />
        </div>
          <NoteEditor id={currentID} setIsEditing={(value: boolean) => {setIsEditing(value); setRefreshKey((prev) => prev + 1);}} />
      </div>

    );
  }
  else {
    return (
      <div style={{width: "50%", minWidth: "500px", height: "80vh", margin: "10vh auto", display: "flex", flexDirection: "column", gap: '5%'}}>
        <NoteSelector />
      </div>
    );
  }
}
