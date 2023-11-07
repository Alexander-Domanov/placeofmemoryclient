// import dynamic from 'next/dynamic';
//
// const LazyMap = dynamic(
//   () => import('@/modules/leaflet-maps-module/components/LeafletMap'),
//   { ssr: false }
// );
//
// export const LazyMarker = dynamic(
//   async () => (await import('react-leaflet')).Marker,
//   { ssr: false }
// );
//
// export const LazyMarkerCluster = dynamic(
//   async () =>
//     await import('@/modules/leaflet-maps-module/components/MarkerCluster'),
//   {
//     ssr: false,
//   }
// );
//
// export default LazyMap;
