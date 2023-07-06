import React from "react";

const EmptyState = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.646 14.354a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L3 12.293l2.646-2.647a.5.5 0 01.708.708L3.707 13l2.647 2.646a.5.5 0 01-.708.708l-2-2zM17 12a5 5 0 11-10 0 5 5 0 0110 0zm-2 0a3 3 0 11-6 0 3 3 0 016 0zm-7-2a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default EmptyState;
