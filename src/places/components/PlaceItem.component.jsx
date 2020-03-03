import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal.component";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.component";
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
  address,
  onDelete,
  creatorId
}) => {
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`
        }
      );
      // refreshes places list and removes deleted place.
      onDelete(id);
    } catch (err) {}
  };
  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
      <Modal
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        footer={
          <>
            <Button inverse onClick={confirmDeleteHandler}>
              Delete
            </Button>
            <Button danger onClick={cancelDeleteHandler}>
              Cancel
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please not that it can't
          be undone thereafter.
        </p>
      </Modal>
      <li>
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`http://localhost:5000/${imageURL}`} alt={title} />
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
            {auth.userId === creatorId && (
              <>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button danger onClick={showDeleteHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
