import React, { useEffect, useState } from "react";

// The script i used to find the flag was:
// const getFlag = () => {
//     const iTags = document.querySelectorAll('code > div > span > i');
//     const iTagsMap = Array.from(iTags)
//     return iTagsMap.map( tag => tag.attributes[1].value).join('')
// }

const TypeWriterPage = () => {
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSecretWord = async () => {
      const response = await fetch(
        "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/616e79"
      );
      const data = await response.text();
      setWord(data);
      setIsLoading(false);
    };

    fetchSecretWord();
  }, []);

  useEffect(() => {
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= word.length) {
        clearInterval(intervalId);
      } else {
        setLetters((prevState) => [...prevState, ...word[prevState.length]]);
        count = count + 1;
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [word]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{letters.join("")}</h1>
          <ul>
            {Array.from(word).map((letter, index) => (
              <li key={`${letter}-${index}`}>{letter}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TypeWriterPage;
