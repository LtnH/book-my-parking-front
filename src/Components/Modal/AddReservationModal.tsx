import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import Signup from "../Form/signup";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddReservationModal({open, handleClose}: {open: boolean, handleClose: SetStateAction<any>}) {


  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Signup />
      </Box>
    </Modal>
  );
}