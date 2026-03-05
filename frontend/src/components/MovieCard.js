// components/MovieCard.js
import React from "react";
import StarRating from "./StarRating";
import GenreBadge from "./GenreBadge";

const MovieCard = ({ movie, isWatchlisted, rating, onRate, onWatchlist, isRecommended }) => (
  <div style={{
    background: isRecommended ? "linear-gradient(135deg, #1a1508 0%, #1f1a0a 100%)" : "linear-gradient(135deg, #0f0f0f 0%, #141414 100%)",
    border: isRecommended ? "1px solid #f5c51855" : "1px solid #222",
    borderRadius: 10,
    padding: "16px 18px",
    position: "relative",
    transition: "border-color 0.2s, transform 0.2s",
  }}>
    {isRecommended && (
      <div style={{
        position: "absolute", top: -10, right: 14,
        background: "#f5c518", color: "#000",
        fontSize: 10, fontWeight: 800,
        padding: "3px 8px", borderRadius: 4,
      }}>✦ Recommended</div>
    )}
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: "#f0ede8", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {movie.title}
        </div>
        <div style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>
          {movie.year} · {movie.director}
        </div>
        <GenreBadge genre={movie.genre} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <button
          onClick={() => onWatchlist(movie.id)}
          style={{
            background: isWatchlisted ? "#f5c51820" : "transparent",
            border: `1px solid ${isWatchlisted ? "#f5c518" : "#333"}`,
            color: isWatchlisted ? "#f5c518" : "#555",
            borderRadius: 6,
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {isWatchlisted ? "🔖" : "＋"}
        </button>
      </div>
    </div>
    <div style={{ marginTop: 12 }}>
      <StarRating rating={rating || 0} onRate={(r) => onRate(movie.id, r)} size={18} />
    </div>
  </div>
);

export default MovieCard;