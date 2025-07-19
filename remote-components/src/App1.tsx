// components


// styles
import './styles/player.css';

// navigation
import Navigation from './navigation/Navigation';

// providers
import TrackProvider from './providers/TrackProvider';
import Player from './components2/Player/Player';

const App1: React.FC = () => (
  <TrackProvider>
    <Player />
    <Navigation />
  </TrackProvider>
);

export default App1;
