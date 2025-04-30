import { useState } from 'react';

import { createSpeechEngine, PlayingState, SpeechEngineOptions } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.

  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const {
    state,
    play: _play,
    pause: _pause,
    cancel: _cancel,
    load: _load
  } = createSpeechEngine({
    onBoundary: function (e: SpeechSynthesisEvent): void {
    },
    onEnd: function (e: SpeechSynthesisEvent): void {
      sentenceId++;
      if (sentences[sentenceId]) play();
    },
    onStateUpdate: function (state: PlayingState): void {
    }
  });

  let sentenceId = 0;
  const play = async () => {
    const el = sentences[sentenceId];
    setCurrentSentenceIdx(sentenceId);

    _load(el)
    _play();
  };

  const pause = () => {
    _pause();
    // setCurrentSentenceIdx();
    // setPlaybackState('paused');
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
