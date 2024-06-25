import * as React from "react";
import LocationDetail from "../Components/AdminComponent/locationDetail";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import AddReservationModal from "../Components/Modal/AddReservationModal";
import {DATE_FORMAT, EventItem, Resource, SchedulerData, ViewType} from "react-big-schedule";
import dayjs from "dayjs";
import * as dayjsLocale from 'dayjs/locale/fr';

export default function HomePage({reservation, setReservation, resources, site, place, compagnies}: {
    reservation: EventItem[],
    setReservation: React.SetStateAction<any>,
    resources: Resource[],
    place: { id: string; name: string; buildingId: string; }[],
    site: { id: string; name: string; address: string; city: string; companyId: string; }[],
    compagnies: {compagnyId: number, compagnyName: string}[]
}) {
    const [open, setOpen] = React.useState(false);
    const [companySelected, setCompanySelected] = React.useState<string>(compagnies[0].compagnyName)

    const schedulerData = new SchedulerData(dayjs().format(DATE_FORMAT), ViewType.Week, false, false, {
        addMorePopoverHeaderFormat: 'D MMM, YYYY dddd',
        eventItemPopoverDateFormat: 'D MMM',
        nonAgendaDayCellHeaderFormat: 'HH',
        nonAgendaOtherCellHeaderFormat: 'ddd D/M',
        resourceName: 'Site',
        views: [
            {viewName: 'Jour', viewType: ViewType.Day, showAgenda: false, isEventPerspective: false},
            {viewName: 'Semaine', viewType: ViewType.Week, showAgenda: false, isEventPerspective: false},
            {viewName: 'Mois', viewType: ViewType.Month, showAgenda: false, isEventPerspective: false},
        ],
    });
    schedulerData.config.dragAndDropEnabled = false
    schedulerData.setSchedulerLocale(dayjsLocale);
    schedulerData.setCalendarPopoverLocale('fr-FR');

    schedulerData.setResources(resources);

    schedulerData.setEvents(reservation);
    const [viewModel, setViewModel] = React.useState(schedulerData)

    const reloadScheduler = () => {
        viewModel.setEvents(reservation);
        setViewModel(viewModel)
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const {name, value} = event.target;
        setCompanySelected(value)
    }

    const handleAddReservation = (newReservation: any) => {
        console.log(newReservation)
        let id = Number(reservation[reservation.length - 1].id) + 1
        let newRes = {
            id: id,
            start: newReservation.startDate.format("YYYY-MM-DD").toString() + ' ' + newReservation.startTime.format("HH:mm:ss").toString(),
            end: newReservation.endDate.format("YYYY-MM-DD").toString() + ' ' + newReservation.endTime.format("HH:mm:ss").toString(),
            // @ts-ignore
            resourceId: place.find(p => p.name === newReservation.place).id,
            title: "reservé " + newReservation.startTime.format("H").toString() + 'h' + newReservation.startTime.format("mm").toString() + '-' + newReservation.endTime.format("H").toString() + 'h' + newReservation.endTime.format("mm").toString(),
            bgColor: '#2057a5',
            userId: 1,
        }
        reservation.push(newRes)
        setReservation(reservation)
        reloadScheduler()
        handleClose();
    };

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <br/>
                <h3>Bonjour Kevin !!</h3>
                <h5>Réservez votre place de parking préféré</h5>
            </div>
            <div style={{display: "flex"}}>
            <div style={{display: "flex", justifyContent: "flex-start", width: "50%"}}>
                <FormControl margin="dense"  sx={{width: "25%", marginLeft: "3%", marginBottom: "3%"}}>
                    <InputLabel>Société</InputLabel>
                    <Select
                        name="company"
                        value={companySelected}
                        onChange={handleSelectChange}
                    >
                        {compagnies.map((company) => (
                            <MenuItem key={company.compagnyId} value={company.compagnyName}>
                                {company.compagnyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end", width: '50%'}}>
                <Button variant="contained" onClick={handleOpen} sx={{marginRight: "3%", marginBottom: '3%'}}>Réserver une place</Button>
            </div>
            </div>
            <LocationDetail reservation={reservation} resources={resources} viewModel={viewModel} setViewModel={setViewModel} reloadScheduler={reloadScheduler}/>
            <AddReservationModal
                open={open}
                onClose={handleClose}
                onAdd={handleAddReservation}
                companies={compagnies.map(function(a){
                    return a.compagnyName
                })}
                buildings={site.map(function (a) {
                    return a.name
                })}
                places={place.map(function (a) {
                    return a.name
                })}
            />
        </div>
    );
}
