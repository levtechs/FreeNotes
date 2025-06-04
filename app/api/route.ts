import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

interface Note {
    id: string;
    name: string;
    content: string;
    lastEdited: string;
}

const RetrieveNotes = async (): Promise<Note[]> => {
    const filePath = path.join(process.cwd(), 'app/data', 'notes.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
}

export async function GET(request: Request) {
    const notes = await RetrieveNotes()
    return NextResponse.json(notes);
}

export async function POST(request: Request) {
    const notes = await RetrieveNotes();

    const body = await request.json();
    const name = body.name || "Untitled";

    notes.unshift({
        id: String(notes.length + 1),
        name: name,
        content: "empty note",
        lastEdited: new Date().toISOString()
    });

    await fs.writeFile(path.join(process.cwd(), 'app/data', 'notes.json'), JSON.stringify(notes, null, 2));

    return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
    const notes = await RetrieveNotes();

    const body = await request.json();
    const id = body.id;
    const newContent = body.newContent;

    // Find the index of the note with the matching ID
    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Remove the note, update its fields
    const [noteToUpdate] = notes.splice(index, 1);
    noteToUpdate.content = newContent;
    noteToUpdate.lastEdited = new Date().toISOString();

    // Move it to the top
    notes.unshift(noteToUpdate);

    // Save updated notes
    await fs.writeFile(
        path.join(process.cwd(), 'app/data', 'notes.json'),
        JSON.stringify(notes, null, 2)
    );

    return NextResponse.json({ success: true });
}
