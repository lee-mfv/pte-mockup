import React from 'react'
import PropTypes from "prop-types";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import Button from "components/CustomButtons/Button.jsx";

const ConfirmDialog = (props) => {
  const { onClose, open, headerTitle, bodyContent, ...other } = props;

  function handleCancel() {
    onClose('cancel');
  }

  function handleOk() {
    onClose('ok');
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{headerTitle}</DialogTitle>
      <DialogContent dividers>
        {bodyContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="info">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmDialog;