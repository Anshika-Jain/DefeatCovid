import React from "react";
import Image from "react-bootstrap/Image";

export default function Avatar(props) {
  return <Image style={props.style} src={`${props.src}`} roundedCircle />;
}
