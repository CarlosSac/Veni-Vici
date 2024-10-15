import React from "react";

const BanList = ({
    bannedBreeds,
    bannedWeights,
    bannedCountries,
    bannedAgeRanges,
    unbanBreed,
    unbanWeight,
    unbanCountry,
    unbanAgeRange,
}) => {
    return (
        <div className='banned-list'>
            <h2>Ban List</h2>
            <p>Select an attribute in your listing to ban it</p>
            <p>
                {bannedBreeds.map((breed) => (
                    <button key={breed} onClick={() => unbanBreed(breed)}>
                        {breed}
                    </button>
                ))}
            </p>
            <p>
                {bannedWeights.map((weight) => (
                    <button key={weight} onClick={() => unbanWeight(weight)}>
                        {weight} kg
                    </button>
                ))}
            </p>
            <p>
                {bannedCountries.map((country) => (
                    <button key={country} onClick={() => unbanCountry(country)}>
                        {country}
                    </button>
                ))}
            </p>
            <p>
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
    );
};

export default BanList;
