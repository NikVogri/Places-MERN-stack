import React, { useState } from "react";

import Map from "../../shared/components/UIElements/Map.component";
import Modal from "../../shared/components/UIElements/Modal.component";
import Button from "../../shared/components/FormElements/Button.component";
import Card from "../../shared/components/UIElements/Card.component";
import "./PlaceItem.css";

const PlaceItem = ({
  id,
  imageURL,
  coordinates,
  title,
  description,
  creatorId,
  address
}) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <li>
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={imageURL} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
