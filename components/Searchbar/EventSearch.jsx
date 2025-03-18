import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { EventContext } from "@/contexts/EventContext";

import { BiSearch } from "react-icons/bi"

const EventSearch = () => {
  const { searchTerm, setSearchTerm } = useContext(EventContext);
  console.log(searchTerm);
  return (
    <div className="flex items-center gap-[10px] w-full xl:w-[190px]">
      <div className="text-lg text-accent">
        <BiSearch />
      </div>
      <Input
        value={searchTerm}
        type="text"
        placeholder="Event name or artist"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-0 bg-transparent border-0 focus-visible:ring-0
        focus-visible:rin-offset-0"
      />
    </div>
  );
};

export default EventSearch;
