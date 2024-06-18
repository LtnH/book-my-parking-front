import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent, Typography,
} from '@mui/material';
import VehicleSelection from '../vehiculeSelector/VehicleSelecton';

interface AddPlaceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newPlace: Place) => void;
  buildings: string[];
  placeToEdit?: Place;
}

interface Place {
  number: number;
  building: string;
  type: string[];
}

const AddPlaceModal: React.FC<AddPlaceModalProps> = ({ open, onClose, onAdd, buildings, placeToEdit }) => {
  const [place, setPlace] = useState<Place>({
    number: 0,
    building: buildings[0],
    type: [],
  });

  useEffect(() => {
    if (placeToEdit) {
      setPlace(placeToEdit);
    }
  }, [placeToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlace({
      ...place,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setPlace({
      ...place,
      [name as string]: value as string,
    });
  };

  const handleTypeChange = (selectedTypes: string[]) => {
    setPlace({
      ...place,
      type: selectedTypes,
    });
  };

  const handleAddPlace = () => {
    onAdd(place);
    setPlace({
      number: 0,
      building: buildings[0],
      type: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{placeToEdit ? 'Modifier une place' : 'Ajouter une place'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="number"
          label="Numéro de place"
          type="number"
          fullWidth
          variant="outlined"
          value={place.number}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Bâtiment</InputLabel>
          <Select
            name="building"
            value={place.building}
            onChange={handleSelectChange}
          >
            {buildings.map((building) => (
              <MenuItem key={building} value={building}>
                {building}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Type de place
        </Typography>
        <VehicleSelection selectedTypes={place.type} onChange={handleTypeChange}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Annuler
        </Button>
        <Button onClick={handleAddPlace} variant="contained" color="primary">
          {placeToEdit ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlaceModal;