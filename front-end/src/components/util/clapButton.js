import React from "react";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "./ErrorModal";

import ClapButton from "react-clap-button";

const Clap = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();

  const onCountChange = async ({ count, countTotal }) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/blogs/claps/${props.blogId}`,
        "PATCH",
        JSON.stringify({
          claps: countTotal,
        }),
        {
          "content-type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div className="clap-button">
        <ClapButton
          count={0}
          countTotal={props.claps ? props.claps : 0}
          maxCount={5}
          isClicked={false}
          onCountChange={onCountChange}
        />
      </div>
    </React.Fragment>
  );
};
export default Clap;
