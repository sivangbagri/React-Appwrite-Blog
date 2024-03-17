import React from "react";

export default function Button({
  children,
  type = "button",
  bgcolor = "bg-blue-600",
  textColor = "text-white",
  classname = "",
  ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${classname} ${textColor} ${bgcolor}`}>
      {children}
    </button>
  );
}
