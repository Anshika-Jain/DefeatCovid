import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Clap from "./util/clapButton";
import Card from "react-bootstrap/Card";
import Avatar from "./util/avatar";
export default function BlogCard(props) {
  return (
    <Card
      className="slide-up"
      key={props.id}
      style={{ margin: "30px", textAlign: "left" }}
    >
      <Card.Header style={{ padding: " 6px 0" }}>
        <Avatar
          style={{
            width: "40px",
            height: "40px",
            margin: "0 10px",
            objectFit: "cover",
          }}
          src={`${process.env.REACT_APP_ASSET_URL}/${props.creatorPhoto}`}
        />
        {props.creatorName.toUpperCase()}
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ fontSize: "2rem" }}>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <div style={{ margin: "30px 0 0 0" }} className="display-flex">
          {!props.isSingle && (
            <Link to={`/post/${props.id}`}>
              <Button variant="link">read more</Button>
            </Link>
          )}
          <Clap claps={props.claps} blogId={props.id} />
        </div>
      </Card.Body>
    </Card>
  );
}
