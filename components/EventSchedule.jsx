"use client";
import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import { BiCalendar, BiMap } from "react-icons/bi";

const EventSchedule = ({ event }) => {
  const { formatDate } = useContext(EventContext);
  const dbDate = event.date;
  const formatedDate = formatDate(dbDate);
  return (
    <div className="flex flex-col xl:flex-row gap-4 items-start justify-between mb-8 xl:mb-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <BiCalendar className="text-2xl text-accent" />
          <div>{formatedDate}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>•</div>
          <p>{event.hour}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <BiMap className="text-2xl text-accent" />
        <p>{event.location}</p>
      </div>
    </div>
  );
};

export default EventSchedule;
