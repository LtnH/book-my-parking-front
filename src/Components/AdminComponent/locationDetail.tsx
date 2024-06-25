import * as React from "react";
// @ts-ignore
import {Scheduler, SchedulerData, ViewType, DATE_FORMAT, EventItem, Resource,} from "react-big-schedule";
import * as dayjsLocale from 'dayjs/locale/fr';
import * as antdLocale from 'antd/locale/fr_FR';
import dayjs from "dayjs";
import "react-big-schedule/dist/css/style.css";
import {useState} from "react";

type schedulerData= SchedulerData<EventItem>;


export default function LocationDetail({reservation, resources, viewModel, setViewModel}: { reservation: EventItem[], resources: Resource[], viewModel: schedulerData, setViewModel: React.SetStateAction<any> }) {

    const prevClick = (schedulerData: SchedulerData, view: any) => {
        schedulerData.prev();
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
        schedulerData.setEvents(reservation);
        setViewModel(schedulerData);
    };

    const toggleExpandFunc = (schedulerData: SchedulerData, slotId: string) => {
        schedulerData.toggleExpandStatus(slotId);
        setViewModel(schedulerData)
    };

    const nextClick = (schedulerData: SchedulerData, view: any) => {
        schedulerData.next();
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
        schedulerData.setEvents(reservation);
        setViewModel(schedulerData);
    };

    const onViewChange = (schedulerData: SchedulerData, view: any) => {
        const start = new Date();
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(reservation);
        setViewModel(schedulerData);
    };

    const onSelectDate = (schedulerData: SchedulerData, date: any) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(reservation);
        setViewModel(schedulerData);
    };

    const eventClicked = (schedulerDat: SchedulerData, event: any) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    return (
        <Scheduler
            schedulerData={viewModel}
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onViewChange={onViewChange}
            eventItemClick={eventClicked}
            toggleExpendFunc={toggleExpandFunc}
        />
    )
}

