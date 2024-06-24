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
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ElectricCar } from "@mui/icons-material";

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
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
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
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
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

  const handleStartDateChange = (date: Dayjs | null) => {
    setReservation({
      ...reservation,
      startDate: date,
    });
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setReservation({
      ...reservation,
      endTime: date,
    });
  };

  const handleStartTimeChange = (time: Dayjs | null) => {
    setReservation({
      ...reservation,
      startTime: time,
    });
  };

  const handleEndTimeChange = (time: Dayjs | null) => {
    setReservation({
      ...reservation,
      endTime: time,
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
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
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
          label="Date de début"
          value={reservation.startDate}
          onChange={handleStartDateChange}
          sx={{ mb: 2, mr: 5 }}
          // renderInput={(params) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
        />
        <DatePicker
          label="Date de fin"
          value={reservation.endDate}
          onChange={handleEndDateChange}
          sx={{ mb: 2 }}
          // renderInput={(params) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
        />
        <TimePicker
          label="Heure de début"
          value={reservation.startDate}
          onChange={handleStartTimeChange}
          sx={{ mb: 2, mr: 5 }}
          // renderInput={(params) => <TextField {...params} fullWidth margin="dense" sx={{ mb: 2 }} />}
        />
        <TimePicker
          label="Heure de fin"
          value={reservation.endTime}
          onChange={handleEndTimeChange}
          sx={{ mb: 2 }}
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
                icon={<ElectricCarIcon />}
                checkedIcon={<ElectricCarIcon/>}
                value="Electric"
                checked={reservation.vehicleTypes.includes('Electric')}
                onChange={handleVehicleTypeChange}
              />
            }
            label="Electric"
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
