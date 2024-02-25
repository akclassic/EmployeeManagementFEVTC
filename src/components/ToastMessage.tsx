import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props: any, ref: any) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}

export const ShowAlert = React.forwardRef(Alert);

function ShowToastMessage(props: any) {
  const { open, autoHideDuration, onClose, severity, message } = props;

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <ShowAlert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </ShowAlert>
    </Snackbar>
  );
}

export default ShowToastMessage;
