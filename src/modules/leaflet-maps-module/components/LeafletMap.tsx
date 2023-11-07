// import {
//   MapContainer,
//   MapContainerProps,
//   Marker,
//   Popup,
//   TileLayer,
// } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility';
// import React, { FC } from 'react';
// import { Flex } from 'antd';
// import L, { MapOptions } from 'leaflet';
//
// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: '/leaflet/map-marker.svg',
//   iconRetinaUrl: '/leaflet/map-marker.svg',
//   iconSize: [36, 36],
//   iconAnchor: [12, 36],
//   shadowUrl: '/leaflet/marker-shadow.png',
//   shadowRetinaUrl: '/leaflet/marker-shadow.png',
//   shadowSize: [41, 41],
//   shadowAnchor: [12, 41],
// });
//
// interface LeafletMapProps {
//   center: [number, number];
//   zoom: number;
//   // locations: IPerson[];
//   // children?: ReactNode;
// }
//
// const LeafletMap: FC<LeafletMapProps & MapContainerProps & MapOptions> = ({
//   children,
//   ...options
// }) => {
//   // const [mapCenter, setMapCenter] = useState(center);
//   // const [selectedLocations, setSelectedLocations] = useState<IPerson[]>([]);
//   // const [mapZoom, setMapZoom] = useState(15);
//
//   // const mapRef = useRef<any>(null);
//   // useEffect(() => {
//   //   if (center) {
//   //     setMapCenter(center);
//   //     // setSelectedLocations(locations);
//   //     // setMapZoom(14);
//   //   }
//   // }, [center]);
//
//   // const panTo = (location: [number, number]) => {
//   //   setMapCenter(location);
//   //   setMapZoom(14);
//   // };
//
//   return (
//     <Flex gap="large" vertical>
//       {/* <Button onClick={() => panTo(mapCenter)}>Go to Location</Button> */}
//       <MapContainer
//         className="h-[200px] w-full relative"
//         // center={mapCenter}
//         // zoom={mapZoom}
//         {...options}
//         scrollWheelZoom
//         style={{ height: '500px', width: '100%', borderRadius: '10px' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={options.center} key="place">
//           <Popup>Hey ! you found me</Popup>
//         </Marker>
//         {children}
//       </MapContainer>
//     </Flex>
//   );
// };
//
// export default LeafletMap;
