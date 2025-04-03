"use client";

import React, { useContext, useState } from "react";
import { TicketContext } from "@/contexts/TicketContext";

import { BiPlus, BiMinus } from "react-icons/bi";
import { HiTicket } from "react-icons/hi2";

const BuyTicket = ({ event }) => {
  const { buyNow, itemAmount, totalPrice, increaseAmount, decreaseAmount } =
    useContext(TicketContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = () => {
    if (!event) return;
    setIsLoading(true);
    buyNow(event);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-4">
      {/* Increase, amount, decrease */}
      <div className="w-[200px] md:w-[300px] flex items-center justify-between bg-secondary p-2 rounded-full">
        {/* Decrease */}
        <button
          onClick={decreaseAmount}
          className="cursor-pointer bg-accent w-[48px] h-[48px] flex items-center justify-center select-none rounded-full"
          disabled={itemAmount <= 1}
        >
          <BiMinus className="text-lg" />
        </button>
        {/* Amount */}
        <div className="font-semibold">{itemAmount}</div>
        {/* Increase */}
        <button
          onClick={increaseAmount}
          className="cursor-pointer bg-accent w-[48px] h-[48px] flex items-center justify-center select-none rounded-full"
        >
          <BiPlus className="text-lg" />
        </button>
      </div>

      {/* Buy Now button */}
      <button
        onClick={handleBuyNow}
        className="bg-accent hover:bg-accent-hover transition-all p-4 rounded-full w-full mt-4"
        disabled={isLoading}
      >
        <div className="flex items-center justify-between">
          {isLoading ? (
            <div className="animate-pulse">Processing...</div>
          ) : (
            <div className="flex items-center gap-4">
              <HiTicket className="text-2xl" />
              <div>{`${itemAmount} x ticket - $${totalPrice}`}</div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default BuyTicket;
