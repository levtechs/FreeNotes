"use client";

const NewNoteButton = () => {
  const HandleClick = () => {
  };

  return (
    <button
      onClick={HandleClick}
      className="
        w-[clamp(120px,20%,150px)] h-[10%]
        bg-[#7e947f] hover:bg-[#6b826d]
        font-bold text-[clamp(10px,3vh,25px)] 
        rounded-[10px] 
        transition-colors duration-300
      "
    >
      New Note
    </button>
  );
};

export default NewNoteButton;
