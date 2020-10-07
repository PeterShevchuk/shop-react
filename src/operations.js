import { db, auth, userData } from "./config";

import { setToken, setUserInfo, loginOut, setItemsState, setErrorState, setLoader, setSuccess, removeItemState, editItemState, addItemState } from "./Redux/Slice";

export const dbItems = db.collection("items");
export const dbItemsDelete = db.collection("itemsDeleted");
export const dbUsers = db.collection("users");
export const dbSubs = db.collection("subscribe");

export const setItem = (data) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    await dbItems.add(data);
    dispatch(addItemState(data));
    dispatch(setSuccess("Done! Item " + data.title + " added"));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};
export const deleteItem = (data) => async (dispatch) => {
  data = { ...data, dateDelete: Date.now() };
  dispatch(setLoader(true));
  try {
    await dbItemsDelete.doc(data.id).set(data);
    await dbItems.doc(data.id).delete();
    dispatch(removeItemState(data.id));
    dispatch(setSuccess("Done! Item " + data.title + " deleted"));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};
export const editItem = (data) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    await dbItems.doc(data.id).set(data);
    dispatch(editItemState(data));
    dispatch(setSuccess("Done! Item " + data.title + " save change!"));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};
export const getItems = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const result = await dbItems.get();
    const formatResult = await result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(setItemsState(formatResult));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};

export const userSingUp = ({ email, password, phoneNumber, name, photoUrl }) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    dispatch(setToken(result.user.refreshToken));
    const newDataUserInfo = { uid: result.user.uid, email, phoneNumber, name, photoUrl, admin: false, date: Date.now() };
    await dbUsers.doc(result.user.uid).set(newDataUserInfo);
    dispatch(setUserInfo(newDataUserInfo));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};

export const userSingIn = (email, password) => async (dispatch) => {
  setLoader(true);
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    dispatch(setToken(result.user.refreshToken));
    const resultUserData = await dbUsers.doc(result.user.uid).get();
    dispatch(setUserInfo(resultUserData.data()));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    setLoader(false);
  }
};

export const userSingOut = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    await auth.signOut();
    dispatch(loginOut());
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};

export const getUserInfo = (uid) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const resultUserData = await dbUsers.doc(uid).get();
    return resultUserData.data();
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
  }
};

export const subscribe = (email) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    await dbSubs.add({ email });
    dispatch(setSuccess("Done! " + email + " added to subscribe"));
  } catch (error) {
    dispatch(setErrorState(error));
  } finally {
    dispatch(setLoader(false));
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
