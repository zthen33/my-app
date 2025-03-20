import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";
import Event from "./Event";
import SkeletonGrid from "../SkeletonGrid";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error: {error}</p>; //error message

  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div className="h-[80vh]">
        <p className="text-white/80 text-center">No events available</p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonGrid itemCount={12} />;
  } else {
    return (
      <div>
        <h4 className="h4 mb-6">{filteredEvents.length} results found</h4>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-32 ">
        {filteredEvents.map((event, index) => {
          return (
            <div key={index}>
              <Event event={event} />
            </div>
          );
        })}
        </div>
      </div>
    );
  }
};

export default EventList;
