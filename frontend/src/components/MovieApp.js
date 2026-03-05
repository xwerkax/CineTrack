import React, { useState, useMemo } from "react";
import { MOVIES, GENRES } from "../data/movies";
import MovieCard from "./MovieCard";
import Toast from "./Toast";

export default function MovieApp() {
  const [tab, setTab] = useState("browse");
  const [userRatings, setUserRatings] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [filterGenre, setFilterGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [toast, setToast] = useState(null);

  // ── TOAST ──
  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ── HANDLERS ──
  const handleRate = (movieId, rating) => {
    const prev = userRatings[movieId];
    if (prev === rating) {
      const updated = { ...userRatings };
      delete updated[movieId];
      setUserRatings(updated);
      showToast("Rating removed.", "neutral");
    } else {
      setUserRatings((r) => ({ ...r, [movieId]: rating }));
      const title = MOVIES.find((m) => m.id === movieId)?.title;
      showToast(`Rated "${title}" ${rating}★`, "success");
    }
  };

  const handleWatchlist = (movieId) => {
    const inList = watchlist.includes(movieId);
    const title = MOVIES.find((m) => m.id === movieId)?.title;
    if (inList) {
      setWatchlist((w) => w.filter((id) => id !== movieId));
      showToast(`Removed "${title}" from watchlist.`, "neutral");
    } else {
      setWatchlist((w) => [...w, movieId]);
      showToast(`Added "${title}" to watchlist.`, "success");
    }
  };

  const getRecommendation = () => {
    if (!Object.keys(userRatings).length) {
      showToast("Rate a movie first to get recommendations.", "error");
      return;
    }
    const topId = Object.entries(userRatings).sort((a, b) => b[1] - a[1])[0][0];
    const topGenre = MOVIES.find((m) => m.id === topId)?.genre;
    const pool = MOVIES.filter((m) => m.genre === topGenre && !userRatings[m.id]);
    if (!pool.length) {
      showToast("No new recommendations in your top genre.", "error");
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setRecommendation(pick.id);
    setTab("browse");
    setFilterGenre(topGenre);
    setSearch("");
    showToast(`Recommendation ready: "${pick.title}"`, "success");
  };

  // ── FILTERED MOVIES ──
  const filteredMovies = useMemo(() => {
    return MOVIES.filter((m) => {
      const matchGenre = filterGenre === "All" || m.genre === filterGenre;
      const matchSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.director.toLowerCase().includes(search.toLowerCase());
      return matchGenre && matchSearch;
    });
  }, [filterGenre, search]);

  const watchlistMovies = MOVIES.filter((m) => watchlist.includes(m.id));
  const ratedMovies = MOVIES.filter((m) => userRatings[m.id]);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0ede8", fontFamily: "'DM Sans', sans-serif", paddingBottom: 60 }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Toast toast={toast} />

      {/* ── HEADER & TABS ── */}
      <div style={{
        borderBottom: "1px solid #1a1a1a",
        padding: "20px 24px 0",
        position: "sticky", top: 0, zIndex: 10,
        background: "#080808ee", backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", color: "#f5c518", marginBottom: 16 }}>
            🎬 CineTrack
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {[
              { key: "browse", label: "Browse" },
              { key: "watchlist", label: `Watchlist (${watchlist.length})` },
              { key: "rated", label: `Rated (${Object.keys(userRatings).length})` },
              { key: "recommend", label: "Discover" },
            ].map(({ key, label }) => (
              <button
                key={key}
                style={{
                  padding: "10px 18px",
                  border: "none",
                  background: "transparent",
                  color: tab === key ? "#f5c518" : "#555",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: tab === key ? 700 : 400,
                  cursor: "pointer",
                  borderBottom: `2px solid ${tab === key ? "#f5c518" : "transparent"}`,
                  transition: "all 0.15s",
                }}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: "24px 20px", maxWidth: 780, margin: "0 auto" }}>
        {/* ── BROWSE ── */}
        {tab === "browse" && (
          <>
            <input
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 8,
                padding: "10px 14px",
                color: "#f0ede8",
                fontFamily: "inherit",
                fontSize: 13,
                outline: "none",
                transition: "border-color 0.15s",
                width: "100%",
                marginBottom: 14,
              }}
              placeholder="Search by title or director…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {["All", ...GENRES].map((g) => (
                <button
                  key={g}
                  style={{
                    background: filterGenre === g ? "#f5c51820" : "transparent",
                    border: `1px solid ${filterGenre === g ? "#f5c518" : "#222"}`,
                    color: filterGenre === g ? "#f5c518" : "#555",
                    borderRadius: 6,
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "inherit",
                    fontWeight: filterGenre === g ? 700 : 400,
                    transition: "all 0.15s",
                  }}
                  onClick={() => setFilterGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            {filteredMovies.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#333" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎞</div>
                <div>No movies match your search.</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 12 }}>
                {filteredMovies.map((m) => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    isWatchlisted={watchlist.includes(m.id)}
                    rating={userRatings[m.id] || 0}
                    onRate={handleRate}
                    onWatchlist={handleWatchlist}
                    isRecommended={m.id === recommendation}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── WATCHLIST ── */}
        {tab === "watchlist" && (
          <>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#f0ede8", marginBottom: 16 }}>
              My Watchlist
            </div>
            {watchlistMovies.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#333" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔖</div>
                <div>Your watchlist is empty.</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 12 }}>
                {watchlistMovies.map((m) => (
                  <MovieCard
                    key={m.id}
                    movie={m}
                    isWatchlisted={true}
                    rating={userRatings[m.id] || 0}
                    onRate={handleRate}
                    onWatchlist={handleWatchlist}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── RATED ── */}
        {tab === "rated" && (
          <>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#f0ede8", marginBottom: 16 }}>
              My Ratings
            </div>
            {ratedMovies.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#333" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
                <div>You haven't rated any movies yet.</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
                <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 10, padding: "20px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#f5c518" }}>{ratedMovies.length}</div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Movies Rated</div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── DISCOVER ── */}
        {tab === "recommend" && (
          <>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#f0ede8", marginBottom: 16 }}>
              Discover
            </div>
            <button
              style={{
                background: "linear-gradient(135deg, #f5c518, #e0a800)",
                color: "#000",
                border: "none",
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: 24,
              }}
              onClick={getRecommendation}
            >
              ✦ Get Recommendation
            </button>
          </>
        )}
      </div>
    </div>
  );
}