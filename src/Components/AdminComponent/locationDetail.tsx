import React from 'react';
// @ts-ignore
import { Scheduler, SchedulerData, ViewType, DATE_FORMAT, EventItem, Resource, } from "react-big-schedule";
import * as dayjsLocale from 'dayjs/locale/fr';
import * as antdLocale from 'antd/locale/fr_FR';
import dayjs from "dayjs";
import "react-big-schedule/dist/css/style.css";

type schedulerData = SchedulerData<EventItem>;
type reloadScheduler = () => void

export default function LocationDetail({ reservation, resources, viewModel, setViewModel, reloadScheduler }: {
  reservation: EventItem[],
  resources: Resource[],
  viewModel: schedulerData,
  setViewModel: React.SetStateAction<any>
  reloadScheduler: reloadScheduler
}) {

  const [, updateState] = React.useState<object>();

  const prevClick = (schedulerData: SchedulerData) => {
    viewModel.prev();
    viewModel.setEvents(reservation);
    setViewModel(viewModel);
    updateState({})
  };

  const toggleExpandFunc = (schedulerData: SchedulerData, slotId: string) => {
    schedulerData.toggleExpandStatus(slotId);
    setViewModel(schedulerData)
    reloadScheduler();
  };

  const nextClick = (schedulerData: SchedulerData) => {
    viewModel.next();
    viewModel.setEvents(reservation);
    setViewModel(viewModel);
    updateState({})
  };

  const onViewChange = (schedulerData: SchedulerData, view: any) => {
    const start = new Date();
    viewModel.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    viewModel.setEvents(reservation);
    setViewModel(viewModel);
    reloadScheduler();
    updateState({})
  };

  const onSelectDate = (schedulerData: SchedulerData, date: any) => {
    viewModel.setDate(date);
    viewModel.setEvents(reservation);
    setViewModel(viewModel);
    updateState({})
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

