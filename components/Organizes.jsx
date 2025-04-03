"use client";
import Image from "next/image";
import Link from "next/link";

const Organizes = ({ event }) => {
  console.log(event);
  return (
    <div className="bg-secondary py-8 px-6 md:px-12 w-full flex flex-col gap-8
    rounded-3xl">
      {/* organizer title */}
      <div>
        <h3 className="h3 mb-4">Organizers</h3>
        <div className="w-[74px] h-[3px] bg-accent rounded-3xl"></div>
      </div>
      {event.organizers.map((organize, index) => {
        return (
          <div key={index} className="flex items-center gap-8 border-b last-of-type:border-none
          border-white/10 py-8">
            <Image src={organize.img_avatar} width={72} height={72} alt="" />
            {/* organizer info */}
            <div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-medium">{organize.name}</h4>
                <p className="text-accent">{organize.job}</p>
                {/* organizer social media */}
                <div className="flex gap-4">
                  {organize.social.map((social, index) => {
                    return (
                      <Link key={index} href={social.path}>
                        <Image
                          src={social.icon}
                          width={20}
                          height={20}
                          alt=""
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Organizes;
