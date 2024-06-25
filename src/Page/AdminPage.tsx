import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBuildingModal from '../Components/Modal/AddBuildingModal';
import AddPlaceModal from '../Components/Modal/AddPlaceModal';

interface Building {
  name: string;
  address: string;
  city: string;
  place: number;
  company: string[];
}

interface Place {
  number: number;
  building: string;
  type: string[];
}

const initialBuildings: Building[] = [
  { name: 'ESGI Lyon', address: '40 rue du bouldodrome 690001', city: 'Lyon', company: ['ESGI'], place: 8 },

];

const initialPlaces: Place[] = [
  { number: 1, building: 'ESGI Lyon', type: ['Moto'] },
  { number: 2, building: 'ESGI Lyon', type: ['Voiture'] },
  { number: 3, building: 'ESGI Lyon', type: ['Voiture'] },
  { number: 4, building: 'ESGI Lyon', type: ['Voiture'] },
  { number: 5, building: 'ESGI Lyon', type: ['Voiture'] },
  { number: 6, building: 'ESGI Lyon', type: ['Voiture'] },
  { number: 7, building: 'ESGI Lyon', type: ['Voiture'] },
  { number: 8, building: 'ESGI Lyon', type: ['Voiture'] },
];

const AdminPage: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [places, setPlaces] = useState<Place[]>(initialPlaces);

  const [openBuildingModal, setOpenBuildingModal] = useState(false);
  const [buildingToEdit, setBuildingToEdit] = useState<Building | undefined>(undefined);

  const [openPlaceModal, setOpenPlaceModal] = useState(false);
  const [placeToEdit, setPlaceToEdit] = useState<Place | undefined>(undefined);

  const handleOpenBuildingModal = () => {
    setBuildingToEdit(undefined);
    setOpenBuildingModal(true);
  };

  const handleOpenEditBuildingModal = (building: Building) => {
    setBuildingToEdit(building);
    setOpenBuildingModal(true);
  };

  const handleCloseBuildingModal = () => {
    setOpenBuildingModal(false);
  };

  const handleOpenPlaceModal = () => {
    setPlaceToEdit(undefined);
    setOpenPlaceModal(true);
  };

  const handleOpenEditPlaceModal = (place: Place) => {
    setPlaceToEdit(place);
    setOpenPlaceModal(true);
  };

  const handleClosePlaceModal = () => {
    setOpenPlaceModal(false);
  };

  const handleAddBuilding = (newBuilding: Building) => {
    if (buildingToEdit) {
      setBuildings(buildings.map(b => (b === buildingToEdit ? newBuilding : b)));
    } else {
      setBuildings([...buildings, newBuilding]);
    }
  };

  const handleAddPlace = (newPlace: Place) => {
    if (placeToEdit) {
      setPlaces(places.map(p => (p === placeToEdit ? newPlace : p)));
    } else {
      setPlaces([...places, newPlace]);
      setBuildings(buildings.map(function (b){
        if (b.name === newPlace.building) {
          b.place += 1
        }
        return b;
      }))
    }
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        backgroundColor: '#f5f5f5',
        padding: 4,
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5' }}>
        Gérer vos sites
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5' }}>
        sites :
      </Typography>
      <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#FFA500', color: '#fff', '&:hover': { backgroundColor: '#FF8C00' } }}
          onClick={handleOpenBuildingModal}
        >
          Ajouter
        </Button>
      </Grid>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3f51b5' }}>
              <TableCell sx={{ color: '#fff' }}>Nom</TableCell>
              <TableCell sx={{ color: '#fff' }}>Adresse</TableCell>
              <TableCell sx={{ color: '#fff' }}>Ville</TableCell>
              <TableCell sx={{ color: '#fff' }}>Société</TableCell>
              <TableCell sx={{ color: '#fff' }}>Nombre de place</TableCell>
              <TableCell sx={{ color: '#fff' }} align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((building, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#e3f2fd' } }}>
                <TableCell>{building.name}</TableCell>
                <TableCell>{building.address}</TableCell>
                <TableCell>{building.city}</TableCell>
                <TableCell>{building.company.join(', ')}</TableCell>
                <TableCell>{building.place}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEditBuildingModal(building)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5' }}>
        Place :
      </Typography>
      <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#FFA500', color: '#fff', '&:hover': { backgroundColor: '#FF8C00' } }}
          onClick={handleOpenPlaceModal}
        >
          Ajouter
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3f51b5' }}>
              <TableCell sx={{ color: '#fff' }}>Numéro de place</TableCell>
              <TableCell sx={{ color: '#fff' }}>Building</TableCell>
              <TableCell sx={{ color: '#fff' }}>Type de place</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {places.map((place, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#e3f2fd' } }}>
                <TableCell>{place.number}</TableCell>
                <TableCell>{place.building}</TableCell>
                <TableCell>{place.type.join(', ')}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEditPlaceModal(place)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddBuildingModal open={openBuildingModal} onClose={handleCloseBuildingModal} onAdd={handleAddBuilding} buildingToEdit={buildingToEdit} />
      <AddPlaceModal open={openPlaceModal} onClose={handleClosePlaceModal} onAdd={handleAddPlace} buildings={buildings} places={places} placeToEdit={placeToEdit} />
    </Container>
  );
};

export default AdminPage;
