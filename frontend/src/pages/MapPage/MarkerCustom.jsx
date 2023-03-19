import { useAppDispatch } from "../../store";
import locationIcon from "../../assets/images/location-icon.svg";

export const MarkerCustom = (props) => {
  const { myself, socketId, username, coords } = props;
  const dispatch = useAppDispatch();

  const handleOptionChoose = () => {
    if (!myself) {
      /*  dispatch(
        setCardChosenOption({
          socketId: socketId,
          username: username,
          coords: coords,
        })
      ); */
    }
  };

  return (
    <div className="map_page_marker_container" onClick={handleOptionChoose}>
      <img
        style={myself ? { filter: "hue-rotate(125deg)" } : {}}
        src={locationIcon}
        alt={username || ""}
        className="map_page_marker_img"
      />
      <p className="map_page_marker_text">{myself ? "Me" : username}</p>
    </div>
  );
};
