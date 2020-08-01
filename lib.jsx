import React from "react";

export function Icon({ className, onClick, style = {} }) {
  return <span onClick={onClick} style={style} className={'icon fas fa-' + className} style={{ fontSize: 50 }} />
}
