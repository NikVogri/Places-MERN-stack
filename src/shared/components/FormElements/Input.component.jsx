import React, { useReducer, useEffect } from "react";

import { validate } from "../../Util/validators";
import "./Input.css";

// this reducer can be outside the functional component
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  type,
  typeElement,
  placeholder,
  rows,
  validators,
  errorText,
  onInput,
  currentValue,
  valid
}) => {
  // first argument takes in reducer, second one takes in INITIAL state.
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: currentValue || "",
    isValid: false || valid,
    isTouched: false
  });

  const changeHandler = event => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators
    });
  };
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const touchHandler = () => {
    console.log("here");
    dispatch({ type: "TOUCH" });
  };

  const element =
    typeElement === "input" ? (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
