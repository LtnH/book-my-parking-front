import React from 'react';
import { Container, Typography, Card, CardContent, Button, Grid, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, isToday, isAfter } from 'date-fns';
import { EventItem, Resource } from "react-big-schedule";

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
  reservation: EventItem;
  resources: Resource[],
  showActions?: boolean;
  site: {
    id: string;
    name: string;
    address: string;
    city: string;
    companyId: string
  }[];
  type: 'today' | 'upcoming' | 'past';
}

const ReservationCard: React.FC<ReservationCardProps> = ({
                                                           reservation,
                                                           resources,
                                                           site,
                                                           showActions = false,
                                                           type
                                                         }) => {
  const theme = useTheme();
  const useResource: Resource = resources.find(p => p.id === reservation.resourceId) as Resource;
  // @ts-ignore
  const useSite: {
    id: string;
    name: string;
    address: string;
    city: string;
    companyId: string
  } = site.find(p => p.id === useResource.parentId)

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

  // @ts-ignore
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
        <Typography variant="h6">{useResource.name}</Typography>
        <Typography variant="body1">{useSite.address} </Typography>
        <Typography variant="body2">site : {useSite.name}</Typography>
        <Typography variant="body2">Date de début : {format(new Date(reservation.start), 'dd/MM/yyyy')}</Typography>
        <Typography variant="body2">Date de fin : {format(new Date(reservation.end), 'dd/MM/yyyy')}</Typography>
        <Typography variant="body2">Heure de début : {format(new Date(reservation.start), 'HH:mm')}</Typography>
        <Typography variant="body2">Heure de fin : {format(new Date(reservation.end), 'HH:mm')}</Typography>
        {showActions && (
          <div style={{ marginTop: 16 }}>
            <Button variant="text" startIcon={<EditIcon/>} sx={{ marginRight: 1 }}>
            </Button>
            <Button variant="text" color="error" startIcon={<DeleteIcon/>}>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function Reservations({ reservations, user, site, resources }: {
  reservations: EventItem[], user: { userId: number; isAdmin: boolean } | null, site: {
    id: string;
    name: string;
    address: string;
    city: string;
    companyId: string
  }[],
  resources: Resource[],
}) {
  console.log(user)

  const today = new Date();
  // @ts-ignore
  const reservation = reservations.filter(p => p.userId === user.userId) as EventItem[]

  let todayReservations: EventItem[] = [];
  let upcomingReservations: EventItem[] = [];
  let pastReservations: EventItem[] = [];

  console.log(reservation)
  if (reservation.length > 0) {
    todayReservations = reservation.filter(r => isToday(new Date(r.start)));
    upcomingReservations = reservation.filter(r => isAfter(new Date(r.start), today) && !isToday(new Date(r.start)));
    pastReservations = reservation.filter(r => !isAfter(new Date(r.start), today));
  }
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
                <ReservationCard reservation={reservation} resources={resources} site={site} showActions type="today"/>
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
              <ReservationCard reservation={reservation} resources={resources} site={site} showActions type="upcoming"/>
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
        {reservation.length >0 && (pastReservations.map(reservation => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={reservation.id}>
            <ReservationCard reservation={reservation} resources={resources} site={site} type="past"/>
          </Grid>
        )))}
      </Grid>
    </Container>
  );
};

export default Reservations;
