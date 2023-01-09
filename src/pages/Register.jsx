import React, { useState } from "react";
import Add from "../assets/add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import '../styles/form.styles.scss';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    console.log(type, file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              type,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          });
        }
      );
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Senior Living</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="add avatar button" />
            <span>Add an avatar</span>
          </label>
          <fieldset>
            <legend>Please select your classification</legend>
            <div className="radio">
              <div className="radio__div">
                <input
                className="radio__btn"
                  type="radio"
                  id="type1"
                  name="type"
                  value="doctor"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="contactChoice1">Doctor</label>
              </div>
              <div className="radio__div">
                <input
                className="radio__btn"
                  type="radio"
                  id="type2"
                  name="type"
                  value="resident"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="contactChoice2">Resident</label>
              </div>
            </div>
          </fieldset>
          <button>Sign Up</button>
          {err && <span>Something went wrong.</span>}
        </form>
        <p>Already have an <Link to="/login">account?</Link> </p>
      </div>
    </div>
  );
};

export default Register;
