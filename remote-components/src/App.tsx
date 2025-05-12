import "./App.css";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import List from "./components/List";
import SongDetails from "./components/SongDetails";
import { dummyTracks, type Track } from "./components/dummydata";


// Mock user role for demonstration purposes
const mockUserRole = "admin"; // Replace with actual role retrieval logic

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(dummyTracks);
  const [selectedSong, setSelectedSong] = useState<Track | null>(null);
  const [filterArtist, setFilterArtist] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAlbum, setFilterAlbum] = useState("");
  const [artists, setArtists] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [albums, setAlbums] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongAlbum, setNewSongAlbum] = useState("");


  const [user, setUser] = useState(String); // State to hold user information

  useEffect(() => {
    // Replace 'userKey' with the actual key you are using
    const storedUser = localStorage.getItem('userRole');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // If the data is stored as JSON
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
        setUser(storedUser); // If it's stored as a string
      }
    }
  }, []);


  useEffect(() => {
    const uniqueArtists = [
      ...new Set(dummyTracks.flatMap((track) => track.artists.map((a) => a.name))),
    ];
    const uniqueTitles = [...new Set(dummyTracks.map((track) => track.name))];
    const uniqueAlbums = [...new Set(dummyTracks.map((track) => track.album.name))];

    setArtists(uniqueArtists);
    setTitles(uniqueTitles);
    setAlbums(uniqueAlbums);
    applyFilters();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleAddSongForm = () => setIsAddingSong(!isAddingSong);

  const handleFilterChange = (newValue: string) => {
    setFilterValue(newValue);
    applyFilters({ generalSearch: newValue });
  };

  const handleSelectSong = (song: Track) => {
    setSelectedSong(song);
  };

  const handleArtistFilterChange = (event: SelectChangeEvent) => {
    setFilterArtist(event.target.value);
  };

  const handleTitleFilterChange = (event: SelectChangeEvent) => {
    setFilterTitle(event.target.value);
  };

  const handleAlbumFilterChange = (event: SelectChangeEvent) => {
    setFilterAlbum(event.target.value);
  };

  const handleApplyFiltersClick = () => {
    applyFilters({
      artist: filterArtist,
      title: filterTitle,
      album: filterAlbum,
    });
  };

  const handleAddNewSong = () => {
    const newSong: Track = {
      id: Date.now().toString(), // Simple unique ID
      name: newSongTitle,
      album: { name: newSongAlbum, images: [{ url: "https://placehold.co/400x400/888/FFF?Text=New+Album" }] },
      artists: [{ name: newSongArtist }],
      duration_ms: 200000, // Default duration
    };
    const updatedTracks = [...filteredTracks, newSong];
    setFilteredTracks(updatedTracks);
    // For a permanent change, you would need to update the dummyTracks as well
    // dummyTracks.push(newSong);
    setIsAddingSong(false);
    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongAlbum("");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/'; // Use window.location.href for a full browser navigation
    console.log('Local storage cleared and attempting navigation to login.');
  };


  const applyFilters = (filters: {
    generalSearch?: string;
    artist?: string;
    title?: string;
    album?: string;
  } = {}) => {
    let filtered = [...dummyTracks]; // Start filtering from the original list

    if (filters.generalSearch) {
      const val = filters.generalSearch.toLowerCase();
      filtered = filtered.filter(
        (track) =>
          track.name.toLowerCase().includes(val) ||
          track.album.name.toLowerCase().includes(val) ||
          track.artists.some((a) => a.name.toLowerCase().includes(val))
      );
    }

    if (filters.artist) {
      filtered = filtered.filter((t) =>
        t.artists.some((a) => a.name === filters.artist)
      );
    }

    if (filters.title) {
      filtered = filtered.filter((t) => t.name === filters.title);
    }

    if (filters.album) {
      filtered = filtered.filter((t) => t.album.name === filters.album);
    }

    setFilteredTracks(filtered);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 240 : 60,
          transition: "width 0.3s",
          bgcolor: "grey.900",
          color: "white",
          p: 2,
          borderRight: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: sidebarOpen ? "flex-start" : "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: "white", alignSelf: sidebarOpen ? "flex-end" : "center" }}
        >
          {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>

        {sidebarOpen && (
          <>
            <Typography variant="h6">Menu</Typography>
            <Typography variant="subtitle1" sx={{ cursor: "pointer" }}>
              Top Songs
            </Typography>
            <Typography variant="subtitle1" sx={{ cursor: "pointer" }}>
              Genres of Songs
            </Typography>
            {user === "admin" && (
              <Typography variant="subtitle1" sx={{ cursor: "pointer" }} onClick={toggleAddSongForm}>
                Add Song
              </Typography>
            )}
            <Typography variant="subtitle1" sx={{ cursor: "pointer"}} onClick={handleLogout}>
              Logout
            </Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Song Details
            </Typography>
            <SongDetails song={selectedSong} />
          </>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            placeholder="Search songs by name, artist, or album"
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
        </Box>

        {isAddingSong && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6">Add New Song</Typography>
            <TextField label="Title" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} fullWidth />
            <TextField label="Artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} fullWidth />
            <TextField label="Album" value={newSongAlbum} onChange={(e) => setNewSongAlbum(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" onClick={handleAddNewSong}>Add Song</Button>
            <Button onClick={toggleAddSongForm}>Cancel</Button>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControl>
            <InputLabel id="artist-filter-label">Filter by Artist</InputLabel>
            <Select
              labelId="artist-filter-label"
              id="artist-filter"
              value={filterArtist}
              label="Filter by Artist"
              onChange={handleArtistFilterChange}
            >
              <MenuItem value="">All Artists</MenuItem>
              {artists.map((artist) => (
                <MenuItem key={artist} value={artist}>
                  {artist}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="title-filter-label">Filter by Title</InputLabel>
            <Select
              labelId="title-filter-label"
              id="title-filter"
              value={filterTitle}
              label="Filter by Title"
              onChange={handleTitleFilterChange}
            >
              <MenuItem value="">All Titles</MenuItem>
              {titles.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="album-filter-label">Filter by Album</InputLabel>
            <Select
              labelId="album-filter-label"
              id="album-filter"
              value={filterAlbum}
              label="Filter by Album"
              onChange={handleAlbumFilterChange}
            >
              <MenuItem value="">All Albums</MenuItem>
              {albums.map((album) => (
                <MenuItem key={album} value={album}>
                  {album}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={handleApplyFiltersClick}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom>
          List of Songs
        </Typography>
        <List items={filteredTracks} onSelect={handleSelectSong} />
      </Box>
    </Box>
  );
}

export default App;