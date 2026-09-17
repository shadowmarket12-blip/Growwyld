"use client";

import React from "react";
import "./ContactUsForm.css";

const ContactUsForm = () => {
  return (
    <div className="contact-form-container">
      <form className="contact-form">
        {/* Name Input */}
        <div className="input-wrapper">
          <input
            className="input-focus"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="input-wrapper">
          <input
            className="input-focus"
            type="email"
            placeholder="Email Address"
            required
          />
        </div>

        {/* Company Input */}
        <div className="input-wrapper">
          <input
            className="input-focus"
            type="text"
            placeholder="Company Name"
          />
        </div>

        {/* Service Select */}
        <div className="input-wrapper">
          <select className="input-focus select-input" defaultValue="" required>
            <option value="" disabled>
              Select Service
            </option>
            <option value="consulting">Consulting</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="support">Support</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div className="input-wrapper">
          <textarea
            className="input-focus textarea-input"
            placeholder="Tell us about your project..."
            required
          />
        </div>

        {/* Stars Background */}
        <div className="stars-background">
          <span className="star star-1">
            <span className="star-trail" />
          </span>
          <span className="star star-2">
            <span className="star-trail" />
          </span>
          <span className="star star-3">
            <span className="star-trail" />
          </span>
          <span className="star star-4">
            <span className="star-trail" />
          </span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          <span className="button-text">Send Message</span>
          <span className="shine-effect" />
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
