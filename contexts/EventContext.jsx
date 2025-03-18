"use client";

import clsx from "clsx";
import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  //applied filter

  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
  });

  // filtered events based on the applied filter

  const filteredEvents = useMemo(
    () => {
      return events.filter((event) => {
        // Check search term
        const matchesSearch = appliedFilters.searchTerm
          ? event.title
              .toLowerCase()
              .includes(appliedFilters.searchTerm.toLowerCase())
          : true;

        return matchesSearch;
      });
    },
    [events, appliedFilters] // Dependency array as an array
  );
  console.log(filteredEvents);

  //fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      // Start loader
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/events");
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        setEvents(data); // Set the events data if the fetch is successful
      } catch (err) {
        setError(err.message); // Set the error if fetch fails
      } finally {
        // Stop loader in all cases
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    setAppliedFilters({ searchTerm });
    setTimeout(() => {
      setIsLoading(false)
    }, 7500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        filteredEvents,
        handleSubmit,
        handleClearSearch,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
