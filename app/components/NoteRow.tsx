"use client";

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // difference in seconds

  if (diff < 60) return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }
  if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  // If older than a week, just return the date string (e.g., "May 21, 2025")
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

const NoteRow = (id: string, name: string, lastEditied: Date) => {
    const HandleClick = () => {

    }

    return (
        <div key={id} style={{width: "100%", height: "10%", minHeight: "40px", display: "flex"}}>
            <button 
                className ="bg-[#a5c2ac] hover:bg-[#8bb394] rounded-[10px] transition-colors duration-300" 
                style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5%"}}
                onClick={HandleClick}>
                <h1 style={{padding: "20px", fontWeight: "bold", fontSize: "140%"}}>{name}</h1>
                <h1 style={{padding: "20px"}}>{timeAgo(lastEditied)}</h1>
            </button>
        </div>
    )
}

export default NoteRow;