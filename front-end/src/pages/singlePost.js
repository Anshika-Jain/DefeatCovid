import React, { useState, useEffect } from "react";

import BlogCard from "../components/card";
import Container from "react-bootstrap/Container";

import { useHttpClient } from "../components/hooks/http-hook";
import ErrorModal from "../components/util/ErrorModal";
import LoadingSpinner from "../components/util/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  let id = useParams().postId;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/blogs/read/${id}`
        );
        console.log(responseData);
        setPost(responseData.blog);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBlog();
  }, [sendRequest, id]);

  return (
    <div className="slide-up">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <Container>
        {post && (
          <BlogCard
            creatorPhoto={post.creatorPhoto}
            creatorName={post.creatorName}
            title={post.title}
            description={post.description}
            claps={post.claps}
            isSingle={true}
            id={post.id}
          />
        )}
      </Container>
    </div>
  );
}
