import React, { useReducer, useEffect } from "react";
import { validate } from "./validators";
import "./Input.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    default:
      return state;
  }
}

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, onInput, isValid]);

  function changeHandler(event) {
    dispatch({
      type: "change",
      val: event.target.value,
      validators: props.validators,
    });
  }

  const element =
    props.element === "input" ? (
      <input
        className="form-control"
        id={props.id}
        type={props.type}
        value={inputState.value}
        onChange={changeHandler}
        placeholder={props.placeholder}
      />
    ) : (
      <textarea
        className="form-control"
        id={props.id}
        rows={8}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      style={{ margin: "25px 15px" }}
      className={` ${props.formClass} ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label style={{ fontSize: "large" }} htmlFor={props.id}>
        {" "}
        {props.label}{" "}
      </label>{" "}
      {element}
      {!inputState.isValid && <p> {props.errorText} </p>}
    </div>
  );
}
export default Input;
