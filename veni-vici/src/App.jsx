import React, { useState } from "react";
import "./App.css";
import CatCard from "./components/CatCard";
import BanList from "./components/BanList";

const API_KEY = import.meta.env.VITE_API_KEY;

const catNames = [
    "Whiskers",
    "Mittens",
    "Shadow",
    "Simba",
    "Nala",
    "Luna",
    "Bella",
    "Chloe",
    "Oliver",
    "Leo",
    "Max",
    "Charlie",
    "Lucy",
    "Molly",
    "Daisy",
    "Sophie",
    "Tiger",
    "Smokey",
    "Cleo",
    "Oscar",
    "Jasper",
    "Gizmo",
    "Tigger",
    "Pepper",
    "Zoe",
    "Loki",
    "Milo",
    "Buddy",
    "Rocky",
    "Jack",
    "Lily",
    "Sasha",
    "Misty",
    "Coco",
    "Ruby",
    "Ginger",
    "Sammy",
    "Felix",
    "Penny",
    "Boo",
    "Pumpkin",
    "Oreo",
    "Midnight",
    "Snowball",
    "Boots",
    "Socks",
    "Toby",
    "Maggie",
    "Princess",
    "Fluffy",
];

function App() {
    const [catData, setCatData] = useState(null);
    const [randomCatName, setRandomCatName] = useState("");
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
                fetchCatData();
            } else {
                setCatData(data[0]);
                setRandomCatName(
                    catNames[Math.floor(Math.random() * catNames.length)]
                );
            }
        } catch (error) {
            console.error("Error fetching cat data:", error);
        }
    };

    const banBreed = (breed) => setBannedBreeds([...bannedBreeds, breed]);
    const banWeight = (weight) => setBannedWeights([...bannedWeights, weight]);
    const banCountry = (country) =>
        setBannedCountries([...bannedCountries, country]);
    const banAgeRange = (ageRange) =>
        setBannedAgeRanges([...bannedAgeRanges, ageRange]);

    const unbanBreed = (breed) =>
        setBannedBreeds(bannedBreeds.filter((b) => b !== breed));
    const unbanWeight = (weight) =>
        setBannedWeights(bannedWeights.filter((w) => w !== weight));
    const unbanCountry = (country) =>
        setBannedCountries(bannedCountries.filter((c) => c !== country));
    const unbanAgeRange = (ageRange) =>
        setBannedAgeRanges(bannedAgeRanges.filter((a) => a !== ageRange));

    return (
        <div className='cat-card'>
            <h1>Cat Finder</h1>
            {catData ? (
                <CatCard
                    catData={catData}
                    randomCatName={randomCatName}
                    banBreed={banBreed}
                    banWeight={banWeight}
                    banCountry={banCountry}
                    banAgeRange={banAgeRange}
                />
            ) : (
                <h2>😺😸😹😻😼😽🙀🐱😾😿</h2>
            )}
            <button className='cat-button' onClick={fetchCatData}>
                Find your purrfect cat 🐾
            </button>
            <BanList
                bannedBreeds={bannedBreeds}
                bannedWeights={bannedWeights}
                bannedCountries={bannedCountries}
                bannedAgeRanges={bannedAgeRanges}
                unbanBreed={unbanBreed}
                unbanWeight={unbanWeight}
                unbanCountry={unbanCountry}
                unbanAgeRange={unbanAgeRange}
            />
        </div>
    );
}

export default App;
