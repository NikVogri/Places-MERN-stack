import React from "react";

import PlaceItem from "./PlaceItem.component";
import Card from "../../shared/components/UIElements/Card.component";
import "./PlaceList.css";

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found, maybe create one?</h2>
          <button>Shared Place</button>
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
          imageURL={item.imageURL}
          title={item.title}
          description={item.description}
          address={item.address}
          creatorId={item.creator}
          coordinates={item.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;