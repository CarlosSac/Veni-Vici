import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
    const [catData, setCatData] = useState(null);
    const [bannedBreeds, setBannedBreeds] = useState([]);
    const [bannedWeights, setBannedWeights] = useState([]);
    const [bannedCountries, setBannedCountries] = useState([]);
    const [bannedAgeRanges, setBannedAgeRanges] = useState([]);

    const fetchCatData = async () => {
        console.log("Fetching cat data..."); // Log to verify API call
        try {
            const response = await fetch(
                "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=" +
                    API_KEY
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("JSON Response:", data); // Log the JSON response

            const filteredData = data.filter((cat) => {
                const breed = cat.breeds[0];
                return (
                    !bannedBreeds.includes(breed.name) &&
                    !bannedWeights.includes(breed.weight.metric) &&
                    !bannedCountries.includes(breed.origin) &&
                    !bannedAgeRanges.includes(breed.life_span)
                );
            });

            if (filteredData.length > 0) {
                setCatData(filteredData[0]);
            } else {
                console.log("No non-banned cats found, fetching again...");
                fetchCatData(); // Fetch again if all cats are banned
            }
        } catch (error) {
            console.error("Error fetching cat data:", error);
        }
    };

    const banBreed = (breed) => {
        setBannedBreeds([...bannedBreeds, breed]);
    };

    const banWeight = (weight) => {
        setBannedWeights([...bannedWeights, weight]);
    };

    const banCountry = (country) => {
        setBannedCountries([...bannedCountries, country]);
    };

    const banAgeRange = (ageRange) => {
        setBannedAgeRanges([...bannedAgeRanges, ageRange]);
    };

    return (
        <div>
            <h1>Random Cat Information</h1>
            <button onClick={fetchCatData}>Get Random Cat</button>
            {catData ? (
                <div>
                    <img
                        src={catData.url}
                        alt='Random Cat'
                        style={{ width: "300px", height: "250px" }}
                    />
                    {catData.breeds && catData.breeds.length > 0 && (
                        <div>
                            <h2>Name: {catData.breeds[0].name}</h2>
                            <p>
                                Breed:{" "}
                                <button
                                    onClick={() =>
                                        banBreed(catData.breeds[0].name)
                                    }
                                >
                                    {catData.breeds[0].name}
                                </button>
                            </p>
                            <p>
                                Weight:{" "}
                                <button
                                    onClick={() =>
                                        banWeight(
                                            catData.breeds[0].weight.metric
                                        )
                                    }
                                >
                                    {catData.breeds[0].weight.metric} kg
                                </button>
                            </p>
                            <p>
                                Country:{" "}
                                <button
                                    onClick={() =>
                                        banCountry(catData.breeds[0].origin)
                                    }
                                >
                                    {catData.breeds[0].origin}
                                </button>
                            </p>
                            <p>
                                Age Range:{" "}
                                <button
                                    onClick={() =>
                                        banAgeRange(catData.breeds[0].life_span)
                                    }
                                >
                                    {catData.breeds[0].life_span} years
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <p>Click the button to get a random cat picture.</p>
            )}
            <div>
                <h2>Banned Items</h2>
                <p>Breeds: {bannedBreeds.join(", ")}</p>
                <p>Weights: {bannedWeights.join(", ")}</p>
                <p>Countries: {bannedCountries.join(", ")}</p>
                <p>Age Ranges: {bannedAgeRanges.join(", ")}</p>
            </div>
        </div>
    );
}

export default App;
