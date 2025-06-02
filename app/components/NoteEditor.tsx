import { useState, useEffect } from "react";

interface NoteEditorProps {
    id: string;
    setIsEditing: (value: [boolean, string]) => void;
}

const NoteEditor = ({ id, setIsEditing}: NoteEditorProps) => {

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

    return (
        <div style={{backgroundColor: "var(--panel)", width: "60%", minWidth: "400px", height: "100%", borderRadius: "20px"}}>
            <div style={{margin: "3% auto", width: "94%", height: "100%", display: "flex", flexDirection: "row", gap: "4%"}}>
                <h1 style={{fontWeight: 'bold', color: "var(--text-main)", fontSize: '320%', textAlign: 'left', whiteSpace: "nowrap", marginRight: "auto"}}>Editing "{noteName}"</h1>
                <button
                    style={{marginLeft: "auto"}}
                    onClick={() => setIsEditing([false, "0"])}
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
        </div>
    );
}

export default NoteEditor;