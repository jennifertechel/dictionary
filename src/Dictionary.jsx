import "./Dictionary.css";
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
      <div className='searchDiv'>
        <h1 style={{ fontSize: "4rem" }}>
          Just another <br /> dictionary ™
        </h1>
        <h2>Search the database</h2>
        <SearchInput
          value={word}
          onChange={handleInputChange}
          onButtonClick={handleApiCall}
        />
      </div>

      {apiData && (
        <div className='responseDiv'>
          <h2 style={{ fontSize: "3rem" }}>{apiData.word}</h2>

          {/* Iterate over phonetics if available */}
          {apiData.phonetics &&
            apiData.phonetics.map((phonic, index) => (
              <div key={index}>
                {phonic.text && <p>{phonic.text}</p>}
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
                      <ul>
                        <li>{definition.definition}</li>
                        {definition.example && (
                          <p style={{ fontWeight: "bold" }}>
                            Example:{" "}
                            <span style={{ fontWeight: "normal" }}>
                              {definition.example}
                            </span>
                          </p>
                        )}
                      </ul>

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
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Dictionary;
