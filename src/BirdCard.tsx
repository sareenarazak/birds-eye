import React from "react";

export function BirdCard({speciesCode, commonName }) {
    return (
        <div>
            <p>Common Name : { commonName }</p>
            <p>Species Code : { speciesCode }</p>

        </div>
    );
}
