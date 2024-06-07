import axios from "axios";
import { FC, useEffect, useState } from "react";
import { AddProps, Users } from "./App.types";
import User from "./Components/Users";

// interface Users {
//   name: {
//     first: string;
//     last: string;
//   };
//   login: {
//     uuid: string;
//   };
//   email: string;
// }

const App: FC<AddProps> = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://randomuser.me/api/?results=10");
      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setHide(true);
    }
  };
  const handleChange = (event) => {
    setUsername(event.target.value);
  };
  return (
    <>
      <button hidden={hide} onClick={handleClick}>
        Show Users
      </button>
      <input type="text" onChange={handleChange}></input>
      <div>{username}</div>
      {/* {isLoading && <p>Loading</p>} */}
      {isLoading ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading</p>
      ) : (
        users.map(({ login, name, email }) => {
          return <User key={login.uuid} name={name} email={email} />;
        })
      )}
    </>
  );
};
export default App;
