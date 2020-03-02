import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.component";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.component";

import PlaceList from "../components/PlaceList.component";

const UserPlaces = () => {
  const { userId } = useParams();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getLoadedPlaces = async () => {
      try {
        const loadedPlaces = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        console.log(loadedPlaces);
        setLoadedPlaces(loadedPlaces.data);
      } catch (err) {}
    };
    getLoadedPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && <LoadingSpinner />}
      {loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
