export const containerStyle = {
  height: '70%',
  width: '70%',
  borderRadius: '10px',
  // position: 'absolute',
  // overflow: 'none',
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  textOverflow: `ellipses`,
  marginBottom: '20px',
};
export const mapOptions = {
  styles: [
    {
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }],
    },
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'on' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#000000' }],
      // stylers: [{ color: '#666666' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#f5f5f5' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#000000' }],
      // stylers: [{ color: '#999999' }],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#000000' }],
      // stylers: [{ color: '#999999' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#cccccc' }],
      // stylers: [{ color: '#8fb68c' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
      // stylers: [{ color: '#444444' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      // stylers: [{ color: '#000000' }],
      stylers: [{ color: '#375a8c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#000000' }],
    },
  ],
};
