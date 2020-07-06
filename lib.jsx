import React from "react";

export function Icon({ className, onClick }) {
  return <div onClick={onClick} className={'icon fas fa-' + className} style={{ fontSize: 30 }} />
}
