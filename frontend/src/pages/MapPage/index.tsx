import React from "react";
import { Map, Marker, Point } from "pigeon-maps";
import "./style.scss";
import { useAppSelector } from "../../store";
import { Navigate } from "react-router-dom";
import { MarkerCustom } from "./MarkerCustom";

export default function MapPage() {
  const myLocation = useAppSelector(({ map }) => map.myLocation);
  const onlineUsers = useAppSelector(({ map }) => map.onlineUsers);

  if (!myLocation) {
    return <Navigate to="/" />;
  }

  const defaultCenter: Point = [myLocation.lat, myLocation.lng];

  return (
    <div className="map">
      <Map defaultCenter={defaultCenter} defaultZoom={11}>
        {onlineUsers.map((user) => (
          <Marker width={50} anchor={[user.coords.lat, user.coords.lng]}>
            <MarkerCustom {...user} />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
