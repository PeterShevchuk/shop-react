import { db } from "./config";

const dbName = "items";

// export const readDataFromFireStore = (dbName) => async (dispatch) => {
//   try {
//     // dispatch(loaderOn());
//     const result = await db.collection(dbName).get();
//     console.log(result);
//     // const formatResult = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     // dispatch(setTask(formatResult));
//   } catch (error) {
//     // dispatch(errorSet("Something went wrong, try later"));
//   } finally {
//     // dispatch(loaderOff());
//   }
// };

export const readDataFromFireStore = async () => {
  try {
    const result = await db.collection(dbName).get();
    console.log(result);
  } catch (error) {
  } finally {
  }
};
