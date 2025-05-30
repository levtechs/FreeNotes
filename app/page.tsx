"use client"

import Image from "next/image";

import NewNoteButton from "./components/NewNoteButton";

export default function Home() {
  return (
    <div style={{width: "50%", height: "80vh", margin: "10vh auto", display: "flex", flexDirection: "column", gap: '5%'}}>
      <div style={{backgroundColor: "#e3e3e3", width: "100%", height: "10%", minHeight: "40px", borderRadius: '1vh'}}>
        <h1 style={{fontWeight: 'bold', color: "#2d472e", fontSize: '5vh', textAlign: 'center'}}>
          Recent Notes
        </h1>
      </div>
      <div style={{backgroundColor: "#e3e3e3", width: "100%", height: "80%", minHeight: "40px", borderRadius: '1vh'}}>
        <div style={{margin: "3% auto", display: "flex", width: "94%", height: "100%"}}>
          {NewNoteButton()}
        </div>
      </div>
    </div>
  );
}
