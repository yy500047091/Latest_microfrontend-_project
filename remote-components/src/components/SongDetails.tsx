import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import type { Track } from "./dummydata";

interface SongDetailsProps {
  song: Track | null;
}

const SongDetails: React.FC<SongDetailsProps> = ({ song }) => {
  if (!song) {
    return <Typography variant="body2" sx={{ mt: 1 }} color="white">No song selected.</Typography>;
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', bgcolor: 'grey.800', color: 'white' }}>
      {song.album.images && song.album.images.length > 0 && (
        <CardMedia
          component="img"
          sx={{ width: '100%', height: 160 }}
          image={song.album.images[0].url}
          alt={song.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 1 }}>
        <Typography gutterBottom variant="h6" component="div" fontSize="1em">
          {song.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" fontSize="0.8em">
          {song.artists.map(artist => artist.name).join(', ')}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
          <Chip label={song.album.name} size="small" variant="outlined" sx={{ fontSize: '0.6em', color: 'white', borderColor: 'white' }} />
          <Chip label={formatDuration(song.duration_ms)} size="small" sx={{ fontSize: '0.6em', color: 'white' }} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SongDetails;