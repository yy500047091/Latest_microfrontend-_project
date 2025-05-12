// components/List.tsx
import React from "react";
import type { Track } from "./dummydata";
import TrackCard from "./TrackCard";

interface ListProps {
  items: Track[];
  onSelect: (song: Track) => void;
}

const List: React.FC<ListProps> = ({ items, onSelect }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Adjust minmax width as needed
      gap: '16px', // Adjust gap as needed
      padding: '16px', // Optional padding for the container
    }}>
      {items.map((track) => (
        <div key={track.id} style={{ display: 'flex' }}> {/* Optional wrapper div if needed for specific card layout */}
          <TrackCard track={track} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
};

export default List;