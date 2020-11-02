import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../components/context/auth-context";
import { useForm } from "../components/hooks/form-hook";
import Container from "react-bootstrap/Container";
import Input from "../components/util/Input";
import Button from "react-bootstrap/Button";
import { useHttpClient } from "../components/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/util/validators";
import ErrorModal from "../components/util/ErrorModal";
import LoadingSpinner from "../components/util/LoadingSpinner";

function NewPost(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [formState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/blogs/createBlog",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          creatorName: auth.userName,
          creator: auth.userId,
          creatorPhoto: auth.image,
        }),
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <Container>
        <form className="place-form" onSubmit={formSubmit}>
          <Input
            id="title"
            type="text"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={InputHandler}
          />
          <Input
            id="description"
            type="text"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(50)]}
            errorText="Please enter a valid description (atleast 50 characters)"
            onInput={InputHandler}
          />

          <Button
            type="submit"
            style={{ margin: "0 13px" }}
            variant="primary"
            disabled={!formState.isValid}
          >
            Post
          </Button>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default NewPost;
