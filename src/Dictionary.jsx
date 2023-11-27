import "./App.css";
import { useState } from "react";
import useDictionaryApi from "./useApiCall";
import SearchInput from "./SearchField";

function Dictionary() {
  const [word, setWord] = useState("");
  const { apiData, error, fetchDefinition } = useDictionaryApi();

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleApiCall = () => {
    fetchDefinition(word);
  };

  return (
    <div className='dictionary'>
      <h1>Dictionary API Example</h1>
      <SearchInput
        value={word}
        onChange={handleInputChange}
        onButtonClick={handleApiCall}
      />

      {apiData && (
        <>
          <h2>{apiData.word}</h2>

          {/* Iterate over phonetics if available */}
          {apiData.phonetics &&
            apiData.phonetics.map((phonic, index) => (
              <div key={index}>
                {phonic.text && <p>Text: {phonic.text}</p>}
                {phonic.audio && <audio src={phonic.audio} controls />}
              </div>
            ))}

          {/* Iterate over meanings if available */}
          {apiData.meanings &&
            apiData.meanings.map((meaning, index) => (
              <div key={index}>
                <h3>{meaning.partOfSpeech}</h3>

                {/* Iterate over definitions if available */}
                {meaning.definitions &&
                  meaning.definitions.map((definition, i) => (
                    <div key={i}>
                      <p>Definition: {definition.definition}</p>
                      {definition.example && (
                        <p>Example: {definition.example}</p>
                      )}
                      {/* Display synonyms and antonyms if available */}
                      {definition.synonyms.length > 0 && (
                        <p>Synonyms: {definition.synonyms.join(", ")}</p>
                      )}
                      {definition.antonyms.length > 0 && (
                        <p>Antonyms: {definition.antonyms.join(", ")}</p>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Dictionary;
