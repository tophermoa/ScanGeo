import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker, useMap} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const CurrentMap = (props) =>{
    const HiddenComp = () => {
        const {current: map} = useMap();
        map.flyTo({center: [props.currLng, props.currLat]});
      }
    return(
        <div style={{display: props.desc !== "" ? 'block' : 'none', marginTop: "2vh"}}>
            {props.desc}
            <Map
                mapboxAccessToken={process.env.REACT_APP_MY_API_KEY}
                style={{width: '80vw', height: '40vh'}}
                initialViewState={{
                    longitude: props.currLng,
                    latitude: props.currLat,
                    zoom: 14
                }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
            >
                <Marker 
                    longitude={props.currLng}
                    latitude={props.currLat}
                />
                <HiddenComp />
            </Map>
        </div>
    )
}

export default CurrentMap;