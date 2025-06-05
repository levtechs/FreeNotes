// app/api/notes/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const res = await pool.query("SELECT * FROM notes ORDER BY last_edited DESC");
  return NextResponse.json(res.rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name || "Untitled";
  const content = "empty note";
  const now = new Date(); // UTC time

  const res = await pool.query(
    "INSERT INTO notes (name, content, last_edited) VALUES ($1, $2, $3) RETURNING *",
    [name, content, now]
  );

  return NextResponse.json({ success: true, note: res.rows[0] });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const id = body.id;
  const newContent = body.newContent;
  const now = new Date(); // UTC time

  const res = await pool.query(
    `UPDATE notes 
     SET content = $1, last_edited = $3 
     WHERE id = $2 
     RETURNING *`,
    [newContent, id, now]
  );

  if (res.rowCount === 0) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, note: res.rows[0] });
}

