import * as React from "react";
import LocationDetail from "../Components/AdminComponent/locationDetail";
import { Button } from "@mui/material";
import AddReservationModal from "../Components/Modal/AddReservationModal";

const companies = ["ESGI", "Company 2", "Company 3"];
const buildings = ["Site RH", "Site R&D", "Site 3", "Site SV"];
const places = ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"];

export default function HomePage() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddReservation = (newReservation: any) => {
    console.log("New reservation added: ", newReservation);
    handleClose();
  };

  return (
    <div>
      <div>
        <br />
        <h3>Bonjour Kevin !!</h3>
        <h5>Réservez votre place de parking préféré</h5>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleOpen}>Réserver une place</Button>
      </div>
      <LocationDetail />
      <AddReservationModal
        open={open}
        onClose={handleClose}
        onAdd={handleAddReservation}
        companies={companies}
        buildings={buildings}
        places={places}
      />
    </div>
  );
}
