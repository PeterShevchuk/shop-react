import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { setErrorState } from "../../Redux/Slice";

const ERROR = () => {
  const { error } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={error}
      autoHideDuration={6000}
      onClose={() => dispatch(setErrorState(null))}
      message="ERROR!"
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={() => dispatch(setErrorState(null))}>
            {error && error.message}
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => dispatch(setErrorState(null))}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default ERROR;
