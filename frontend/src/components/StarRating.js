// components/StarRating.js
import React from "react";

const StarRating = ({ rating, onRate, size = 20 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        onClick={() => onRate && onRate(s)}
        style={{
          fontSize: size,
          cursor: onRate ? "pointer" : "default",
          color: s <= rating ? "#f5c518" : "#333",
          transition: "color 0.15s, transform 0.1s",
          display: "inline-block",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => onRate && (e.target.style.transform = "scale(1.25)")}
        onMouseLeave={(e) => onRate && (e.target.style.transform = "scale(1)")}
      >
        ★
      </span>
    ))}
  </div>
);

export default StarRating;