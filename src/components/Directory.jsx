import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

import '../styles/directory.styles.scss';

const Directory = ({type}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const data = async () => {
      const q = query(collection(db, "users"), where("type", "==", type));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const notInArray = searchResults.some(u => u.uid === data.uid);
        if (notInArray === false) {
          searchResults.push(data)
        }
      });
      setLoading(false);
    };
    return () => {
      data();
    };
  }, []);

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispatch({type:'CHANGE_USER', payload: user})
      navigate('/');
    } catch (err) {
      console.log(err);
    }
   
  };

  if (loading) return <div>Loading</div>;

  if (!searchResults) return <div>No users available</div>;

  return (
    <div className="directory">
      <h1>{type === "doctor" ? "Doctors" : "Residents"}</h1>
      {searchResults.map((person) => (
        <div
          className="directory__user"
          key={person.uid}
          onClick={() => handleSelect(person)}
        >
          <img
            src={person.photoURL}
            alt="user"
            className="directory__user__img"
          />
          <h5 className="directory__user__name">{person.displayName}</h5>
        </div>
      ))}
    </div>
  );
};

export default Directory;
