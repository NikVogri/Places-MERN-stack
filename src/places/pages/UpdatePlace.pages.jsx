import React from "react";
import { useParams } from "react-router-dom";

import { VALIDATOR_REQUIRE } from "../../shared/Util/validators";
import Input from "../../shared/components/FormElements/Input.component";
import Button from "../../shared/components/FormElements/Button.component";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageURL:
      "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "20 W 34th St, New York, NY 10001, USA",
    location: {
      lat: 40.7484445,
      lng: -73.9878531
    },
    creatorId: "u1"
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageURL:
      "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "20 W 34th St, New York, NY 10001, USA",
    location: {
      lat: 40.7484445,
      lng: -73.9878531
    },
    creatorId: "u2"
  }
];

const UpdatePlace = () => {
  const { placeId } = useParams();
  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        typeElement="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        currentValue={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        typeElement="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (min 5 characters)."
        onInput={() => {}}
        currentValue={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
