import React, { useEffect, useState } from "react";
import { fireStoreDb } from './firebaseConfig';
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";


  const Footer = () => {
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
  return (
    <>
    
    <div className=" mt-5">
      <footer className="text-white text-center text-lg-start bg-dark">
        
        <div className="container p-4">
      
          <div className="row mt-4">
          
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About company</h5>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti.
              </p>
              <p>
                Blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias.
              </p>
              <div className="mt-4">
              
             
              </div>
            </div>
          
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1"  input value={newItem}
              onChange={(e) => setNewItem(e.target.value)} className2="form-control" name="EMAIL" placeholder="Your Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '" required type="email" />
              <button className="click-btn btn btn-default" onClick={() => {
                  handleCreate();
              }}>Subscribe</button>
              <div style={{ position: 'absolute', left: '-5000px' }}>
                  <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue type="text" /></div>
              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  id="formControlLg"
                  className="form-control form-control-lg"
                />
                
               
              </div>
              <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
                <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-home" />
                  </span>
                  <span className="ms-2">Warsaw, 00-967, Poland</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="ms-2">contact@example.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-phone" />
                  </span>
                  <span className="ms-2">+ 48 234 567 88</span>
                </li>
              </ul>
            </div>
           
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Opening hours</h5>
              <table className="table text-center text-white">
                <tbody className="fw-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 1am</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9am - 10pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
          </div>
         
        </div>
     
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a className="text-white" href="">
            steller.com
          </a>
        </div>
    
      </footer>
    </div>
   
  </>
  

  );
};
export default Footer
