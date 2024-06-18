import React from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, isToday, isAfter } from 'date-fns';

interface Reservation {
  id: number;
  place: string;
  building: string;
  date: string;
  time: string;
}

const reservations: Reservation[] = [
  {
    id: 1,
    place: 'Place 3',
    building: 'Site RH',
    date: '2024-08-08',
    time: '12h-16h',
  },
  {
    id: 2,
    place: 'Place 3',
    building: 'Site RH',
    date: '2023-08-08',
    time: '12h-16h',
  },
  {
    id: 3,
    place: 'Place 3',
    building: 'Site RH',
    date: '2023-07-08',
    time: '12h-16h',
  },
  {
    id: 4,
    place: 'Place 4',
    building: 'Site RH',
    date: '2023-07-07',
    time: '12h-16h',
  },
];

interface ReservationCardProps {
  reservation: Reservation;
  showActions?: boolean;
  type: 'today' | 'upcoming' | 'past';
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, showActions = false, type }) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (type) {
      case 'today':
        return '#FFD700'; // Gold for today's reservations
      case 'upcoming':
        return '#87CEFA'; // LightSkyBlue for upcoming reservations
      case 'past':
        return '#FFA07A'; // LightSalmon for past reservations
      default:
        return theme.palette.background.paper;
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        backgroundColor: getBackgroundColor(),
      }}
    >
      <CardContent>
        <Typography variant="h6">{reservation.place}</Typography>
        <Typography variant="body2">Bâtiment : {reservation.building}</Typography>
        <Typography variant="body2">Date : {format(new Date(reservation.date), 'dd/MM/yyyy')}</Typography>
        <Typography variant="body2">Heure : {reservation.time}</Typography>
        {showActions && (
          <div style={{ marginTop: 16 }}>
            <Button variant="contained" startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
              Éditer
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
              Supprimer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Reservations: React.FC = () => {
  const today = new Date();

  const todayReservations = reservations.filter(r => isToday(new Date(r.date)));
  const upcomingReservations = reservations.filter(r => isAfter(new Date(r.date), today) && !isToday(new Date(r.date)));
  const pastReservations = reservations.filter(r => !isAfter(new Date(r.date), today));

  return (
    <Container sx={{ marginTop: 4, marginLeft: 0 }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5' }}>
        Mes Réservations
      </Typography>
      {todayReservations.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5' }}>
            Réservations du jour :
          </Typography>
          <Grid container spacing={2}>
            {todayReservations.map(reservation => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={reservation.id}>
                <ReservationCard reservation={reservation} showActions type="today" />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#3f51b5' }}>
        Réservations à venir :
      </Typography>
      {upcomingReservations.length > 0 ? (
        <Grid container spacing={2}>
          {upcomingReservations.map(reservation => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={reservation.id}>
              <ReservationCard reservation={reservation} showActions type="upcoming" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">Aucune réservation à venir</Typography>
      )}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4, marginBottom: 2, color: '#3f51b5' }}>
        Passées :
      </Typography>
      <Grid container spacing={2}>
        {pastReservations.map(reservation => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={reservation.id}>
            <ReservationCard reservation={reservation} type="past" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Reservations;
