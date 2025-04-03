"use client";

import React, { createContext, useState, useEffect } from "react";

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  const [seat, setSeat] = useState({ seat: null, price: 0 });

  const [showMenu, setShowMenu] = useState(false);
  const [itemAmount, setItemAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutData, setCheckoutData] = useState(null);

  const initializeEvent = (fetchEvent) => {
    if (!fetchEvent) return;
    setEvent(fetchEvent);
    setItemAmount(1);

    const frontSeat = fetchEvent?.seats?.find(
      (seat) => seat.seat === "frontseat"
    );
    if (frontSeat) {
      setSeat({ seat: frontSeat.seat, price: frontSeat.price });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-select")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTotalPrice(itemAmount * seat.price);
  }, [seat.price, itemAmount]);

  const handleSeat = (seat, price) => {
    setSeat({ seat, price });
    setShowMenu(false);
  };

  const buyNow = (event) => {
    if (!event) return;
    setCheckoutData({
      eventId: event.id,
      eventName: event.title,
      ticketType: seat.seat,
      ticketPrice: seat.price,
      amount: itemAmount,
      totalPrice,
    });

    setCheckoutData(ticketData);
  };

  const increaseAmount = () => setItemAmount((prev) => prev + 1);
  const decreaseAmount = () =>
    setItemAmount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <TicketContext.Provider
      value={{
        event,
        seat,
        showMenu,
        itemAmount,
        totalPrice,
        checkoutData,
        handleSeat,
        setSeat,
        setShowMenu,
        buyNow,
        initializeEvent,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
