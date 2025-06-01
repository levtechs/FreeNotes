"use client";

import { useState } from "react";


interface NewNoteButtonProps {
  onNewNote: () => void;
}

const NewNoteButton = ({ onNewNote }: NewNoteButtonProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [noteName, setNoteName] = useState("");

    async function HandleClick() {
        await fetch("/api", { method: "POST", body: JSON.stringify({name: noteName}), headers: { "Content-Type": "application/json" }});
        setIsCreating(false);
        onNewNote();
    }

    if (!isCreating) {
        return (
            <button
                onClick={() => setIsCreating(true)}
                className="
                    w-[clamp(120px,20%,150px)] h-[10%]
                    bg-[var(--2)] hover:bg-[var(--1)]
                    font-bold text-[clamp(10px,3vh,25px)] text-[var(--text-dark)]
                    rounded-[10px] 
                    transition-colors duration-300"
            >
            New Note
            </button>
        );
    }
    else {
        return (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="New note name"
                    value={noteName}
                    onChange={(e) => setNoteName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-[10px] border border-gray-400 text-[clamp(10px,3vh,25px)]"
                    style={{ width: "100%" }}
                />
                <button
                    onClick={HandleClick}
                    className="
                        w-[clamp(120px,20%,150px)] h-[10%]
                        bg-[var(--2)] hover:bg-[var(--1)]
                        font-bold text-[clamp(10px,3vh,25px)] text-[var(--text-dark)]
                        rounded-[10px] 
                        transition-colors duration-300"                >
                    Create
                </button>
            </div>
        );
    }

};

export default NewNoteButton;
