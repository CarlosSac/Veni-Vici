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
        console.log("Fetching cat data...");
        try {
            const response = await fetch(
                `https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${API_KEY}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const breed = data[0].breeds[0];
            if (
                bannedBreeds.includes(breed.name) ||
                bannedWeights.includes(breed.weight.metric) ||
                bannedCountries.includes(breed.origin) ||
                bannedAgeRanges.includes(breed.life_span)
            ) {
                console.log("Breed is banned, fetching another cat...");
                fetchCatData(); // Fetch another cat if the breed is banned
            } else {
                setCatData(data[0]);
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

    const unbanBreed = (breed) => {
        setBannedBreeds(bannedBreeds.filter((b) => b !== breed));
    };

    const unbanWeight = (weight) => {
        setBannedWeights(bannedWeights.filter((w) => w !== weight));
    };

    const unbanCountry = (country) => {
        setBannedCountries(bannedCountries.filter((c) => c !== country));
    };

    const unbanAgeRange = (ageRange) => {
        setBannedAgeRanges(bannedAgeRanges.filter((a) => a !== ageRange));
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
                        style={{ width: "300px", height: "300px" }}
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
                <p>
                    Breeds:{" "}
                    {bannedBreeds.map((breed) => (
                        <button key={breed} onClick={() => unbanBreed(breed)}>
                            {breed}
                        </button>
                    ))}
                </p>
                <p>
                    Weights:{" "}
                    {bannedWeights.map((weight) => (
                        <button
                            key={weight}
                            onClick={() => unbanWeight(weight)}
                        >
                            {weight} kg
                        </button>
                    ))}
                </p>
                <p>
                    Countries:{" "}
                    {bannedCountries.map((country) => (
                        <button
                            key={country}
                            onClick={() => unbanCountry(country)}
                        >
                            {country}
                        </button>
                    ))}
                </p>
                <p>
                    Age Ranges:{" "}
                    {bannedAgeRanges.map((ageRange) => (
                        <button
                            key={ageRange}
                            onClick={() => unbanAgeRange(ageRange)}
                        >
                            {ageRange} years
                        </button>
                    ))}
                </p>
            </div>
        </div>
    );
}

export default App;
