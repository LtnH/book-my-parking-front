import React, { useState } from 'react';
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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  SelectChangeEvent
} from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface AddReservationModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newReservation: Reservation) => void;
  companies: string[];
  buildings: string[];
  places: string[];
}

interface Reservation {
  company: string;
  building: string;
  date: Dayjs | null;
  time: Dayjs | null;
  vehicleTypes: string[];
  place: string;
}

const AddReservationModal: React.FC<AddReservationModalProps> = ({
                                                                   open,
                                                                   onClose,
                                                                   onAdd,
                                                                   companies,
                                                                   buildings,
                                                                   places,
                                                                 }) => {
  const [reservation, setReservation] = useState<Reservation>({
    company: companies[0],
    building: buildings[0],
    date: null,
    time: null,
    vehicleTypes: [],
    place: places[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setReservation({
      ...reservation,
      [name as string]: value as string,
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setReservation({
      ...reservation,
      date: date,
    });
  };

  const handleTimeChange = (time: Dayjs | null) => {
    setReservation({
      ...reservation,
      time: time,
    });
  };

  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const newVehicleTypes = checked
      ? [...reservation.vehicleTypes, value]
      : reservation.vehicleTypes.filter((type) => type !== value);
    setReservation({
      ...reservation,
      vehicleTypes: newVehicleTypes,
    });
  };

  const handleAddReservation = () => {
    onAdd(reservation);
    setReservation({
      company: companies[0],
      building: buildings[0],
      date: null,
      time: null,
      vehicleTypes: [],
      place: places[0],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Réservé une place :</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
          <InputLabel>Société</InputLabel>
          <Select
            name="company"
            value={reservation.company}
            onChange={handleSelectChange}
          >
            {companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
          <InputLabel>Bâtiment</InputLabel>
          <Select
            name="building"
            value={reservation.building}
            onChange={handleSelectChange}
          >
            {buildings.map((building) => (
              <MenuItem key={building} value={building}>
                {building}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          label="Date"
          value={reservation.date}
          onChange={handleDateChange}
          // renderInput={(params) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
        />
        <TimePicker
          label="Heure"
          value={reservation.time}
          onChange={handleTimeChange}
          // renderInput={(params) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
        />
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Type de place
        </Typography>
        <FormGroup row sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<DirectionsBikeIcon />}
                checkedIcon={<DirectionsBikeIcon />}
                value="Vélo"
                checked={reservation.vehicleTypes.includes('Vélo')}
                onChange={handleVehicleTypeChange}
              />
            }
            label="Vélo"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<TwoWheelerIcon />}
                checkedIcon={<TwoWheelerIcon />}
                value="Moto"
                checked={reservation.vehicleTypes.includes('Moto')}
                onChange={handleVehicleTypeChange}
              />
            }
            label="Moto"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<DirectionsCarIcon />}
                checkedIcon={<DirectionsCarIcon />}
                value="Voiture"
                checked={reservation.vehicleTypes.includes('Voiture')}
                onChange={handleVehicleTypeChange}
              />
            }
            label="Voiture"
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<LocalShippingIcon />}
                checkedIcon={<LocalShippingIcon />}
                value="Camion"
                checked={reservation.vehicleTypes.includes('Camion')}
                onChange={handleVehicleTypeChange}
              />
            }
            label="Camion"
          />
        </FormGroup>
        <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
          <InputLabel>Place</InputLabel>
          <Select
            name="place"
            value={reservation.place}
            onChange={handleSelectChange}
          >
            {places.map((place) => (
              <MenuItem key={place} value={place}>
                {place}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Annuler
        </Button>
        <Button onClick={handleAddReservation} variant="contained" color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReservationModal;
