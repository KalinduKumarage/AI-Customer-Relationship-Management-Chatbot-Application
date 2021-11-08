import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import React from "react";
import Button from "@material-ui/core/Button";
import PersonPinCircleRoundedIcon from "@material-ui/icons/PersonPinCircleRounded";
import Geocode from "react-geocode";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

class UserLocation extends React.Component {
  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    contactNumber: "",
    zoom: 14,
    mapPosition: {
      lat: 6.927079,
      lng: 79.861244,
    },
    markerPosition: {
      lat: 6.927079,
      lng: 79.861244,
    },
    successOpen: false,
    failureOpen: false,
    emptyAddress: false,
    emptyCity: false,
    emptyArea: false,
    emptyState: false,
    emptyContactNumber: "",
    emptyAddressLabel: "",
    emptyCityLabel: "",
    emptyAreaLabel: "",
    emptyStateLabel: "",
    emptyContactNumberLabel: "",
  };

  getCity = (addressArray) => {
    let city = "";
    for (let index = 0; index < addressArray.length; index++) {
      if (
        addressArray[index].types[0] &&
        "administrative_area_level_2" === addressArray[index].types[0]
      ) {
        city = addressArray[index].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = "";

    for (let index = 0; index < addressArray.length; index++) {
      if (addressArray[index].types[0]) {
        for (let j = 0; j < addressArray.length; j++) {
          if (
            "sublocality_level_1" === addressArray[index].types[j] ||
            "locality" === addressArray[index].types[j]
          ) {
            area = addressArray[index].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = "";
    for (let index = 0; index < addressArray.length; index++) {
      for (let index = 0; index < addressArray.length; index++) {
        if (
          addressArray[index].types[0] &&
          "administrative_area_level_1" === addressArray[index].types[0]
        ) {
          state = addressArray[index].long_name;
          return state;
        }
      }
    }
  };

  handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      successOpen: false,
      failureOpen: false,
    });
  };

  resetHandler = () => {
    this.setState({
      address: "",
      city: "",
      area: "",
      state: "",
      contactNumber: "",
      zoom: 14,
      mapPosition: {
        lat: 6.927079,
        lng: 79.861244,
      },
      markerPosition: {
        lat: 6.927079,
        lng: 79.861244,
      },
      emptyAddress: false,
      emptyCity: false,
      emptyArea: false,
      emptyState: false,
      emptyContactNumber: "",
      emptyAddressLabel: "",
      emptyCityLabel: "",
      emptyAreaLabel: "",
      emptyStateLabel: "",
      emptyContactNumberLabel: "",
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.setState({
      emptyAddress: false,
      emptyCity: false,
      emptyArea: false,
      emptyState: false,
      emptyContactNumber: "",
      emptyAddressLabel: "",
      emptyCityLabel: "",
      emptyAreaLabel: "",
      emptyStateLabel: "",
      emptyContactNumberLabel: "",
    });

    let validity = true;

    if (this.state.address === "") {
      validity = false;
      this.setState({
        emptyAddress: true,
        emptyAddressLabel: "Please Fill out the Address",
      });
    }
    if (this.state.city === "") {
      validity = false;
      this.setState({ emptyCity: true, emptyCityLabel: "Please enter a City" });
    }
    if (this.state.area === "") {
      validity = false;
      this.setState({
        emptyArea: true,
        emptyAreaLabel: "Please enter an Area",
      });
    }
    if (this.state.state === "") {
      validity = false;
      this.setState({
        emptyState: true,
        emptyStateLabel: "Please enter a Province",
      });
    }
    if (this.state.mapPosition.lat === 6.927079) {
      validity = false;
    }
    if (this.state.mapPosition.lng === 79.861244) {
      validity = false;
    }
    if (this.state.contactNumber === "") {
      validity = false;
      this.setState({
        emptyContactNumber: true,
        emptyContactNumberLabel: "Please enter you Contact Number",
      });
    }

    const userLocationObject = {
      address: this.state.address,
      city: this.state.city,
      area: this.state.area,
      state: this.state.state,
      contact: this.state.contactNumber,
      latitude: this.state.mapPosition.lat,
      longitude: this.state.mapPosition.lng,
    };

    if (validity === true) {
      axios
        .post(
          "http://localhost:5000/userLocation/add-location",
          userLocationObject
        )
        .then((res) => console.log(res.data));

      this.setState({
        address: "",
        city: "",
        area: "",
        state: "",
        contactNumber: "",
        zoom: 14,
        mapPosition: {
          lat: 6.927079,
          lng: 79.861244,
        },
        markerPosition: {
          lat: 6.927079,
          lng: 79.861244,
        },
        successOpen: true,
      });
    } else if (validity === false) {
      this.setState({ failureOpen: true });
    }
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then((response) => {
              console.log("response", response);

              const address = response.results[0].formatted_address,
                addressArray = response.results[0].address_components,
                city = this.getCity(addressArray),
                area = this.getArea(addressArray),
                state = this.getState(addressArray);

              this.setState({
                address: address ? address : "",
                area: area ? area : "",
                city: city ? city : "",
                state: state ? state : "",
              });
            });
          }
        );
      });
    }
  };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newlng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newlng).then((response) => {
      console.log("response", response);

      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray);

      this.setState({
        address: address ? address : "",
        area: area ? area : "",
        city: city ? city : "",
        state: state ? state : "",
        markerPosition: {
          lat: newLat,
          lng: newlng,
        },
        mapPosition: {
          lat: newLat,
          lng: newlng,
        },
      });
    });

    console.log(newLat + "," + newlng);
  };

  render() {
    const WrappedMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={this.state.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
            <InfoWindow>
              <div>{this.state.address}</div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ))
    );

    return (
      <div className="modalUserLocation">
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `70%` }} />}
          containerElement={<div style={{ height: `70%` }} />}
          mapElement={<div style={{ height: `95%` }} />}
        />
        <form noValidate onSubmit={this.submitHandler}>
          <TextField
            name="city"
            variant="outlined"
            error={this.state.emptyCity}
            helperText={this.state.emptyCityLabel}
            style={{ marginRight: 8 }}
            label="City"
            value={this.state.city}
            size="small"
            color="primary"
            margin="normal"
            onChange={(e) => this.setState({ city: e.target.value })}
          />
          <TextField
            name="area"
            variant="outlined"
            error={this.state.emptyArea}
            helperText={this.state.emptyAreaLabel}
            label="Area"
            style={{ marginRight: 8 }}
            value={this.state.area}
            size="small"
            color="primary"
            margin="normal"
            onChange={(e) => this.setState({ area: e.target.value })}
          />
          <TextField
            name="state"
            variant="outlined"
            error={this.state.emptyState}
            helperText={this.state.emptyStateLabel}
            label="Province"
            value={this.state.state}
            size="small"
            color="primary"
            margin="normal"
            onChange={(e) => this.setState({ state: e.target.value })}
          />
          <TextField
            name="address"
            variant="outlined"
            error={this.state.emptyAddress}
            helperText={this.state.emptyAddressLabel}
            label="Address"
            style={{ width: "81ch" }}
            value={this.state.address}
            size="small"
            color="primary"
            onChange={(e) => this.setState({ address: e.target.value })}
          />
          <TextField
            name="contact"
            variant="outlined"
            error={this.state.emptyContactNumber}
            helperText={this.state.emptyContactNumberLabel}
            label="Contact Number"
            style={{ marginTop: 6 }}
            value={this.state.contactNumber}
            size="small"
            color="primary"
            margin="normal"
            onChange={(e) => this.setState({ contactNumber: e.target.value })}
          />
        </form>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          style={{ marginRight: 5 }}
          endIcon={<PersonPinCircleRoundedIcon />}
          onClick={this.getLocation}
        >
          My Location
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: 5 }}
          type="submit"
          onClick={this.submitHandler}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<RotateLeftIcon />}
          onClick={this.resetHandler}
        >
          Reset
        </Button>
        <Snackbar
          open={this.state.successOpen}
          autoHideDuration={3000}
          onClose={this.handleAlertClose}
        >
          <Alert
            onClose={this.handleAlertClose}
            severity="success"
            variant="filled"
            elevation={6}
          >
            Your location is saved!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.failureOpen}
          autoHideDuration={3000}
          variant="filled"
          elevation={6}
          onClose={this.handleAlertClose}
        >
          <Alert onClose={this.handleAlertClose} severity="error">
            Please do not leave the fields empty.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default UserLocation;
