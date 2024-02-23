import { useEffect, useState } from "react";

export default function Solution() {
  const [users, setUsers] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(function () {
    async function getUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("failed to fetch users");
      const data = await response.json();

      setUsers(data.map((el: { name: string }) => el.name));
    }
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <input
        type='text'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {filteredUsers.map((user) => (
        <div key={user}>{user}</div>
      ))}
    </div>
  );
}
