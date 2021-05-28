import logo from './logo.svg';
import './App.css';
// import QuoteCard from './components/QuoteCard';
import Background from './components/Background';
import Controls from './components/Controls'
import AudioVisualizer from './components/AudioVisualizer';
import VisualizerComponent from './components/VisualizerComponent';
// import AudioVisualizer from './components/AudioVisualizer'

function App() {
   return (
      <div className="App">
         <Background></Background>
         <VisualizerComponent audio_url="./music/Beethoven - Moonlight Sonata (1st Movement).mp3"></VisualizerComponent>
      </div>
   );
}

export default App;
