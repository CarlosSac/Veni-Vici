import React from "react";

const CatCard = ({
    catData,
    randomCatName,
    banBreed,
    banWeight,
    banCountry,
    banAgeRange,
}) => {
    return (
        <div>
            <img className='cat-image' src={catData.url} alt='Random Cat' />
            {catData.breeds && catData.breeds.length > 0 && (
                <div>
                    <h2>{randomCatName}</h2>
                    <p className='cat-desc'>
                        <button
                            onClick={() => banBreed(catData.breeds[0].name)}
                        >
                            {catData.breeds[0].name}
                        </button>
                        <button
                            onClick={() =>
                                banWeight(catData.breeds[0].weight.metric)
                            }
                        >
                            {catData.breeds[0].weight.metric} kg
                        </button>
                        <button
                            onClick={() => banCountry(catData.breeds[0].origin)}
                        >
                            {catData.breeds[0].origin}
                        </button>
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
    );
};

export default CatCard;
