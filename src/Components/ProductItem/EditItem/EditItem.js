import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddEditForm from "../AddEditForm/AddEditForm";

import { setErrorState } from "../../../Redux/Slice";

import { editItem, deleteItem } from "../../../operations";

import "./EditItem.css";
const EditItem = ({ open, close, array }) => {
  const [itemInfo, setItemInfo] = useState(array);

  const { user } = useSelector((state) => state.session);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setItemInfo(array);
  }, [array]);

  const onSubmit = () => {
    if (checkAdd()) {
      return;
    }
    close(false);
    dispatch(editItem({ ...itemInfo, edit: { date: Date.now(), authorName: user.name, authorUid: user.uid } }));
  };
  const checkAdd = () => {
    const { title, images, price, category } = itemInfo;
    if (title === "" && title === " ") {
      setError("Error! Title is null");
      return true;
    }
    if (images === "") {
      setError("Error! No images");
      return true;
    }
    if (price === "") {
      setError("Error! No price");
      return true;
    }
    if (category === "") {
      setError("Error! Choose category");
      return true;
    }
    return false;
  };
  const setError = (mess) => {
    dispatch(setErrorState({ message: mess }));
  };
  const delItem = () => {
    close(false);
    dispatch(deleteItem(itemInfo));
    history.goBack();
  };
  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth="md" onClose={() => close(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Edit - " + array.title}</DialogTitle>
        <DialogContent>
          <AddEditForm itemInfo={itemInfo} setItemInfo={setItemInfo} />
        </DialogContent>
        <DialogActions className="editItem__editWindow-btns">
          <Button onClick={() => delItem()} color="secondary" className="editItem__editWindow-btns-delete">
            Delete
          </Button>
          <Button onClick={() => close(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSubmit()} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditItem;
