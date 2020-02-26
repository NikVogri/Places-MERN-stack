import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList.component";

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

const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
