import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

// components
import Cover from '../components2/Cover/Cover';
import Search from '../components2/Search/Search';
import Information from '../components2/Information/Information';

// types
import type { IAlbum } from '../types/types';

// data
import albumData from '../data/albumData.json';

const AlbumPage: React.FC = () => {
  const { id } = useParams();

  const [currentAlbumData, setCurrentAlbumData] = useState<IAlbum | null>(null);

  useEffect(() => {
    const currentAlbum = albumData.find((album) => album.id === id);

    if (currentAlbum) {
      setCurrentAlbumData(currentAlbum);
    }
  }, [id]);

  if (!currentAlbumData) {
    return <div>Album not found</div>;
  }

  return (
    <Cover image={currentAlbumData.image}>
      <Search />
      <Information album={currentAlbumData} />
    </Cover>
  );
};

export default AlbumPage;
