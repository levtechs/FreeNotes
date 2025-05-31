import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const filePath = path.join(process.cwd(), 'app/data', 'notes.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const notes = JSON.parse(fileData); // ✅ parse string into object

    notes.unshift({
        id: String(notes.length + 1),
        name: "new note",
        content: "added from API",
        "last-edited": new Date().toISOString()
    });

    await fs.writeFile(filePath, JSON.stringify(notes, null, 2));

    return NextResponse.json(JSON.parse("success"))
}