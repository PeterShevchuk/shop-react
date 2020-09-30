import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { dbUsers } from "../../operations";
import "./ProfileID.css";
const ProfileID = () => {
  const [userInfo, setUseInfo] = useState({});
  const { user, token } = useSelector((state) => state.session);
  const userSearchId = useParams().id;
  useEffect(() => {
    const fetchData = async () => {
      const asdasdassd = await dbUsers.doc(userSearchId).get();
      const { name, uid, photoUrl } = asdasdassd.data();
      setUseInfo({ name, uid, photoUrl });
    };

    fetchData();
  }, [userSearchId]);
  return (
    <div className="container profile">
      <div className="profile__photo">
        <img src={userInfo.photoUrl} width="300" height="300" alt={userInfo.name} />
      </div>
      <div className="profile__info">
        <p>ID: {userInfo.uid}</p>
        <p>
          Name: {userInfo.name} {token && userSearchId === user.uid && <span>(You)</span>}
        </p>
      </div>
    </div>
  );
};

export default ProfileID;
