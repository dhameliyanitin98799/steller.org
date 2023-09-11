import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { fireStoreDb } from "../firebaseConfig";
  
  const FirebaseCrud = () => {
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState("");
  
    const [onItemChange, setItemChange] = useState("");
  
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(fireStoreDb, "users"));
      console.log(querySnapshot.docs);
  
      const data = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().first) {
          data.push({ id: doc.id, text: doc.data().first });
        }
      });
      setData(data);
    };
    
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleCreate = async () => {
      // Add a new document in collection "cities"
      await addDoc(collection(fireStoreDb, "users"), {
        first: newItem,
        last: "Lovelace",
        born: 1996,
      });
      fetchData();
      setNewItem("");
    };
  
    const handleUpdate = async (id, newText) => {
      await setDoc(doc(fireStoreDb, "users", id), {
        first: newText,
        last: "Lovelace",
        born: 1996,
      });
      fetchData();
    };
  
    const handleDelete = async (id) => {
      await deleteDoc(doc(fireStoreDb, "users", id));
      fetchData();
    };
  
    return (
      <div>
        <h2>CRUD App with Firebase</h2>
        <input
          type="text"
          style={{border: "2px soild black"}}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          onClick={() => {
            handleCreate();
          }}
        >
          Add
        </button>
        <ul>
          {console.log(data)}
          {data.map((item) => (
            <li key={item.id}>
              <input
                type="text"
                defaultValue={item.text}
                onChange={(e) => setItemChange(e.target.value)}
              />
              <button onClick={() => handleUpdate(item.id, onItemChange)}>
                Update
              </button>
              <span> </span>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FirebaseCrud;
  