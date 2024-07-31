//!https://www.blackbox.ai/share/24f2da23-8667-485b-8bac-066493e0562c
const content = document.querySelector( '.cards' ); // suponiendo que el elemento tiene una clase llamada "container"
const cards = document.getElementById( 'cards' );
const timeframes = {
    frames: Array.from( document.querySelectorAll( '.frames' ) ),
}

let tiempo = ''
// const res = await fetch( 'data.json' );
// const data = await res.json();
// console.log( data );

try {
    const res = await fetch( 'data.json' );
    if ( !res.ok ) {
        throw new Error( `Error ${ res.status }: ${ res.statusText }` );
    }
    const data = await res.json();
    showData( data );
} catch ( error ) {
    console.error( error );
}



function showData ( data ) {

    const bitData = data.forEach( ( element ) => {
        const {
            title,
            timeframes: {
                daily,
                weekly,
                monthly,
            }
        } = element;

        const card = document.createElement( 'div' );
        const titleClass = `${ title }`.normalize().replace( /[^a-zA-Z0-9_]/g, "-" ).toLowerCase();

        card.classList.add( 'card', titleClass );
        card.setAttribute( "id", titleClass );
        // console.log( card.id );
        card.innerHTML = `
                  <img class="card_icon" src="./images/icon-${ titleClass }.svg" alt="" srcset="">
                <div class="card_info">
                  <div class="card_top">
                    <h4 class="title">${ title }</h4>
                    <span class="card_more">...</span>
                  </div>
                  <div class="card_top">
                    <h2 id="${ title }" class="current">${ daily.current }hrs</h2>
                    <span class="previous">yestarday - ${ daily.previous }hrs</span>
                  </div>
                </div>
      `;

        switch ( card.id ) {
            case 'work': card.style.backgroundColor = "#ff8c66";
                break;
            case 'play': card.style.backgroundColor = "#56c2e6";
                break;
            case 'study': card.style.backgroundColor = "#ff5c7c";
                break;
            case 'exercise': card.style.backgroundColor = "#4acf81";
                break;
            case 'social': card.style.backgroundColor = "#7536d3";
                break;
            default: card.style.backgroundColor = "#f1c65b";
        }

        cards.appendChild( card );


        timeframes.frames.forEach( ( frame ) => {
            frame.addEventListener( 'click', ( e ) => {

                const frameTime = e.target.id;
                console.log( element );
                timeframes.frames.forEach( ( f ) => f.removeAttribute( 'checked' ) );
                e.target.setAttribute( 'checked', true );

                let currents = document.querySelectorAll( '.current' );
                let previous = document.getElementsByClassName( 'previous' );

                currents.forEach( ( curr ) => {
                    console.log( curr );
                    // console.log( frameTime );
                    // curr.textContent = `${ daily.current }`;
                } )

            } );

        } );

        // previousElements.forEach( ( previousElement, index ) => {
        //     let frame = '';
        //     switch ( frameTime ) {
        //         case 'daily': frame = "Yestarday";
        //             break;
        //         case 'weekly': frame = "Last Week";
        //             break;
        //         default: frame = "Last Month";
        //             break;
        //     }
        //     previousElement.textContent = `${ frame } - ${ previousValues[index] }hrs`;
        // } );
    } );
};