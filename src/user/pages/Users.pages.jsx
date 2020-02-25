import React from "react";
import UsersList from "../components/UserList/UsersList.component";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Nick",
      image:
        "https://images.pexels.com/photos/3639542/pexels-photo-3639542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
