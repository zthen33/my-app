"use client";

import clsx from "clsx";
import React, { createContext, useEffect, useState, useMemo } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventList, setShowEventList] = useState(false);

  // current filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  //applied filter

  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    selectedLocation: "",
    selectedDate: null,
    selectedType,
  });

  // filtered events based on the applied filter

  const filteredEvents = useMemo(() => {
    const today = new Date();
    return events.filter((event) => {
      //check event date (exclude past event)
      const eventDate = new Date(event.date);
      if (eventDate < today) return false;

      // Check search term
      const matchesSearch = appliedFilters.searchTerm
        ? event.title
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase())
        : true;

      // check location
      const matchesLocation = appliedFilters.selectedLocation
        ? event.location.toLowerCase() ===
          appliedFilters.selectedLocation.toLowerCase()
        : true;

      // check date
      const matchesDate = appliedFilters.selectedDate
        ? eventDate.toDateString() ===
          new Date(appliedFilters.selectedDate).toDateString()
        : true;

      // check type
      const matchesType = appliedFilters.selectedType
        ? event.type.toLowerCase() === appliedFilters.selectedType.toLowerCase()
        : true;

      return matchesSearch && matchesLocation && matchesDate && matchesType;
    });
  }, [events, appliedFilters]);

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
    setShowEventList(true);
    setAppliedFilters({
      searchTerm,
      selectedLocation,
      selectedDate,
      selectedType,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowEventList(false);
    setSelectedLocation("");
    setSelectedDate(null);
    setSelectedType("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    //format options
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    // return formatted date
    return date.toLocaleDateString("en-US", options);
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
        showEventList,
        selectedLocation,
        setSelectedLocation,
        selectedDate,
        setSelectedDate,
        selectedType,
        setSelectedType,
        formatDate,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
