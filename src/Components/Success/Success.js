import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setSuccess } from "../../Redux/Slice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const position = { vertical: "bottom", horizontal: "left" };

const Success = () => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.global.success);
  return (
    <Snackbar open={success ? true : false} anchorOrigin={position} autoHideDuration={6000} onClose={() => dispatch(setSuccess(null))}>
      <Alert onClose={() => dispatch(setSuccess(null))} severity="success">
        {success}
      </Alert>
    </Snackbar>
  );
};

export default Success;
