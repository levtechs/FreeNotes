"use client"
import { useEffect, useState } from "react";

import Image from "next/image";

import NewNoteButton from "./components/NewNoteButton";
import NoteRows from "./components/NoteRows";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  // called when a new note is added in NewNoteButton
  function handleNewNote() {
    setRefreshKey((prev) => prev + 1);
  }
  
  return (
    <div style={{width: "50%", height: "80vh", margin: "10vh auto", display: "flex", flexDirection: "column", gap: '5%'}}>
      <div style={{backgroundColor: "#e3e3e3", width: "100%", height: "10%", minHeight: "40px", borderRadius: '20px'}}>
        <h1 style={{fontWeight: 'bold', color: "#2d472e", fontSize: '5vh', textAlign: 'center'}}>
          Recent Notes
        </h1>
      </div>
      <div style={{backgroundColor: "#e3e3e3", width: "100%", height: "80%", minHeight: "40px", borderRadius: '20px'}}>
        <div style={{margin: "3% auto", width: "94%", height: "100%", display: "flex", flexDirection: "column", gap: "4%"}}>
          <NewNoteButton onNewNote={handleNewNote} />
          <NoteRows refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
