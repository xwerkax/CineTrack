// components/GenreBadge.js
import React from "react";

const GENRE_COLORS = {
  Crime: "#e05252",
  "Sci-Fi": "#5287e0",
  Action: "#e09452",
  Horror: "#9452e0",
  Drama: "#52c4e0",
  Animation: "#52e08a",
  Comedy: "#e0d052",
  Romance: "#e052b0",
};

const GenreBadge = ({ genre }) => (
  <span style={{
    background: (GENRE_COLORS[genre] || "#888") + "22",
    color: GENRE_COLORS[genre] || "#aaa",
    border: `1px solid ${(GENRE_COLORS[genre] || "#888")}55`,
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  }}>
    {genre}
  </span>
);

export default GenreBadge;