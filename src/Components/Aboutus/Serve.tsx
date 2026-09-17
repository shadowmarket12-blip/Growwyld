"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface Plan {
  id: number;
  title: string;
  price: string;
  accentColor: string;
  features: {
    text: string;
    included: boolean;
  }[];
}

const Serve = () => {
  const plans: Plan[] = [
    {
      id: 1,
      title: "Healthcare & Medical",
      price: "Custom",
      accentColor: "#fa0038",
      features: [
        { text: "Hospitals", included: true },
        { text: "Clinics", included: true },
        { text: "Diagnostic Centers", included: true },
        { text: "Dental Clinics", included: true },
        { text: "Telemedicine Platforms", included: true },
        { text: "Pharmacies", included: true },
        { text: "Healthcare Startups", included: true },
        { text: "Medical Equipment Companies", included: true },
      ],
    },
    {
      id: 2,
      title: "Education",
      price: "Custom",
      accentColor: "#164fa9",
      features: [
        { text: "Schools", included: true },
        { text: "Colleges", included: true },
        { text: "Universities", included: true },
        { text: "Coaching Institutes", included: true },
        { text: "EdTech Companies", included: true },
        { text: "Online Learning Platforms", included: true },
        { text: "Training Centers", included: true },
      ],
    },
    {
      id: 3,
      title: "Real Estate & Construction",
      price: "Custom",
      accentColor: "#1a9b8b",
      features: [
        { text: "Real Estate Agencies", included: true },
        { text: "Property Developers", included: true },
        { text: "Builders", included: true },
        { text: "Construction Companies", included: true },
        { text: "Interior Design Firms", included: true },
        { text: "Architecture Firms", included: true },
      ],
    },
    {
      id: 4,
      title: "E-Commerce & Retail",
      price: "Custom",
      accentColor: "#ff6b35",
      features: [
        { text: "Online Stores", included: true },
        { text: "Retail Chains", included: true },
        { text: "Supermarkets", included: true },
        { text: "Fashion Brands", included: true },
        { text: "Electronics Stores", included: true },
        { text: "D2C Brands", included: true },
        { text: "Marketplaces", included: true },
      ],
    },
    {
      id: 5,
      title: "Travel & Hospitality",
      price: "Custom",
      accentColor: "#7c3aed",
      features: [
        { text: "Hotels", included: true },
        { text: "Resorts", included: true },
        { text: "Travel Agencies", included: true },
        { text: "Tour Operators", included: true },
        { text: "Homestays", included: true },
        { text: "Airlines", included: true },
        { text: "Car Rental Companies", included: true },
      ],
    },
    {
      id: 6,
      title: "Automotive",
      price: "Custom",
      accentColor: "#059669",
      features: [
        { text: "Car Dealerships", included: true },
        { text: "Bike Dealerships", included: true },
        { text: "Auto Parts Manufacturers", included: true },
        { text: "EV Companies", included: true },
        { text: "Vehicle Rental Businesses", included: true },
      ],
    },
    {
      id: 7,
      title: "Manufacturing",
      price: "Custom",
      accentColor: "#ea580c",
      features: [
        { text: "Industrial Manufacturers", included: true },
        { text: "Machinery Manufacturers", included: true },
        { text: "Textile Manufacturers", included: true },
        { text: "Chemical Manufacturers", included: true },
        { text: "FMCG Manufacturers", included: true },
      ],
    },
    {
      id: 8,
      title: "Logistics & Transportation",
      price: "Custom",
      accentColor: "#0891b2",
      features: [
        { text: "Courier Services", included: true },
        { text: "Logistics Companies", included: true },
        { text: "Fleet Management Companies", included: true },
        { text: "Warehousing Businesses", included: true },
        { text: "Shipping Companies", included: true },
      ],
    },
    {
      id: 9,
      title: "Food & Beverage",
      price: "Custom",
      accentColor: "#dc2626",
      features: [
        { text: "Restaurants", included: true },
        { text: "Cafes", included: true },
        { text: "Bakeries", included: true },
        { text: "Cloud Kitchens", included: true },
        { text: "Food Delivery Businesses", included: true },
        { text: "Food Manufacturers", included: true },
      ],
    },
    {
      id: 10,
      title: "Information Technology",
      price: "Custom",
      accentColor: "#2563eb",
      features: [
        { text: "Software Companies", included: true },
        { text: "SaaS Startups", included: true },
        { text: "IT Service Providers", included: true },
        { text: "Technology Consultants", included: true },
      ],
    },
    {
      id: 11,
      title: "Legal Services",
      price: "Custom",
      accentColor: "#9333ea",
      features: [
        { text: "Law Firms", included: true },
        { text: "Legal Consultants", included: true },
        { text: "Corporate Legal Advisors", included: true },
      ],
    },
    {
      id: 12,
      title: "Human Resources",
      price: "Custom",
      accentColor: "#0d9488",
      features: [
        { text: "Recruitment Agencies", included: true },
        { text: "Staffing Companies", included: true },
        { text: "HR Consultancies", included: true },
      ],
    },
    {
      id: 13,
      title: "Media & Entertainment",
      price: "Custom",
      accentColor: "#f59e0b",
      features: [
        { text: "Production Houses", included: true },
        { text: "News Portals", included: true },
        { text: "OTT Platforms", included: true },
        { text: "Event Management Companies", included: true },
        { text: "Influencers & Creators", included: true },
      ],
    },
    {
      id: 14,
      title: "Sports & Fitness",
      price: "Custom",
      accentColor: "#10b981",
      features: [
        { text: "Gyms", included: true },
        { text: "Fitness Centers", included: true },
        { text: "Sports Academies", included: true },
        { text: "Yoga Centers", included: true },
        { text: "Wellness Studios", included: true },
      ],
    },
    {
      id: 15,
      title: "Beauty & Wellness",
      price: "Custom",
      accentColor: "#6366f1",
      features: [
        { text: "Salons", included: true },
        { text: "Spas", included: true },
        { text: "Cosmetic Clinics", included: true },
        { text: "Wellness Centers", included: true },
      ],
    },
    {
      id: 16,
      title: "Agriculture",
      price: "Custom",
      accentColor: "#ef4444",
      features: [
        { text: "AgriTech Companies", included: true },
        { text: "Farms", included: true },
        { text: "Dairy Businesses", included: true },
        { text: "Food Processing Units", included: true },
      ],
    },
    {
      id: 17,
      title: "Energy & Utilities",
      price: "Custom",
      accentColor: "#14b8a6",
      features: [
        { text: "Solar Companies", included: true },
        { text: "Renewable Energy Companies", included: true },
        { text: "Power Distribution Companies", included: true },
        { text: "Utility Providers", included: true },
      ],
    },
    {
      id: 18,
      title: "NGOs & Nonprofits",
      price: "Custom",
      accentColor: "#8b5cf6",
      features: [
        { text: "Charitable Organizations", included: true },
        { text: "Foundations", included: true },
        { text: "Nonprofit Institutions", included: true },
      ],
    },
    {
      id: 19,
      title: "Professional Services",
      price: "Custom",
      accentColor: "#f97316",
      features: [
        { text: "Chartered Accountants", included: true },
        { text: "Business Consultants", included: true },
        { text: "Marketing Agencies", included: true },
        { text: "Event Agencies", included: true },
      ],
    },
    {
      id: 20,
      title: "Security & Surveillance",
      price: "Custom",
      accentColor: "#06b6d4",
      features: [
        { text: "Security Agencies", included: true },
        { text: "CCTV Providers", included: true },
        { text: "Access Control Companies", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen  text-[#1e1e1e] px-4 py-10 sm:py-16">
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 sm:mb-14">
        Industries We Serve
      </h1>

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-full py-8 grid gap-2 rounded-tl-[5rem] rounded-br-[5rem] shadow-lg relative bg-white"
            style={{
              boxShadow: "0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Title */}
            <div
              className="text-xl sm:text-2xl font-bold text-center px-4"
              style={{ color: plan.accentColor }}
            >
              {plan.title}
            </div>

            {/* Price */}
            <div
              className="justify-self-end mr-[-1.5rem] py-1 px-6 text-white relative text-sm"
              style={{ backgroundColor: plan.accentColor }}
            >
              {plan.price}
              <span
                className="absolute right-0 top-full h-6 w-6"
                style={{
                  backgroundColor: plan.accentColor,
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
            </div>

            {/* Features */}
            <ul className="list-none px-6 sm:px-8 grid self-start">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className={`py-1.5 grid gap-3 items-center ${
                    index !== 0 ? "border-t border-gray-200" : ""
                  }`}
                  style={{ gridTemplateColumns: "1rem 1fr" }}
                >
                  {feature.included ? (
                    <Check className="w-3.5 h-3.5 text-green-600 font-bold" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-red-600 font-bold" />
                  )}
                  <span className="text-xs sm:text-sm leading-tight">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className="justify-self-start ml-[-1.5rem] py-2 px-8 text-white text-sm sm:text-base font-semibold relative cursor-pointer transition-all duration-100 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: plan.accentColor,
                backgroundImage:
                  "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 0)",
                backgroundSize: "100% 200%",
                transition: "background-position 100ms ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundPosition =
                  "0 100%";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundPosition =
                  "0 0%";
              }}
            >
              Get Custom Pricing
              <span
                className="absolute left-0 bottom-full h-6 w-6"
                style={{
                  backgroundColor: plan.accentColor,
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Serve;
