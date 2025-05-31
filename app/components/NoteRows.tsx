import { useEffect, useState } from "react";

import NoteRow from "./NoteRow"
import NewNoteButton from "./NewNoteButton";

const NoteRows = ({ refreshKey }: { refreshKey: number }) => {

    interface Note {
        id: string;
        name: string;
        content: string;
        "last-edited": string;
    }

    const [notes, setNotes] = useState<Note[]>([]);
    useEffect(() => {
        const FetchNotes = async () => {
            const response = await fetch("/api/gns");
            //console.log(response);
            const data = await response.json();
            setNotes(data);
        };
        FetchNotes();
    }, [refreshKey])

    return (
        <div style={{margin: "0 auto", width: "100%", height: "80%", display: "flex", flexDirection: "column", gap: "2%", overflowY: "auto"}}>
            {notes.map(note => NoteRow(note.id, note.name, new Date(note["last-edited"])))}
        </div>
    )
}

export default NoteRows;