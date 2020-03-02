import React from "react";

import Button from "../../shared/components/FormElements/Button.component";
import PlaceItem from "./PlaceItem.component";
import Card from "../../shared/components/UIElements/Card.component";
import "./PlaceList.css";

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found, maybe create one?</h2>
          <Button to="/places/new">Shared Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map(item => (
        <PlaceItem
          key={item.id}
          id={item.id}
          imageURL={item.image}
          title={item.title}
          description={item.description}
          address={item.address}
          creatorId={item.creator}
          coordinates={item.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
