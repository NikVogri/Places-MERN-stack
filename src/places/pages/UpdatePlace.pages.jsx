import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { VALIDATOR_REQUIRE } from "../../shared/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.component";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.component";
import Card from "../../shared/components/UIElements/Card.component";
import Input from "../../shared/components/FormElements/Input.component";
import Button from "../../shared/components/FormElements/Button.component";
import "./PlaceForm.css";

const UpdatePlace = () => {
  const { placeId } = useParams();
  const [loadedPlace, setLoadedPlace] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const history = useHistory();
  const { userId } = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.data);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true
            },
            description: {
              value: responseData.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          "Content-Type": "application/json"
        }
      );
      history.push(`/user/${userId}/places`);
    } catch (err) {}
  };

  if (!loadedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>loading</h2>
      </div>
    );
  }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description (min 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
