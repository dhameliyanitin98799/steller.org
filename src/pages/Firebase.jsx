import React, { useState, useEffect } from "react";
import firebase from "./firebaseCo";

const Firebase = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const databaseRef = firebase.database().ref("items");
    const snapshot = await databaseRef.once("value");
    const values = snapshot.val();
    if (values) {
      const dataArray = Object.entries(values).map(([id, item]) => ({
        id,
        ...item,
      }));
      setData(dataArray);
    }
  };

  const handleCreate = async () => {
    // Create operation
    const newItemData = {
      text: newItem,
    };
    const newRef = firebase.database().ref("items").push();
    await newRef.set(newItemData);
    await fetchData()
    setNewItem("");
  };

  const handleUpdate = async (id, newText) => {
    // Update operation
    const updatedItemData = {
      text: newText,
    };
    const databaseRef = firebase.database().ref(`items/${id}`);
    await databaseRef.update(updatedItemData);
  };

  const handleDelete = async (id) => {
    // Delete operation
    const databaseRef = firebase.database().ref(`items/${id}`);
    await databaseRef.remove();
  };

  return (
    <div>
      <h2>CRUD App with Firebase</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleCreate}>Add</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleUpdate(item.id, e.target.value)}
            />
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Firebase;
