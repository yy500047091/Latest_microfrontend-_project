// remote-components/src/App.jsx
import "./App.css"; 
import { useState, useEffect, useRef } from "react";
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
  Button,
  type SelectChangeEvent, // Ensure SelectChangeEvent is imported
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import List from "./components/List";
import SongDetails from "./components/SongDetails";
import { dummyTracks, type Track } from "./components/dummydata";

// Define an interface for the component's props to provide type safety
interface AppProps {
  userRole: string | null; // userRole can be a string (e.g., "admin", "user", "guest") or null
}

// IMPORTANT: Accept userRole as a prop from the host application and type it
function App({ userRole }: AppProps) { 
  const [filterValue, setFilterValue] = useState("");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(dummyTracks);
  const [selectedSong, setSelectedSong] = useState<Track | null>(null);
  const [filterArtist, setFilterArtist] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAlbum, setFilterAlbum] = useState("");
  const [artists, setArtists] = useState<string[]>([]); // Explicitly type as string[]
  const [titles, setTitles] = useState<string[]>([]);   // Explicitly type as string[]
  const [albums, setAlbums] = useState<string[]>([]);   // Explicitly type as string[]
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongAlbum, setNewSongAlbum] = useState("");

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    // Collect unique artists, titles, and albums from dummyTracks
    const uniqueArtists = [
      ...new Set(dummyTracks.flatMap((track) => track.artists.map((a) => a.name))),
    ];
    const uniqueTitles = [...new Set(dummyTracks.map((track) => track.name))];
    const uniqueAlbums = [...new Set(dummyTracks.map((track) => track.album.name))];

    // Set the state variables with the collected unique values
    setArtists(uniqueArtists);
    setTitles(uniqueTitles);
    setAlbums(uniqueAlbums); // Corrected: use local 'uniqueAlbums' state
    applyFilters();
  }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    // This effect applies filters whenever the filter criteria change
    applyFilters({
      artist: filterArtist,
      title: filterTitle,
      album: filterAlbum,
      generalSearch: filterValue
    });
  }, [filterArtist, filterTitle, filterAlbum, filterValue]); // Dependencies for re-running filters

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleAddSongForm = () => setIsAddingSong(!isAddingSong);

  const handleFilterChange = (newValue: string) => { // Added type for newValue
    setFilterValue(newValue);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      applyFilters({ generalSearch: newValue });
    }, 500); // Debounce delay
  };

  const handleSelectSong = (song: Track) => { // Added type for song
    setSelectedSong(song);
  };

  const handleArtistFilterChange = (event: SelectChangeEvent) => { // Added type for event
    setFilterArtist(event.target.value);
  };

  const handleTitleFilterChange = (event: SelectChangeEvent) => { // Added type for event
    setFilterTitle(event.target.value);
  };

  const handleAlbumFilterChange = (event: SelectChangeEvent) => { // Added type for event
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
    const newSong: Track = { // Explicitly define type for newSong
      id: Date.now().toString(), // Simple unique ID
      name: newSongTitle,
      album: { name: newSongAlbum, images: [{ url: "https://placehold.co/400x400/888/FFF?Text=New+Album" }] },
      artists: [{ name: newSongArtist }],
      duration_ms: 200000, // Default duration
    };
    dummyTracks.push(newSong); // Directly modify dummyTracks for this session
    setFilteredTracks([...dummyTracks]); // Reset filtered tracks to include the new song
    setIsAddingSong(false);
    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongAlbum("");
  };

  // applyFilters function: added types for clarity
  const applyFilters = (filters: { generalSearch?: string; artist?: string; title?: string; album?: string; } = {}) => {
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
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 100px)" }} className="rounded-xl overflow-hidden">
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 240 : 60,
          transition: "width 0.3s",
          bgcolor: "rgba(10, 10, 10, 0.9)", 
          color: "white",
          p: 2,
          borderRight: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: sidebarOpen ? "flex-start" : "center",
          gap: 2,
        }}
        className="shadow-inner"
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: "white", alignSelf: sidebarOpen ? "flex-end" : "center" }}
        >
          {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>

        {sidebarOpen && (
          <>
            <Typography variant="h6" className="text-blue-300 font-bold">Menu</Typography>
            <Typography variant="subtitle1" sx={{ cursor: "pointer" }} className="hover:text-blue-500 transition duration-200">
              Top Songs
            </Typography>
            <Typography variant="subtitle1" sx={{ cursor: "pointer" }} className="hover:text-blue-500 transition duration-200">
              Genres of Songs
            </Typography>
            {/* Conditional rendering based on userRole prop */}
            {userRole === "admin" && ( 
              <Typography variant="subtitle1" sx={{ cursor: "pointer" }} onClick={toggleAddSongForm} className="hover:text-green-500 transition duration-200">
                Add Song
              </Typography>
            )}
            {/* Add 'Edit Song' if needed: */}
            {userRole === "admin" && (
              <Typography variant="subtitle1" sx={{ cursor: "pointer" }} /* onClick={handleEditSong} */ className="hover:text-yellow-500 transition duration-200">
                Edit Song (Admin Only)
              </Typography>
            )}
            
            <Typography variant="h6" sx={{ mt: 3 }} className="text-blue-300 font-bold">
              Song Details
            </Typography>
            <SongDetails song={selectedSong} />
          </>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4, display: "flex", flexDirection: "column", gap: 3, bgcolor: "rgba(20, 20, 20, 0.8)", borderRadius: "0 12px 12px 0" }}>
        <Box sx={{ display: "flex", alignItems: "center" }} className="rounded-lg shadow-md">
          <TextField
            fullWidth
            placeholder="Search songs by name, artist, or album"
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
              sx: { color: 'white' }
            }}
            sx={{ mr: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: '#777' }, '&.Mui-focused fieldset': { borderColor: '#007bff' } }, '& .MuiInputLabel-root': { color: '#bbb' } }}
            className="bg-gray-700 rounded-lg"
          />
        </Box>

        {/* Add Song Form - Only visible for admin role */}
        {userRole === "admin" && isAddingSong && ( 
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, p: 3, border: '1px solid #444', borderRadius: '8px' }} className="bg-gray-700 shadow-lg">
            <Typography variant="h6" className="text-white font-bold">Add New Song</Typography>
            <TextField label="Title" value={newSongTitle} onChange={(e) => setNewSongTitle(e.target.value)} fullWidth InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#bbb' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#007bff' } } }} />
            <TextField label="Artist" value={newSongArtist} onChange={(e) => setNewSongArtist(e.target.value)} fullWidth InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#bbb' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#007bff' } } }} />
            <TextField label="Album" value={newSongAlbum} onChange={(e) => setNewSongAlbum(e.target.value)} fullWidth InputProps={{ sx: { color: 'white' } }} InputLabelProps={{ sx: { color: '#bbb' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' }, '&.Mui-focused fieldset': { borderColor: '#007bff' } } }} />
            <Box className="flex space-x-4">
              <Button variant="contained" color="primary" onClick={handleAddNewSong} className="flex-1 bg-green-600 hover:bg-green-700 rounded-md py-2 px-4 text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105">Add Song</Button>
              <Button variant="outlined" color="secondary" onClick={toggleAddSongForm} className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md py-2 px-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105">Cancel</Button>
            </Box>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }} className="flex-wrap">
          {/* Filter by Artist */}
          <FormControl sx={{ minWidth: 180 }} className="bg-gray-700 rounded-lg">
            <InputLabel id="artist-filter-label" sx={{ color: '#bbb' }}>Filter by Artist</InputLabel>
            <Select
              labelId="artist-filter-label"
              id="artist-filter"
              value={filterArtist}
              label="Filter by Artist"
              onChange={handleArtistFilterChange}
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#777' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#007bff' }, '& .MuiSvgIcon-root': { color: '#bbb' } }}
            >
              <MenuItem value="" sx={{ bgcolor: '#333', color: 'white' }}>All Artists</MenuItem>
              {artists.map((artist) => (
                <MenuItem key={artist} value={artist} sx={{ bgcolor: '#333', color: 'white', '&:hover': { bgcolor: '#555' } }}>
                  {artist}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filter by Title */}
          <FormControl sx={{ minWidth: 180 }} className="bg-gray-700 rounded-lg">
            <InputLabel id="title-filter-label" sx={{ color: '#bbb' }}>Filter by Title</InputLabel>
            <Select
              labelId="title-filter-label"
              id="title-filter"
              value={filterTitle}
              label="Filter by Title"
              onChange={handleTitleFilterChange}
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#777' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#007bff' }, '& .MuiSvgIcon-root': { color: '#bbb' } }}
            >
              <MenuItem value="" sx={{ bgcolor: '#333', color: 'white' }}>All Titles</MenuItem>
              {titles.map((title) => (
                <MenuItem key={title} value={title} sx={{ bgcolor: '#333', color: 'white', '&:hover': { bgcolor: '#555' } }}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filter by Album */}
          <FormControl sx={{ minWidth: 180 }} className="bg-gray-700 rounded-lg">
            <InputLabel id="album-filter-label" sx={{ color: '#bbb' }}>Filter by Album</InputLabel>
            <Select
              labelId="album-filter-label"
              id="album-filter"
              value={filterAlbum}
              label="Filter by Album"
              onChange={handleAlbumFilterChange}
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#777' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#007bff' }, '& .MuiSvgIcon-root': { color: '#bbb' } }}
            >
              <MenuItem value="" sx={{ bgcolor: '#333', color: 'white' }}>All Albums</MenuItem>
              {albums.map((album) => (
                <MenuItem key={album} value={album} sx={{ bgcolor: '#333', color: 'white', '&:hover': { bgcolor: '#555' } }}>
                  {album}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={handleApplyFiltersClick} className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110">
            <SearchIcon className="text-white" />
          </IconButton>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom className="text-blue-300 font-extrabold text-center mt-4">
          Music Library
        </Typography>
        <List items={filteredTracks} onSelect={handleSelectSong} />
      </Box>
    </Box>
  );
}

export default App;
