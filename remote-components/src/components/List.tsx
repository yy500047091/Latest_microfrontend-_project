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
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '8px', // Adjusted gap
      padding: '0',
    }}>
      {items.map((track) => (
        <div key={track.id} style={{ display: 'flex' }}>
          <TrackCard track={track} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
};

export default List;