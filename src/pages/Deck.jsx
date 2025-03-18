import React, {useState} from "react";

function Deck() {
    const [showComponent, setShowComponent] = useState(false);

    return (
        <>
            <div>
                <h1>Deck Name:</h1>
                <h2>Card Count: </h2>
            </div>
        </>
    )
}

export default Deck;