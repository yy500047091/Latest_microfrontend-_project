// components/SongDetails.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import type { Track } from "./dummydata";

interface SongDetailsProps {
  song: Track | null;
}

const SongDetails: React.FC<SongDetailsProps> = ({ song }) => {
  if (!song) {
    return <Typography variant="body1" sx={{ mt: 2 }}>No song selected.</Typography>;
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card sx={{ mt: 2, display: 'flex', maxWidth: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {song.album.images && song.album.images.length > 0 && (
        <CardMedia
          component="img"
          sx={{ width: 150, height: 150, mr: 2 }}
          image={song.album.images[0].url}
          alt={song.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography gutterBottom variant="h6" component="div">
          {song.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {song.artists.map(artist => artist.name).join(', ')}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip label={song.album.name} size="small" variant="outlined" />
          <Chip label={formatDuration(song.duration_ms)} size="small" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SongDetails;