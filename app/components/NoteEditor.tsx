import { send } from "process";
import { useState, useEffect } from "react";

interface NoteEditorProps {
    id: string;
    setIsEditing: (value: boolean) => void;
}

const NoteEditor = ({ id, setIsEditing}: NoteEditorProps) => {

    //console.log(id);

    const [noteName, setNoteName] = useState("");
    const [noteContents, setNoteContents] = useState("");

    interface Note {
        id: string;
        name: string;
        content: string;
        "last-edited": string;
    }

    useEffect(() => {
        const FetchNotes = async () => {
            const response = await fetch("/api", { method: "GET"});
            //console.log(response);
            const data: Note[] = await response.json();
            const note = data.find((note) => note.id === id);
            if (note) {
                setNoteName(note.name);
                setNoteContents(note.content);
            }
        };
        FetchNotes();
    }, [id])

    const updateBackend = (newContent: string) => {
        setNoteContents(newContent);
        fetch("/api", { method: "PUT", body: JSON.stringify({id: id, newContent: newContent}), headers: { "Content-Type": "application/json" }});
    }

    return (
        <div style={{backgroundColor: "var(--panel)", width: "60%", minWidth: "400px", height: "100%", borderRadius: "20px", display: "flex", flexDirection: "column"}}>
            <div style={{margin: "3% auto", width: "100%", padding: "0 30px", height: "70px", display: "flex", flexDirection: "row", gap: "4%"}}>
                <h1 style={{fontWeight: 'bold', color: "var(--text-main)", fontSize: '320%', textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "auto"}}>Editing "{noteName}"</h1>
                <button
                    style={{marginLeft: "auto"}}
                    onClick={() => setIsEditing(false)}
                    className="
                        w-[clamp(140px,20%,150px)] h-[75px]
                        bg-[var(--2)] hover:bg-[var(--1)]
                        font-bold text-[25px] text-[var(--text-dark)]
                        rounded-[10px] 
                        transition-colors duration-300"
                    >
                    Done
                </button>
            </div>
                <div style={{ padding: "30px", height: "100%" }}>
                    <textarea
                        value={noteContents}
                        onChange={(e) => updateBackend(e.target.value)}
                        placeholder="Type something..."
                        style={{
                            height: "100%",
                            padding: "10px",
                            paddingTop: "10px", // ensure there's top spacing
                            fontSize: "16px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            width: "100%",
                            boxSizing: "border-box",
                            resize: "none", // optional: prevent resizing
                            lineHeight: "1.5", // keeps line spacing clean
                            fontFamily: "inherit", // match your UI font
                            color: "var(--text-main)" // optional color
                        }}
                    />
                </div>
        </div>
    );
}

export default NoteEditor;