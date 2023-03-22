import L from "leaflet";

// 地圖初始化
let map;
const mapInit = () => {
  map = L.map("myMap", {
    center: [22.6489799, 120.33173],
    zoom: 17,
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
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
export { mapInit, mapPath };
