import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';

interface VehicleSelectionProps {
  selectedTypes: string[];
  onChange: (selectedTypes: string[]) => void;
}

const vehicleTypes = [
  { label: 'Vélo', icon: <DirectionsBikeIcon />, value: 'Vélo' },
  { label: 'Moto', icon: <TwoWheelerIcon />, value: 'Moto' },
  { label: 'Voiture', icon: <DirectionsCarIcon />, value: 'Voiture' },
  { label: 'Electric', icon: <ElectricCarIcon />, value: 'Electric' },
];

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ selectedTypes, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newSelectedTypes = checked
      ? [...selectedTypes, value]
      : selectedTypes.filter((type) => type !== value);
    onChange(newSelectedTypes);
  };

  return (
    <FormGroup row>
      {vehicleTypes.map((type) => (
        <FormControlLabel
          key={type.value}
          control={
            <Checkbox
              icon={type.icon}
              checkedIcon={type.icon}
              checked={selectedTypes.includes(type.value)}
              onChange={handleChange}
              value={type.value}
            />
          }
          label={type.label}
        />
      ))}
    </FormGroup>
  );
};

export default VehicleSelection;
