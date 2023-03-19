import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { RootState, useAppSelector } from "../../store";
import { proceedWithLogin, connectSocketIOServer } from "../../utils/socket";
import { setMyLocation } from "../MapPage/mapSlice";

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const isUsernameValid = (username: string) => {
  return username.length > 0 && username.length < 10 && !username.includes(" ");
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);

  const myLocation = useAppSelector(({ map }) => map.myLocation);

  const onSubmitClick = () => {
    if (!myLocation) return;
    proceedWithLogin({
      username,
      coords: {
        lng: myLocation.lng,
        lat: myLocation.lat,
      },
    });
    navigate("/map");
  };

  const onSuccess = (position: GeolocationPosition) => {
    console.log(position);
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const onError = (error: GeolocationPositionError) => {
    console.log("Error occurred when trying to get location");
    console.log(error);
    setLocationErrorOccurred(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      locationOptions
    );
  }, []);

  useEffect(() => {
    if (myLocation) {
      connectSocketIOServer();
    }
  }, [myLocation]);

  return (
    <div className="login">
      <div className="login__box">
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
        <button
          disabled={!isUsernameValid(username) || locationErrorOccurred}
          onClick={onSubmitClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
