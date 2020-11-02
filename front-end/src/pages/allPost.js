import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useHttpClient } from "../components/hooks/http-hook";
import ErrorModal from "../components/util/ErrorModal";
import LoadingSpinner from "../components/util/LoadingSpinner";
import BlogCard from "../components/card";

export let arr = [];
export default function AllPost() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/blogs"
        );
        arr = responseData.blogs;
        setPosts(responseData.blogs.reverse());
      } catch (err) {
        console.log(err);
      }
    }
    fetchBlogs();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <Container>
        <Jumbotron
          style={{
            margin: "30px",
            borderRadius: "10px",
            backgroundColor: "rgb(72,195,166)",
          }}
          fluid
        >
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div>
              <h1>
                <strong>Fight The Corona </strong>{" "}
              </h1>

              <h6 style={{}}>We unite to survive the hard times</h6>
            </div>
            <div>
              <img
                style={{ position: "relative" }}
                alt="svg"
                src="https://img.icons8.com/plasticine/64/000000/protection-mask.png"
              />
              <img
                style={{}}
                alt="svg"
                src="https://img.icons8.com/doodle/60/000000/coronavirus.png"
              />
              <img
                style={{}}
                alt="svg"
                src="https://img.icons8.com/doodle/50/000000/coronavirus.png"
              />
              <img
                style={{}}
                alt="svg"
                src="https://img.icons8.com/doodle/30/000000/coronavirus.png"
              />
            </div>
          </Container>
        </Jumbotron>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            creatorPhoto={post.creatorPhoto}
            creatorName={post.creatorName}
            title={post.title}
            description={post.description.slice(0, 500) + "..."}
            claps={post.claps}
            id={post.id}
          />
        ))}
      </Container>
    </React.Fragment>
  );
}
