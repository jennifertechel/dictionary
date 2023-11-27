import { useState } from "react";

function useDictionaryApi() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState("");

  const fetchDefinition = async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Word not found in the dictionary");
        } else {
          throw new Error("Network response was not ok");
        }
      }

      const data = await response.json();
      setApiData(data[0] || null);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiData(null);
      setError(error.message); // Display the specific error message
    }
  };

  return { apiData, error, fetchDefinition };
}

export default useDictionaryApi;
