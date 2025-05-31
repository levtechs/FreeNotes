import NoteRow from "./NoteRow"

const NoteRows = () => {
    return (
        <div style={{margin: "0 auto", width: "100%", height: "80%", display: "flex", flexDirection: "column", gap: "2%", overflowY: "auto"}}>
            {NoteRow("1", "note 1", new Date())}
            {NoteRow("2", "note 2", new Date(2025, 4, 30, 20, 5, 0))}
        </div>
    )
}

export default NoteRows;