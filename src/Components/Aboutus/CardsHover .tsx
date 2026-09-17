"use client";

import React, { useState } from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaSlack,
  FaReddit,
  FaPinterest,
  FaSnapchat,
  FaTiktok,
  FaTwitch,
  FaDribbble,
  FaBehance,
  FaMedium,
  FaSpotify,
  FaSoundcloud,
} from "react-icons/fa";

interface CardData {
  id: number;
  icon: React.ReactNode;
  link: string;
  username: string;
  description: string;
  iconBg: string;
  hoverBg: string;
}

const CardsHover = () => {
  const cards: CardData[] = [
    {
      id: 1,
      icon: <FaLinkedin className="text-5xl sm:text-6xl" />,
      link: "https://www.linkedin.com/in/adamdipinto/",
      username: "_adamdipinto",
      description:
        "This is where I network and build my professional protfolio.",
      iconBg: "#e07768",
      hoverBg: "#ff0057",
    },
    {
      id: 2,
      icon: <FaTwitter className="text-5xl sm:text-6xl" />,
      link: "https://twitter.com/AdamDipinto",
      username: "@AdamDipinto",
      description:
        "This is where I read news and network with different social groups.",
      iconBg: "#6eadd4",
      hoverBg: "#ff0057",
    },
    {
      id: 3,
      icon: <FaGithub className="text-5xl sm:text-6xl" />,
      link: "https://github.com/atom888",
      username: "atom888",
      description: "This is where I share code and work on projects.",
      iconBg: "#4aada9",
      hoverBg: "#ff0057",
    },
    {
      id: 4,
      icon: <FaFacebook className="text-5xl sm:text-6xl" />,
      link: "https://facebook.com",
      username: "facebook",
      description: "Connect with friends and the world around you on Facebook.",
      iconBg: "#3b5998",
      hoverBg: "#ff0057",
    },
    {
      id: 5,
      icon: <FaInstagram className="text-5xl sm:text-6xl" />,
      link: "https://instagram.com",
      username: "@instagram",
      description: "Share photos and videos with friends and followers.",
      iconBg: "#e4405f",
      hoverBg: "#ff0057",
    },
    {
      id: 6,
      icon: <FaYoutube className="text-5xl sm:text-6xl" />,
      link: "https://youtube.com",
      username: "youtube",
      description: "Watch, upload and share videos with the world.",
      iconBg: "#cd201f",
      hoverBg: "#ff0057",
    },
    {
      id: 7,
      icon: <FaWhatsapp className="text-5xl sm:text-6xl" />,
      link: "https://whatsapp.com",
      username: "whatsapp",
      description: "Simple, reliable messaging and calling for free.",
      iconBg: "#25d366",
      hoverBg: "#ff0057",
    },
    {
      id: 8,
      icon: <FaTelegram className="text-5xl sm:text-6xl" />,
      link: "https://telegram.org",
      username: "telegram",
      description: "Fast and secure messaging app with cloud sync.",
      iconBg: "#0088cc",
      hoverBg: "#ff0057",
    },
    {
      id: 9,
      icon: <FaDiscord className="text-5xl sm:text-6xl" />,
      link: "https://discord.com",
      username: "discord",
      description: "Your place to talk and hang out with communities.",
      iconBg: "#7289da",
      hoverBg: "#ff0057",
    },
    {
      id: 10,
      icon: <FaSlack className="text-5xl sm:text-6xl" />,
      link: "https://slack.com",
      username: "slack",
      description: "Where work happens with team collaboration.",
      iconBg: "#4a154b",
      hoverBg: "#ff0057",
    },
    {
      id: 11,
      icon: <FaReddit className="text-5xl sm:text-6xl" />,
      link: "https://reddit.com",
      username: "reddit",
      description: "The front page of the internet for discussions.",
      iconBg: "#ff4500",
      hoverBg: "#ff0057",
    },
    {
      id: 12,
      icon: <FaPinterest className="text-5xl sm:text-6xl" />,
      link: "https://pinterest.com",
      username: "pinterest",
      description: "Discover recipes, home ideas, style inspiration.",
      iconBg: "#bd081c",
      hoverBg: "#ff0057",
    },
    {
      id: 13,
      icon: <FaSnapchat className="text-5xl sm:text-6xl" />,
      link: "https://snapchat.com",
      username: "snapchat",
      description: "Share moments with friends through snaps.",
      iconBg: "#fffc00",
      hoverBg: "#ff0057",
    },
    {
      id: 14,
      icon: <FaTiktok className="text-5xl sm:text-6xl" />,
      link: "https://tiktok.com",
      username: "tiktok",
      description: "Short-form videos that entertain and inspire.",
      iconBg: "#000000",
      hoverBg: "#ff0057",
    },
    {
      id: 15,
      icon: <FaTwitch className="text-5xl sm:text-6xl" />,
      link: "https://twitch.tv",
      username: "twitch",
      description: "Live streaming platform for gamers and creators.",
      iconBg: "#6441a5",
      hoverBg: "#ff0057",
    },
    {
      id: 16,
      icon: <FaDribbble className="text-5xl sm:text-6xl" />,
      link: "https://dribbble.com",
      username: "dribbble",
      description: "Discover the world's top designers and creatives.",
      iconBg: "#ea4c89",
      hoverBg: "#ff0057",
    },
    {
      id: 17,
      icon: <FaBehance className="text-5xl sm:text-6xl" />,
      link: "https://behance.net",
      username: "behance",
      description: "Showcase and discover creative work.",
      iconBg: "#1769ff",
      hoverBg: "#ff0057",
    },
    {
      id: 18,
      icon: <FaMedium className="text-5xl sm:text-6xl" />,
      link: "https://medium.com",
      username: "medium",
      description: "Where good ideas find you.",
      iconBg: "#000000",
      hoverBg: "#ff0057",
    },
    {
      id: 19,
      icon: <FaSpotify className="text-5xl sm:text-6xl" />,
      link: "https://spotify.com",
      username: "spotify",
      description: "Music for everyone with millions of songs.",
      iconBg: "#1db954",
      hoverBg: "#ff0057",
    },
    {
      id: 20,
      icon: <FaSoundcloud className="text-5xl sm:text-6xl" />,
      link: "https://soundcloud.com",
      username: "soundcloud",
      description: "Listen to music and audio from creators worldwide.",
      iconBg: "#ff3300",
      hoverBg: "#ff0057",
    },
  ];

  const [activeMobileCard, setActiveMobileCard] = useState<number | null>(null);

  const handleMobileClick = (cardId: number) => {
    setActiveMobileCard(activeMobileCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex justify-center items-center font-sans px-4 py-10">
      <div className="w-full max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative rounded-[10px] group w-full max-w-[300px]"
            >
              <div className="relative h-[200px] md:h-[200px]">
                {/* Face 1 - Icon (visible on desktop, hidden on mobile when active) */}
                <div
                  className={`absolute inset-0 flex justify-center items-center z-10 transition-all duration-500 rounded-t-[10px] ${
                    activeMobileCard === card.id
                      ? "translate-y-0 md:group-hover:translate-y-0"
                      : "translate-y-[100px] md:group-hover:translate-y-0"
                  }`}
                  style={{ backgroundColor: card.iconBg }}
                >
                  <span className="text-white transition-all duration-700">
                    {card.icon}
                  </span>
                </div>

                {/* Face 2 - Content (hidden on mobile when not active) */}
                <div
                  className={`absolute inset-0 bg-white flex justify-center items-center px-5 box-border shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 rounded-b-[10px] ${
                    activeMobileCard === card.id
                      ? "translate-y-0 md:group-hover:translate-y-0"
                      : "-translate-y-[100px] md:group-hover:translate-y-0"
                  }`}
                  onClick={() => handleMobileClick(card.id)}
                >
                  <div className="text-center">
                    <h3 className="mb-2.5 text-xl sm:text-2xl text-[#414141] font-bold">
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-[#414141] hover:text-[#ff0057] transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {card.username}
                      </a>
                    </h3>
                    <p className="m-0 p-0 text-center text-[#414141] text-sm sm:text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <p className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-lg">
          Tap card to view details
        </p>
      </div>
    </div>
  );
};

export default CardsHover;
