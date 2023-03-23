import L from "leaflet";

// 地圖初始化
let map;
const mapInit = () => {
  map = L.map("myMap", {
    center: [22.6489799, 120.33173],
    zoom: 17,
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  map.on("moveend", () => {
    if (!onFocus) return;
    let i = 0;
    for (const key in markersGroup._layers) {
      markersGroup._layers[key].setIcon(coloredIcon(cacheColor[i]));
      i++;
    }
    onFocus.setIcon(coloredIcon("", true));
  });
};

const flyTo = (latlng) => {
  map.flyTo(latlng);
};

// 建立巡查範圍
let path;
const mapPath = (latlngs) => {
  if (!!path) map.removeLayer(path); // path 初始化
  if (latlngs.length !== 0) {
    path = L.polyline(latlngs, {
      color: "#df0000",
      weight: 15,
    });
    path.addTo(map);
    map.fitBounds(path.getBounds());
  }
};

// 建立孔洞圖標
let markersGroup,
  marker,
  onFocus,
  cacheColor = [];
const mapMarkers = (res) => {
  if (!res) return;
  if (markersGroup && marker) {
    markersGroup.clearLayers();
    marker.off("click");
  } // markersGroup 初始化
  markersGroup = L.layerGroup().addTo(map);
  let bounds = [];
  res.map((item) => {
    const latlng = [item.LAT, item.LNG];
    bounds.push(latlng);
    marker = L.marker(latlng, {
      icon: coloredIcon(item.DTYPE),
    });
    cacheColor.push(item.DTYPE);
    marker.bindPopup(item.pipe_code).openPopup();
    marker.on("click", function () {
      map.flyTo(this.getLatLng());
      onFocus = this;
    });
    markersGroup.addLayer(marker);
  });
  map.fitBounds(bounds);
};

const coloredIcon = (dt, big = false) => {
  let output = "";
  switch (dt) {
    case "S1":
      output = "red";
      break;
    case "S2":
      output = "red";
      break;
    case "A":
      output = "orange";
      break;
    case "B":
      output = "yellow";
      break;
    case "C":
      output = "green";
      break;
    default:
      output = "blue";
      break;
  }
  let size;
  big ? (size = [40, 65.6]) : (size = [25, 41]);
  return L.icon({
    iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${output}.png`,
    iconSize: size,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
};
export { mapInit, mapPath, mapMarkers, flyTo };
