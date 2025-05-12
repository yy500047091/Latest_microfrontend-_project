// components/TrackCard.tsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Chip,
  useTheme
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
import type { Track } from './dummydata';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[4],
  },
}));

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
};

interface TrackCardProps {
  track: Track;
  onSelect: (song: Track) => void; // Add this line
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onSelect }) => {
  const theme = useTheme();

  return (
    <StyledCard onClick={() => onSelect(track)} style={{ cursor: 'pointer' }}>
      {track.album.images?.length > 0 && (
        <CardMedia
          component="img"
          height="180"
          image={track.album.images[0].url}
          alt={track.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5,
          }}
        >
          {track.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.8rem',
          }}
        >
          {track.artists.map(artist => artist.name).join(", ")}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip
            label={track.album.name}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.7rem' }}
          />
          <Chip
            label={formatDuration(track.duration_ms)}
            size="small"
            sx={{ fontSize: '0.7rem' }}
          />
        </Stack>
      </CardContent>

      <IconButton
        aria-label="play/pause"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          }
        }}
        onClick={(event) => {
          event.stopPropagation(); // Prevent card click when play is clicked
          console.log('Play track:', track.name);
        }}
      >
        <PlayArrowIcon />
      </IconButton>
    </StyledCard>
  );
};

export default TrackCard;