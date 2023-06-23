import { useState } from "react";

const initialData = [
  { name: "Tom", lastName: "Cruise" },
  { name: "Marlon", lastName: "Brando" },
  { name: "Bob", lastName: "Deniro" },
  { name: "Al", lastName: "Pacino" },
  { name: "Johny", lastName: "Depp" },
  { name: "Tom", lastName: "Cruise" },
  { name: "Al", lastName: "Pacino" },
  { name: "Bob", lastName: "Deniro" },
  { name: "Marlon", lastName: "Brando" },
  { name: "Johny", lastName: "Depp" },
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [sortedData, setSortedData] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setNewLastName(event.target.value);
  };

  const addName = () => {
    if (newName.trim() !== "" && newLastName.trim() !== "") {
      const newData = [
        ...data,
        { name: newName.trim(), lastName: newLastName.trim() },
      ];
      setData(newData);
      setNewName("");
      setNewLastName("");
    }
  };

  const displayAllNames = () => {
    setIsSorted(false);
    setSortedData([]);
  };

  const sortByName = () => {
    if (!isSorted) {
      const uniqueSet = new Set();

      const sorted = [...data].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );

      const uniqueSorted = sorted.filter((person) => {
        const lowerCaseName = person.name.toLowerCase();
        const lowerCaseLastName = person.lastName.toLowerCase();
        const key = lowerCaseName + lowerCaseLastName;
        if (!uniqueSet.has(key)) {
          uniqueSet.add(key);
          return true;
        }
        return false;
      });

      setSortedData(uniqueSorted);
      setIsSorted(true);
    } else {
      const uniqueSet = new Set();

      const sorted = [...sortedData].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );

      const uniqueSorted = sorted.filter((person) => {
        const lowerCaseName = person.name.toLowerCase();
        const lowerCaseLastName = person.lastName.toLowerCase();
        const key = lowerCaseName + lowerCaseLastName;
        if (!uniqueSet.has(key)) {
          uniqueSet.add(key);
          return true;
        }
        return false;
      });

      setSortedData(uniqueSorted);
    }
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="Enter Name"
        />
        <input
          type="text"
          value={newLastName}
          onChange={handleLastNameChange}
          placeholder="Enter Last Name"
        />
        <button onClick={addName}>Add Name</button>
        <br />
        <br />

        <button onClick={displayAllNames}>Display All Names</button>
      </div>

      <ul>
        {isSorted
          ? sortedData.map((person, index) => (
              <li key={index}>
                {person.name} {person.lastName}
              </li>
            ))
          : data.map((person, index) => (
              <li key={index}>
                {person.name} {person.lastName}
              </li>
            ))}
      </ul>
      <button onClick={sortByName}>Sort by Name</button>
    </div>
  );
};

export default App;
