import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.component";
import ErrorModal from "../../shared/components/UIElements/ErrorModal.component";
import UsersList from "../components/UserList/UsersList.component";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        console.log(responseData);
        setLoadedUsers(responseData.data);
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
