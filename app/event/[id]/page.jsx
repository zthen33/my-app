import React from "react";

const EventDetails = async ({ params }) => {
  const { id } = await params;
  console.log(id);

  //fecth event based on the id
  const fetchEvent = async (id) => {
    const res = await fetch(`http://localhost:4000/events/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event");
    return res.json();
  };

  const event = await fetchEvent(id);
  console.log(event);

  return (
    <section className="min-h-screen flex items-center py-8 sm:py-48">
      <div className="container mx-auto">
        <div className="w-full max-w-[600px] xl:max-w-none mx-auto">
          {/* event details 1 */}
          <div className="bg-yellow-50/10">
            {/* image */}
            <div>image</div>
            {/* info */}
            <div>info</div>
          </div>
          {/* event details 2 */}
          <div className="bg-green-50">event details 2</div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
