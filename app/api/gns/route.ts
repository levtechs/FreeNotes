import { NextResponse } from 'next/server';

import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const filePath = path.join(process.cwd(), 'app/data', 'notes.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const notes = JSON.parse(fileData); // ✅ parse string into object
    return NextResponse.json(notes);     // ✅ send object to client
}
