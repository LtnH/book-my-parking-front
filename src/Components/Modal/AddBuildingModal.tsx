import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';

interface AddBuildingModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newBuilding: Building) => void;
  buildingToEdit?: Building;
}

interface Building {
  name: string;
  address: string;
  city: string;
  company: string[];
}

const companies = ['ESGI', 'Company A', 'Company B', 'Company C'];

const AddBuildingModal: React.FC<AddBuildingModalProps> = ({ open, onClose, onAdd, buildingToEdit }) => {
  const [building, setBuilding] = useState<Building>({
    name: '',
    address: '',
    city: '',
    company: [],
  });

  useEffect(() => {
    if (buildingToEdit) {
      setBuilding(buildingToEdit);
    }
  }, [buildingToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuilding({
      ...building,
      [name]: value,
    });
  };

  const handleCompanyChange = (event: any, value: string[]) => {
    setBuilding({
      ...building,
      company: value,
    });
  };

  const handleAddBuilding = () => {
    onAdd(building);
    setBuilding({
      name: '',
      address: '',
      city: '',
      company: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{buildingToEdit ? 'Modifier un bâtiment' : 'Ajouter un bâtiment'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nom"
          type="text"
          fullWidth
          variant="outlined"
          value={building.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Adresse"
          type="text"
          fullWidth
          variant="outlined"
          value={building.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="Ville"
          type="text"
          fullWidth
          variant="outlined"
          value={building.city}
          onChange={handleChange}
        />
        <Autocomplete
          multiple
          options={companies}
          getOptionLabel={(option) => option}
          value={building.company}
          onChange={handleCompanyChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Société"
              margin="dense"
              fullWidth
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleAddBuilding} color="primary">
          {buildingToEdit ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBuildingModal;
