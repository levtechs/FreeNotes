import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

interface Note {
    id: string;
    name: string;
    content: string;
    "last-edited": string;
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
        "last-edited": new Date().toISOString()
    });

    await fs.writeFile(path.join(process.cwd(), 'app/data', 'notes.json'), JSON.stringify(notes, null, 2));

    return NextResponse.json(JSON.parse("success"))
}
/*
export async function PUT(request: Request) {
}
*/