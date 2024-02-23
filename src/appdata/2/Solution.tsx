import { useEffect, useState } from "react";

interface user {
  id: string;
  name: string;
  picture: string;
}

// file 1 (useSolutionTwo.js - custom hook)
function useSolutionTwo(): [user[], user, () => void, () => void] {
  const [users, setUsers] = useState<user[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  useEffect(
    function () {
      if (
        users.length - 1 === currentUserIndex ||
        currentUserIndex < users.length
      )
        return;
      async function fetchUsers() {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        if (!response.ok) throw new Error("Error fetching new user");
        const user = {
          id: data.results.at(0).id.value,
          name: `${data.results.at(0).name.title} ${
            data.results.at(0).name.first
          } ${data.results.at(0).name.last}`,
          picture: data.results.at(0).picture.thumbnail,
        };
        setUsers((prevUsers) => [...prevUsers, user]);
      }
      fetchUsers();
    },
    [currentUserIndex, users.length]
  );

  function nextUser() {
    setCurrentUserIndex((idx) => idx + 1);
  }
  function prevUser() {
    if (currentUserIndex === 0) return;
    setCurrentUserIndex((idx) => idx - 1);
  }

  return [users, users[currentUserIndex], nextUser, prevUser];
}

// file 2 (custom hook usage in our component)
export default function Solution() {
  const [users, currentUser, nextUser, prevUser] = useSolutionTwo();

  return (
    <div>
      {users.map((user) => (
        <div>{user?.name}</div>
      ))}
      <div>
        <img src={currentUser?.picture} alt={currentUser?.name} />
        <p>{currentUser?.name}</p>
      </div>

      <button onClick={prevUser}>prev</button>
      <button onClick={nextUser}>next</button>
    </div>
  );
}
