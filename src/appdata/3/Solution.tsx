import { useEffect, useState } from "react";

export default function Solution() {
  const [users, setUsers] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);

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
    isCaseSensitive
      ? user.includes(searchText)
      : user.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <br />
      <input
        type="checkbox"
        id="cs"
        onChange={(e) => setIsCaseSensitive(e.target.checked)}
      />
      <label htmlFor="cs">case sensitive</label>
      {filteredUsers.map((user) => (
        <div key={user}>{user}</div>
      ))}
    </div>
  );
}
