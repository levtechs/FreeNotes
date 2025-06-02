import { useEffect, useState } from "react";

import NoteRow from "./NoteRow"
import NewNoteButton from "./NewNoteButton";

const NoteRows = (refreshKey: number, setNumNoteRows: (numNoteRows: number) => void, setIsEditing: (value: [boolean, string]) => void) => {

    interface Note {
        id: string;
        name: string;
        content: string;
        "last-edited": string;
    }

    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        const FetchNotes = async () => {
            const response = await fetch("/api", { method: "GET"});
            //console.log(response);
            const data: Note[] = await response.json();
            setNotes(data);
            setNumNoteRows(data.length);
        };
        FetchNotes();
    }, [refreshKey])

    return (
        <div style={{margin: "0 auto", width: "100%", height: "80%", display: "flex", flexDirection: "column", gap: "2%", overflowY: "auto"}}>
            {notes.map(note => NoteRow(note.id, note.name, note.content, new Date(note["last-edited"]), setIsEditing))}
        </div>
    )
}

export default NoteRows;