import { useEffect, useState} from "react";
import React from "react";

import NoteRow from "./NoteRow"

interface NoteRowsProps {
    refreshKey: number, 
    setNumNoteRows: (numNoteRows: number) => void, 
    setIsEditing: (value: boolean) => void
    UpdateID: (value: string) => void
}

const NoteRows = ( { refreshKey, setNumNoteRows, setIsEditing,  UpdateID}: NoteRowsProps) => {

    interface Note {
        id: string;
        name: string;
        content: string;
        lastEdited: string;
    }

    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        const FetchNotes = async () => {
            const cached = localStorage.getItem("notes");
            if (cached && refreshKey === 0) {
                const data = JSON.parse(cached) as Note[];
                setNotes(data);
                setNumNoteRows(data.length);
            } else {
                const response = await fetch("/api", { method: "GET" });
                const data: Note[] = await response.json();
                setNotes(data);
                setNumNoteRows(data.length);
                localStorage.setItem("notes", JSON.stringify(data));
            }
        };
        FetchNotes();
    }, [refreshKey]);

    return (
        <div style={{margin: "0 auto", width: "100%", height: "80%", display: "flex", flexDirection: "column", gap: "2%", overflowY: "auto"}}>
            {notes.map(note => (
                <NoteRow
                    key={note.id}
                    id={note.id}
                    name={note.name}
                    content={note.content}
                    lastEdited={new Date(note.lastEdited)}
                    setIsEditing={setIsEditing}
                    UpdateID={UpdateID}
                />
            ))}        
        </div>
    )
}

export default NoteRows;
