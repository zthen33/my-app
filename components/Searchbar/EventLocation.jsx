import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";

import {
  Select,
  SelectContext,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";

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

          //include events happending today but only if the time has not yet passed
          if (eventDate.toDateString() == currentDate.toDateString()) {
            const eventTime = eventDate.getTime(); //get events time in miliseconds
            const currentTime = currentDate.getTime(); // get current time in miliseconds
            return eventTime > currentTime; // include event if it's still upcoming today
          }

          // exlude post events
          return false;
        })
        .map((event) => event.location) // select the location of the each event
    ),
  ];

  return (
    <div>
      <Select
        value={selectedLocation}
        onValueChange={(value) => setSelectedLocation(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Event location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Location</SelectLabel>
            {uniqueLocation.map((location, index) => {
              return (
                <SelectItem
                  value={location === "All locations" ? null : location}
                  key={index}
                >
                  {location}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventLocation;
