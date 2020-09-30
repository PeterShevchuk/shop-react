import { db, auth, userData } from "./config";

import { setToken, setUserInfo, loginOut, setItemsState, Loader } from "./Redux/Slice";

export const dbItems = db.collection("items");
export const dbUsers = db.collection("users");

export const setItem = (data) => async (dispatch) => {
  dispatch(Loader(true));
  try {
    await dbItems.add(data);
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(Loader(false));
  }
};
export const getItems = () => async (dispatch) => {
  dispatch(Loader(true));
  try {
    const result = await dbItems.get();
    const formatResult = await result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(setItemsState(formatResult));
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(Loader(false));
  }
};

export const userSingUp = ({ email, password, phoneNumber, name, photoUrl }) => async (dispatch) => {
  dispatch(Loader(true));
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    dispatch(setToken(result.user.refreshToken));
    const newDataUserInfo = { uid: result.user.uid, email, phoneNumber, name, photoUrl, admin: false };
    await dbUsers.doc(result.user.uid).set(newDataUserInfo);
    dispatch(setUserInfo(newDataUserInfo));
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(Loader(false));
  }
};

export const userSingIn = (email, password) => async (dispatch) => {
  dispatch(Loader(true));
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    dispatch(setToken(result.user.refreshToken));
    const resultUserData = await dbUsers.doc(result.user.uid).get();
    dispatch(setUserInfo(resultUserData.data()));
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(Loader(false));
  }
};

export const userSingOut = () => async (dispatch) => {
  dispatch(Loader(true));
  try {
    await auth.signOut();
    dispatch(loginOut());
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(Loader(false));
  }
};

export const getUserInfo = (uid) => async (dispatch) => {
  dispatch(Loader(true));
  try {
    const resultUserData = await dbUsers.doc(uid).get();
    return resultUserData.data();
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(Loader(false));
  }
};

export const userChangeName = (name, userId) => async (dispatch) => {
  userData
    .ref("users/" + userId)
    .set({
      username: name,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};
