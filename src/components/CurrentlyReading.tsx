/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const curSentence = sentences[currentSentenceIdx];
  const preSent = curSentence?.slice(0, currentWordRange[0]);
  const curWord = curSentence?.slice(currentWordRange[0], currentWordRange[1]);
  const postSent = curSentence?.slice(currentWordRange[1]);

  return (
    <div data-testid="currently-reading">
      <p data-testid="current-sentence">
        <span data-testid="current-word" className='red'>{curWord}</span>
        <br/>

        {preSent}
        <span className='red'>{curWord}</span>
        {postSent}
      </p>

      <br/>

      <p>{sentences.join(' ')}</p>
    </div>
  );
};
