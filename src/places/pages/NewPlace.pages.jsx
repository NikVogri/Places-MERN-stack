import React, { useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/Util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

import ImageUpload from "../../shared/components/FormElements/ImageUpload.component";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.component";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.component";
import Button from "../../shared/components/FormElements/Button.component";
import Input from "../../shared/components/FormElements/Input.component";
import "./PlaceForm.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      },
      image: {
        value: "",
        isValid: false
      }
    },
    false
  );
  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId, token } = useContext(AuthContext);

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", userId);
      formData.append("image", formState.inputs.image.value);
      const data = await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        formData,
        {
          Authorization: `Bearer ${token}`
        }
      );
      console.log(data);
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
