import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Compass } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CITY_COORDS = {
  "New York": [40.7128, -74.0060],
  "San Francisco": [37.7749, -122.4194],
  "London": [51.5074, -0.1278],
  "Tokyo": [35.6762, 139.6503],
  "Sydney": [-33.8688, 151.2093],
  "Edinburgh": [55.9533, -3.1883],
  "Singapore": [1.3521, 103.8198],
  "Kolkata": [22.5726, 88.3639],
  "Delhi": [28.6139, 77.2090],
  "Punjab": [31.1471, 75.3412],
  "Chandigarh": [30.7333, 76.7794]
};

const MapVisualization = ({ data }) => {
  const locations = data.reduce((acc, item) => {
    const city = item[2];
    if (city && CITY_COORDS[city]) {
      if (!acc[city]) {
        acc[city] = { coords: CITY_COORDS[city], count: 0, employees: [] };
      }
      acc[city].count++;
      acc[city].employees.push(item[0]);
    }
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col p-2 md:p-4 relative overflow-hidden">
      <div className="p-4 md:p-8 z-10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 md:gap-4 uppercase tracking-tight">
            <Compass className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
            Celestial Domain
          </h3>
          <p className="text-purple-200/30 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-2 sm:ml-12">Employee distribution across realms</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 px-4 md:px-6 py-2 md:py-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-right">
            <p className="text-[8px] md:text-[10px] font-black text-yellow-500 uppercase tracking-widest">Active Realms</p>
            <p className="text-lg md:text-xl font-black text-white">{Object.keys(locations).length}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-[1.5rem] md:rounded-[3.5rem] overflow-hidden border-4 md:border-8 border-white/5 m-2 md:m-4 shadow-2xl relative group">
        <MapContainer
          center={[20, 80]}
          zoom={3}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", filter: "invert(100%) hue-rotate(180deg) brightness(1.2) contrast(0.8)" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Object.entries(locations).map(([city, info], index) => (
            <Marker key={index} position={info.coords}>
              <Popup className="astral-popup">
                <div className="p-3 md:p-4 bg-[#1a0b2e] text-white rounded-xl md:rounded-2xl border border-yellow-500/20 min-w-[150px] md:min-w-[200px]">
                  <p className="text-[8px] md:text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-2 md:mb-3 border-b border-yellow-500/10 pb-2">{city}</p>
                  <p className="text-xl md:text-2xl font-black mb-3 md:mb-4">{info.count} <span className="text-[8px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1">Subjects</span></p>
                  <div className="space-y-1 md:space-y-2">
                    {info.employees.slice(0, 4).map((emp, i) => (
                      <p key={i} className="text-[8px] md:text-[10px] text-purple-200/60 font-bold uppercase truncate">{emp}</p>
                    ))}
                    {info.count > 4 && <p className="text-[8px] md:text-[10px] text-yellow-500/40 italic font-black">+ {info.count - 4} COSMIC ENTITIES</p>}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="absolute inset-0 pointer-events-none border-[10px] md:border-[40px] border-black/10 rounded-[1.5rem] md:rounded-[2.5rem] z-[1000]" />
      </div>

      <div className="hidden md:flex absolute bottom-8 right-8 bg-yellow-500 text-black px-4 md:px-6 py-2 md:py-3 rounded-full font-black text-[8px] md:text-[10px] tracking-[0.3em] uppercase shadow-2xl z-[1000] glow-gold items-center gap-2 md:gap-3">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black animate-pulse" />
        Synchronizing Star Map
      </div>
    </div>
  );
};

export default MapVisualization;