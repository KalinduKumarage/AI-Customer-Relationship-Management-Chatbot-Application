import React, {Component} from 'react';
import {InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import Rating from '@material-ui/lab';
import useStyles from './style';
import MapModal from '../MapModal';

const API_KEY = `AIzaSyBvNTgvpT_gQWooQJ7kdAG9b_dLtW4XzKY`;
// const getLocationDistance=;

var map;
var infowindow;
var service;
var directionsService;
var directionsDisplay;
var currentLocation;


class Map extends Component {

    state = {
        placesDetails: [],
        sortedPlacesDetails: [],
        lat: 6.9271,
        lng: 79.8612,
        zoom: 15
    }

    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);
        window.initMap = this.initMap;
    }

    initMap = () => {

        directionsService = new window.google.maps.DirectionsService();
        directionsDisplay = new window.google.maps.DirectionsRenderer();
        // Default Location
        var location = {
            lat: this.state.lat,
            lng: this.state.lng
        };

        // Initialize Map
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15,
            //styles: mapStyle
        });

        directionsDisplay.setMap(map);

        /*
        https://maps.googleapis.com/maps/api/directions/json?
        origin=Toronto&destination=Montreal
        &key=YOUR_API_KEY

            directionService= new window.google.map.DirectionsService();

            directionsDisplay = new window.google.maps.DirectionsRenderer();

            directionsDisplay.setMap(map);


              var requestDS = {
                origin: document.getElementById("from").value,
                destination: document.getElementById("to").value,
                travelMode: window.google.maps.TravelMode.DRIVING,
                unitSystem: window.google.maps.UnitSystem.IMPERIAL
            }

            directionService.route(requestDS, (result,status) => {
              if(status == window.google.maps.DirectionsStatus.OK) {

                const output = window.documnent.querySelector('#output');
                output.dangerouslySetInnerHTML = "<div class= 'alert-info'> From: " + document.getElementById('from').value + ".<br /> To: " + document.getElementById("to").value + ".<br /> Driving distance " + result.routes[0].legs[0].distance.text + ". </div>";

                window.directionsDisplay.setDirections(result);

              }
              else {
                window.directionsDisplay.setDirections({ routes: []});

                //map.setCenter();
              }
            })

            var options = {
              types: ['(cities)', '(hospitals)'] //if not remove the hospital
            }
            var input1 = document.getElementById("from");
            var autoComplete1 = new window.google.map.places.Autocomplete(input1, options)

            var input2 = document.getElementById("to");
            var autoComplete2 = new window.google.map.places.Autocomplete(input2.options)

        */
        // Current Location Marker
        var marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: "You're Here!"
        });

        // Ask for user location
        this.getCurrentLocation();

        // Request Info: It will be used for Google Places API `PlacesServices` to getLocationDirec certain places that match our criteria
        var request = {
            location: location,
            radius: 10000,
            type: ['hospital' || 'clinic']
        }

        infowindow = new window.google.maps.InfoWindow();
        service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(request, this.callback);
    }

    callback = (results, status) => {
        let that = this;
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {

            let placesInfo = [];
            let fields = ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'user_ratings_total', 'reviews', 'photo', 'place_id', 'geometry'];

            // Get Places Details
            results.map(place => {
                service.getDetails({placeId: place.place_id, fields}, function (placeInfo, status) {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {

                        // Add New Place
                        placesInfo.push(placeInfo);

                        // Update All Places & Add Markers
                        that.setState({
                            placesDetails: placesInfo,
                            sortedPlacesDetails: placesInfo
                        }, that.addMarkers(placesInfo))
                    }
                })
            })
        }
    }

    addMarkers = (placesInfo) => {
        placesInfo.forEach(this.createMarker);
    }

    createMarker = (place) => {
       
        var marker = new window.google.maps.Marker({
            map: map,
            title: place.name,
            icon: {
                url: 'https://maps.gstatic.com/mapfiles/ms2/micons/hospitals.png',
                anchor: new window.google.maps.Point(20, 20),
                scaledSize: new window.google.maps.Size(25, 25)
            },
            position: place.geometry.location
        });

        const getdirection = async(place) => {
            console.log(place);
            const dire = place.geometry.location;
            const lon = currentLocation.lng;
            const lat = currentLocation.lat;
            const loc = lat + " "+ lon;
            calculateAndDisplayRoute(directionsService, directionsDisplay, dire, loc);
        
        }

        function calculateAndDisplayRoute(directionsService, directionsDisplay, dire, loc){
            console.log(dire, loc);
                directionsService.route({
                        origin: loc,
                        destination: dire,
                        travelMode: 'DRIVING'
                    },function(response, status){
                        if(status == 'OK'){
                            console.log(response);
                            directionsDisplay.setDirections(response);
                        }else{
                            console.log('Direction request failed due to ' + status);
                        }
                    })
        };
        marker.addListener('click', function () {
            {getdirection(place)}
            var request = {
                reference: place.reference
            }

            let placePicture = place.photos ? place.photos[0].getUrl({
                maxWidth: 300,
                maxHeight: 240
            }) : 'https://via.placeholder.com/300';

            let content = `
        <h2>${place.name} </h2>
        <img style= "margin-left: 20px" src=${placePicture}>
        <ul>
          <li>${place.formatted_address}</li>
          <li>${place.formatted_phone_number}</li>
          <li>Rating ${place.rating}</li>                  
        </ul>
        
      `;
            infowindow.setContent(content);
            infowindow.open(map, marker);

        })
    }

    getCurrentLocation = () => {
        let self = this;
        let infoWindow = new window.google.maps.InfoWindow;

        let handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                currentLocation = pos;
                infoWindow.setPosition(pos);
                infoWindow.setContent("You're here!");
                infoWindow.open(map);
                map.setCenter(pos);

                self.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })

                self.initMap();
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            })
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    handleSort = (e) => {
        let places = this.state.placesDetails;
        let sortedPlaces = [];
        let minRating = e.target.value;

        places.map(place => {
            console.log(place.rating);
            if (place.rating >= minRating) {
                sortedPlaces.push(place);
            }
        })

        this.setState({
            sortedPlacesDetails: sortedPlaces
        });

        // Reset sortedPlaces for future sorting
        sortedPlaces = [];
    }

    // addPlace = (newPlace) => {
    //   let currentPlaces = this.state.placesDetails;
    //   currentPlaces.push(newPlace);

    //   let placeMarker = () => {
    //     // Position
    //     let latLng = {
    //       lat: newPlace.lat,
    //       lng: newPlace.lng
    //     }

    //     // Add Marker
    //     var marker = new window.google.maps.Marker({
    //       position: latLng,
    //       map: map,
    //       title: newPlace.name,
    //       icon: {
    //         url: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    //         anchor: new window.google.maps.Point(10, 10),
    //         scaledSize: new window.google.maps.Size(20, 20)
    //       }
    //     });
    //     marker.setMap(map);
    //     map.setCenter(latLng);

    // InfoWindow
    //     marker.addListener('click', function() {
    //       let placePicture = newPlace.photos ? newPlace.photos[0].getUrl({maxWidth: 300, maxHeight: 300}) : 'https://via.placeholder.com/300';

    //       let content = `
    //         <h2>${newPlace.name}</h2>
    //         <img src=${placePicture}>
    //         <ul>
    //           <li>${newPlace.formatted_address}</li>
    //           <li>${newPlace.formatted_phone_number}</li>
    //         </ul>
    //       `;
    //       infowindow.setContent(content);
    //       infowindow.open(map, marker);
    //     })
    //   }

    //   this.setState({
    //     placesDetails: currentPlaces
    //   }, placeMarker())

    //   console.log(newPlace.lat, newPlace.lng)
    // }

    render() {
        return (
            <div>

                <MapModal
                    placesDetails={this.state.sortedPlacesDetails}
                    handleSort={this.handleSort}
                    //addPlace={this.addPlace}
                />
            </div>
        );
    }
}

function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default Map;


/*
const Map = () => {

    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = {lat:6.927079, lng:79.861244}; 
    
    return (
        <div className={classes.mapContainer} >
         

            <GoogleMapsReact
                bootstrapURLKeys={{key: 'AIzaSyBvNTgvpT_gQWooQJ7kdAG9b_dLtW4XzKY'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={15}
                margin={[50,50,50,50]}
                options={''}
                yesIWantToUseGoogleMapApiInternals
                
            >
          
            </GoogleMapsReact>

        </div>
        );
}
export default Map;

*/