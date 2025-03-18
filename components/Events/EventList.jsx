import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";
import Event from "./Event";
import SkeletonGrid from "../SkeletonGrid";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error: {error}</p>; //error message

  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div>
        <p>No events available</p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonGrid />;
  } else {
    return (
      <div>
        {filteredEvents.map((event, index) => {
          return (
            <div key={index}>
              <Event event={event} />
            </div>
          );
        })}
      </div>
    );
  }
};

export default EventList;
