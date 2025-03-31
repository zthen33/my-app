import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { BiMap } from "react-icons/bi";

const EventLocation = () => {
  const { events, selectedLocation, setSelectedLocation } =
    useContext(EventContext);
  //generate a list of unique locations from future events
  const uniqueLocation = [
    "All locations", //default option to display all locations
    //use set to remove duplicate locations
    ...new Set(
      events
        .filter((event) => {
          const eventDate = new Date(event.date); // convert event date to Date object
          const currentDate = new Date(); // get current date

          // include events that occur after the current date
          if (eventDate > currentDate) return true;

          //include events happening today but only if the time has not yet passed
          if (eventDate.toDateString() === currentDate.toDateString()) {
            const eventTime = eventDate.getTime(); //get event time in milliseconds
            const currentTime = currentDate.getTime(); // get current time in milliseconds
            return eventTime > currentTime; // include event if it's still upcoming today
          }

          // exclude past events
          return false;
        })
        .map((event) => event.location) // select the location of each event
    ),
  ];

  return (
    <div
      className="flex items-center gap-[1opx] w-full xl:w-[190px]
    select-none"
    >
      {/* icon */}
      <div className="text-lg text-accent">
        <BiMap />
      </div>
      <Select
        value={selectedLocation ?? "all"}
        onValueChange={(value) =>
          setSelectedLocation(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0">
          <SelectValue placeholder="Event location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Location</SelectLabel>
            {uniqueLocation.map((location, index) => (
              <SelectItem
                value={location === "All locations" ? "all" : location}
                key={index}
              >
                {location}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventLocation;
