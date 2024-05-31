import * as React from "react";
// @ts-ignore
import { Scheduler, SchedulerData, ViewType, DATE_FORMAT, EventItem } from "react-big-schedule";
import dayjs from "dayjs";
import "react-big-schedule/dist/css/style.css";
import { useState } from "react";

export default function LocationDetail() {
  let schedulerData: SchedulerData<EventItem>;
  schedulerData = new SchedulerData(dayjs().format(DATE_FORMAT), ViewType.Week);
  schedulerData.config.dragAndDropEnabled = false

  const [viewModel, setViewModel] = useState(schedulerData)

  schedulerData.setSchedulerLocale('fr-fr');
  schedulerData.setCalendarPopoverLocale('fr_FR');

  schedulerData.setResources([
    { id: 'r0', name: 'Resource0', groupOnly: true },
    { id: 'r1', name: 'Resource1' },
    { id: 'r2', name: 'Resource2', parentId: 'r0' },
    { id: 'r3', name: 'Resource3', parentId: 'r4' },
    { id: 'r4', name: 'Resource4', parentId: 'r2' },
  ]);

// the event array should be sorted in ascending order by event.start property
// otherwise there will be some rendering errors
  schedulerData.setEvents([
    {
      id: 1,
      start: '2022-12-18 09:30:00',
      end: '2022-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9',
    },
    {
      id: 2,
      start: '2022-12-18 12:30:00',
      end: '2022-12-26 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false,
    },
    {
      id: 3,
      start: '2022-12-19 12:30:00',
      end: '2022-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false,
    },
    {
      id: 4,
      start: '2022-12-19 14:30:00',
      end: '2022-12-20 23:30:00',
      resourceId: 'r1',
      title: 'I am not start-resizable',
      startResizable: false,
    },
    {
      id: 5,
      start: '2022-12-19 15:30:00',
      end: '2022-12-20 23:30:00',
      resourceId: 'r2',
      title: 'R2 has recurring tasks every week on Tuesday, Friday',
      rrule: 'FREQ=WEEKLY;DTSTART=20221219T013000Z;BYDAY=TU,FR',
      bgColor: '#f759ab',
    },
  ]);

  const prevClick = (schedulerData: SchedulerData) => {
    schedulerData.prev();
    setViewModel(schedulerData);
  };

  const nextClick = (schedulerData: SchedulerData) => {
    schedulerData.next();
    setViewModel(schedulerData);
  };

  const onViewChange = (schedulerData: SchedulerData, view: any) => {
    const start = new Date();
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    setViewModel(schedulerData);
    function secondsBetween(date1: any, date2: any) {
      var diff = Math.abs(date1.getTime() - date2.getTime());
      return diff / 1000;
    }

    console.log('Elapsed seconds: ' + secondsBetween(start, new Date()));
  };

  const onSelectDate = (schedulerData: SchedulerData, date: any) => {
    schedulerData.setDate(date);
    setViewModel(schedulerData);
  };

  const eventClicked = (schedulerDat: SchedulerData,  event: any) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };
// ...

//3. render the scheduler component, mind that the Scheduler component should be placed in a DragDropContext(father or ancestor).
  return (
    <Scheduler
      schedulerData={viewModel}
      prevClick={prevClick}
      nextClick={nextClick}
      onSelectDate={onSelectDate}
      onViewChange={onViewChange}
      eventItemClick={eventClicked}
    />
)
}

