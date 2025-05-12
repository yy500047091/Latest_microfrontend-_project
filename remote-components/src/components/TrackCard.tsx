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
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[900], // Dark background for track cards
  color: theme.palette.grey[300], // Light text color
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[3],
  },
}));

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
};

interface TrackCardProps {
  track: Track;
  onSelect: (song: Track) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, onSelect }) => {
  const theme = useTheme();

  return (
    <StyledCard onClick={() => onSelect(track)} style={{ cursor: 'pointer' }}>
      {track.album.images?.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={track.album.images[0].url}
          alt={track.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: '0.9rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.3,
          }}
        >
          {track.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.7rem',
          }}
        >
          {track.artists.map(artist => artist.name).join(", ")}
        </Typography>

        <Stack direction="row" spacing={0.5} sx={{ mb: 0.5 }}>
          <Chip
            label={track.album.name}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.6rem', color: theme.palette.grey[300], borderColor: theme.palette.grey[500] }}
          />
          <Chip
            label={formatDuration(track.duration_ms)}
            size="small"
            sx={{ fontSize: '0.6rem', color: theme.palette.grey[300] }}
          />
        </Stack>
      </CardContent>

      <IconButton
        aria-label="play/pause"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          padding: '4px',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          }
        }}
        onClick={(event) => {
          event.stopPropagation();
          console.log('Play track:', track.name);
        }}
      >
        <PlayArrowIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
    </StyledCard>
  );
};

export default TrackCard;