import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useEffect, useState} from 'react';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [ sentences, setSentences ] = useState<Array<string>>([]);
  const { 
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause
  } = useSpeech(sentences);

  useEffect(() => {
    (async () => {
      const data = await fetchContent();
      const parsed = parseContentIntoSentences(data);
      setSentences(parsed);
    })();
  }, [])

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading currentSentenceIdx={currentSentenceIdx} currentWordRange={[currentWordRange[0], currentWordRange[1]]} sentences={sentences}/>
      </div>
      <div>
        <Controls play={play} pause={pause} loadNewContent={() => window.location.reload()} state={playbackState}/>
      </div>
    </div>
  );
}

export default App;
