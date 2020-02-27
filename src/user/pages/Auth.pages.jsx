import React, { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../shared/Util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import Card from "../../shared/components/UIElements/Card.component";
import Button from "../../shared/components/FormElements/Button.component";
import Input from "../../shared/components/FormElements/Input.component";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [showLogin, setShowLogin] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log("logging in...");
    auth.login();
    console.log(formState.inputs);
  };

  const switchModeHandler = () => {
    console.log("switched");
    if (!showLogin) {
      setFormData(
        {
          ...formState.fields,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setShowLogin(prevMode => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!showLogin && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {showLogin ? "Login" : "Signup"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {showLogin ? "Signup" : "Login"}
      </Button>
    </Card>
  );
};

export default Auth;
