import React from "react";
import "./UserList.css";
import UserItem from "../UserItem/UserItem.component";
import Card from "../../../shared/components/UIElements/Card.component";
const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found..</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map(item => (
        <UserItem
          key={item._id}
          id={item._id}
          image={item.image}
          name={item.name}
          placeCount={item.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
