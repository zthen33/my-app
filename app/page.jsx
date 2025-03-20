"use client";

import EventList from "@/components/Events/EventList";
import Searchbar from "@/components/Searchbar/Searchbar";
import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);
  console.log(showEventList);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
      <Searchbar />
      {/* clear search */}
      <button className="text-accent" onClick={() => handleClearSearch()}>clear search</button>
      </div>
      {showEventList ? (
        <div className="container mx-auto">
          <EventList />
        </div>
      ) : (
        <div>
          <div className="container mx-auto">
          {/* upcoming events slider */}
          <div>upcoming events slider</div>
          {/* download app section */}
          <div>download app section</div>
          {/* recommended events slider */}
          <div>recommended events slider</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
