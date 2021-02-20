import React, { useState } from "react";

import { Avatar, Button } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import firebaseApp from "../../firebase";

import "./TweetBox.css";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [verified, setVerified] = useState("false");
  const [userID, setUserID] = useState("");

  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("Signed In");
      var userID = firebaseApp.auth().currentUser.uid;
      const userRef = firebaseApp.firestore().collection("users").doc(userID);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Doc data: ", doc.data());

            const data = doc.data();
            setFullName(data.fullName);
            setUserName(data.userName);
            setVerified(data.verified);
            setAvatar(data.avatar);
            setUserID(userID);
          } else console.log("No Data");
        })
        .catch((err) => console.log("Error"));
    }
  });

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseApp.storage().ref("postImage/");
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setTweetImage(await fileRef.getDownloadURL());
  };

  const sendTweet = (e) => {
    e.preventDefault();

    firebaseApp.firestore().collection("posts").add({
      displayName: fullName,
      userName: userName,
      verified: verified,
      text: tweetMessage,
      image: tweetImage,
      createdOn: Date(),
      creatyBy: userID,
      avatar: avatar,
    });

    setTweetMessage("");
    setTweetImage("");
    setAvatar("");
  };
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar src={avatar} />
          <input
            onChange={(e) => {
              setTweetMessage(e.target.value);
            }}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          onChange={(e) => {
            setTweetImage(e.target.value);
          }}
          value={tweetImage}
          className="tweetBox-imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <PhotoLibraryIcon className="tweetBox-tweetPhoto" />
        <input onChange={onFileChange} type="file" />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox-tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
