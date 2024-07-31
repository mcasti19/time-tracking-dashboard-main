
const activities = document.getElementById( 'activities' );

const timeframes = {
    frames: Array.from( document.querySelectorAll( '.frames' ) ),
}

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
    data.forEach( ( element ) => {
        const {
            title,
            timeframes: {
                daily,
                weekly,
                monthly,
            }
        } = element;

        const titleActivity = `${ title }`.normalize().replace( /[^a-zA-Z0-9_]/g, "-" ).toLowerCase();
        const activity = document.createElement( 'div' );
        activity.classList.add( 'activity', titleActivity );
        activity.setAttribute( "id", titleActivity );

        // BACKGROUND IMG FOR EACH ACTIVITY
        const activityIcon = document.createElement( 'img' );
        activityIcon.src = `./images/icon-${ titleActivity }.svg`;
        activityIcon.alt = '';
        activityIcon.srcset = '';
        activityIcon.classList = 'activity_icon';

        //CONTENT FOR EACH ACTIVITY
        const activityInfo = document.createElement( 'div' );
        activityInfo.className = 'activity_info';

        const activityTop = document.createElement( 'div' );
        activityTop.className = 'activity_top';

        const titleElement = document.createElement( 'h4' );
        titleElement.className = 'title';
        titleElement.textContent = title;

        const activityMore = document.createElement( 'h4' );
        activityMore.className = 'activity_more';

        const ellipsis = document.createElement( 'i' );
        ellipsis.className = "fa-solid fa-ellipsis"
        activityMore.appendChild( ellipsis );

        activityTop.appendChild( titleElement );
        activityTop.appendChild( activityMore );

        const totalHrs = document.createElement( 'div' );
        totalHrs.className = 'activity_bottom';

        const currentElement = document.createElement( 'h1' );
        currentElement.id = title;
        currentElement.className = 'current';
        currentElement.textContent = `${ daily.current }hrs`;

        const previousElement = document.createElement( 'p' );
        previousElement.className = 'previous';
        previousElement.textContent = `Yestarday - ${ daily.previous }hrs`;

        activityInfo.appendChild( activityTop );
        activityInfo.appendChild( totalHrs );
        totalHrs.appendChild( currentElement );
        totalHrs.appendChild( previousElement );

        activity.appendChild( activityIcon );
        activity.appendChild( activityInfo );

        // DECLARAR COLORES PARA CADA CARD
        const activityStyles = {
            work: '#ff8c66',
            play: '#56c2e6',
            study: '#ff5c7c',
            exercise: '#4acf81',
            social: '#7536d3',
            active: '#34397B',
            default: '#f1c65b',
        };

        //SE ASIGNA EL COLOR DEPENDIENDO DEL TITULO DE LA CLASE
        activity.style.backgroundColor = activityStyles[titleActivity] || activityStyles.default;
        activities.appendChild( activity );

        // SE CREA OBJETO PARA MAPEAR CADA UNO DE LOS VALORES DE LOS timeframes
        const timeframesValues = {
            dailyCurrent: data.map( ( element ) => element.timeframes.daily.current ),
            weeklyCurrent: data.map( ( element ) => element.timeframes.weekly.current ),
            monthlyCurrent: data.map( ( element ) => element.timeframes.monthly.current ),

            dailyPrevious: data.map( ( element ) => element.timeframes.daily.previous ),
            weeklyPrevious: data.map( ( element ) => element.timeframes.weekly.previous ),
            monthlyPrevious: data.map( ( element ) => element.timeframes.monthly.previous ),
        };

        // SE ASIGNA EL CHECKED AL FRAME SELECCIONADO Y SE CARGAN LOS DATOS CORRESPONDIENTES PARA ESE FRAME
        timeframes.frames.forEach( ( frame ) => {
            frame.addEventListener( 'click', ( e ) => {
                const frameTime = e.target.id;
                timeframes.frames.forEach( ( f ) => f.removeAttribute( 'checked' ) );
                e.target.setAttribute( 'checked', true );

                const currentValues = timeframesValues[`${ frameTime }Current`];
                const currentElements = document.querySelectorAll( '.current' );

                const previousValues = timeframesValues[`${ frameTime }Previous`];
                const previousElements = document.querySelectorAll( '.previous' );

                currentElements.forEach( ( currentElement, index ) => {
                    currentElement.textContent = `${ currentValues[index] }hrs`;
                } );

                const frameTexts = {
                    daily: 'Yestarday',
                    weekly: 'Last Week',
                    monthly: 'Last Month',
                };

                previousElements.forEach( ( previousElement, index ) => {
                    const text = frameTexts[frameTime];
                    previousElement.textContent = `${ text } - ${ previousValues[index] }hrs`;
                } );
            } );
        } ); //! Frames forEach

        activity.addEventListener( 'click', () => {
            activityInfo.style.backgroundColor = activityStyles.active;
            activityInfo.style.cursor = 'pointer';
            console.log( 'cambiando cursor' );
        } );

        activity.addEventListener( 'mouseleave', () => {
            activityInfo.style.backgroundColor = '';
            activityInfo.style.cursor = 'auto'; // Restaura el estilo cursor a su valor original
        } );
    } ); //! Data forEach
};