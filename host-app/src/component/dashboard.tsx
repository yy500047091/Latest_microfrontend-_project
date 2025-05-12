// host-app/src/pages/Dashboard.tsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

const RemoteApp = lazy(() => import("remoteComponents/App"));

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>();
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongAlbum, setNewSongAlbum] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);

  const handleAddSongSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("New Song Details:", {
      title: newSongTitle,
      artist: newSongArtist,
      album: newSongAlbum,
    });
    setIsAddingSong(false);
    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongAlbum("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#b3b3b3",
        backgroundImage: `url('/technology-7086601_1280.jpg')`,
        backgroundSize: "cover", // Make the image cover the entire container
        backgroundPosition: "center", // Center the image
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" component="h1" color="primary">
          Welcome to Music Library
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {userRole === "admin" && !isAddingSong && (
          <Box sx={{ mb: 2 }}>
            <button
              onClick={() => setIsAddingSong(true)}
              style={{
                padding: "10px",
                backgroundColor: "#1db954",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add Song
            </button>
          </Box>
        )}

        {userRole === "admin" && isAddingSong && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              border: "1px solid #282828",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" color="inherit" mb={1}>
              Add New Song
            </Typography>
            <form onSubmit={handleAddSongSubmit}>
              <Box sx={{ mb: 1 }}>
                <label
                  htmlFor="title"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    backgroundColor: "#282828",
                    color: "#b3b3b3",
                  }}
                  required
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <label
                  htmlFor="artist"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Artist:
                </label>
                <input
                  type="text"
                  id="artist"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    backgroundColor: "#282828",
                    color: "#b3b3b3",
                  }}
                  required
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <label
                  htmlFor="album"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Album:
                </label>
                <input
                  type="text"
                  id="album"
                  value={newSongAlbum}
                  onChange={(e) => setNewSongAlbum(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    backgroundColor: "#282828",
                    color: "#b3b3b3",
                  }}
                  required
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1db954",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingSong(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </Box>
            </form>
          </Box>
        )}

        <Suspense
          fallback={
            <Typography color="inherit">Loading Music Player...</Typography>
          }
        >
          {userRole === "admin" ? (
            <RemoteApp />
          ) : (
            <Typography
              variant="h6"
              component="p"
              sx={{ textAlign: "center", color: "#777" }}
            >
              SELECT THE SONG
            </Typography>
          )}
        </Suspense>
      </Box>

      {/* Bottom Player Bar (Placeholder) */}
      <Box sx={{ p: 2, bgcolor: "#282828", textAlign: "center" }}>
        <Typography color="inherit" variant="subtitle2">
          Now Playing: [Song Title] - [Artist]
        </Typography>
        {/* You can add actual player controls and info here later */}
      </Box>
    </div>
  );
};

export default Dashboard;
