import * as React from "react";
import { useState, useEffect } from "react";
import axios from '../axiosConfig';
import LocationDetail from "../Components/AdminComponent/locationDetail";
import { Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import AddReservationModal from "../Components/Modal/AddReservationModal";
import { useUser } from '../context/UserContext';

interface Company {
  id: string;
  name: string;
  head_office: string;
}

interface Building {
  id: string;
  nom: string;
  location: string;
}

interface Place {
  id: number;
  type_place: string;
  numero: number;
}

const places: string[] = ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"];

const HomePage: React.FC = () => {
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [companies, setCompanies] = useState<string[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string>(""); // Initialisation avec une chaîne vide
  const [placesForSelectedBuilding, setPlacesForSelectedBuilding] = useState<Place[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/organisations/mine/');
        const companyNames = response.data.map((company: Company) => company.name);
        setCompanies(companyNames);
      } catch (error) {
        console.error("Error fetching companies: ", error);
      }
    };

    const fetchBuildings = async () => {
      try {
        const response = await axios.get('/parkings/by-organisation/');
        setBuildings(response.data); // Assurez-vous que la réponse contient les objets Building avec id, nom, location
      } catch (error) {
        console.error("Error fetching buildings: ", error);
      }
    };

    fetchCompanies();
    fetchBuildings();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddReservation = (newReservation: any) => {
    console.log("New reservation added: ", newReservation);
    handleClose();
  };

  const handleBuildingChange = async (event: SelectChangeEvent<string>) => {
    const buildingId = event.target.value;
    setSelectedBuilding(buildingId);

    try {
      const response = await axios.get(`/places/places-by-parking/${buildingId}/`);
      const formattedPlaces = response.data.map((place: Place) => ({
        id: place.id,
        label: `${place.numero} - ${place.type_place}`
      }));
      setPlacesForSelectedBuilding(formattedPlaces);
    } catch (error) {
      console.error(`Error fetching places for building ${buildingId}: `, error);
    }
  };

  return (
    <div>
      <div>
        <br />
        <h3>Bonjour {user?.username || "Utilisateur"} !!</h3>
        <h5>Réservez votre place de parking préférée</h5>
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
        buildings={buildings.map((building) => building.nom)}
        places={places}

      />
      <div>
        <Select
          labelId="building-select-label"
          id="building-select"
          value={selectedBuilding}
          onChange={handleBuildingChange}
        >
          {buildings.map((building) => (
            <MenuItem key={building.id} value={building.id}>{building.nom}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default HomePage;
