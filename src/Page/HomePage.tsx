import * as React from "react";
import LocationDetail from "../Components/AdminComponent/locationDetail";
import { Button } from "@mui/material";
import AddReservationModal from "../Components/Modal/AddReservationModal";

export default function HomePage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <div style={{alignItems: "r"}} >
        <Button variant="contained" onClick={handleOpen}>reservé une place</Button>
      </div>
      <LocationDetail />
    <AddReservationModal open={open} handleClose={handleClose} />
    </div>

  )
}