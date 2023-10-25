import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

export function extractPlaceData(
  place: google.maps.places.PlaceResult | google.maps.GeocoderResult
): IPlaceResultAfterExtract {
  return {
    country:
      place.address_components?.find((c) => c.types.includes('country'))
        ?.long_name || '',
    city:
      place.address_components?.find((c) => c.types.includes('locality'))
        ?.long_name || '',
    administrativeAreaLevel1:
      place.address_components?.find((c) =>
        c.types.includes('administrative_area_level_1')
      )?.long_name || '',
    administrativeAreaLevel2:
      place.address_components?.find((c) =>
        c.types.includes('administrative_area_level_2')
      )?.long_name || '',
    street:
      place.address_components?.find((c) => c.types.includes('route'))
        ?.long_name || '',
    streetNumber:
      place.address_components?.find((c) => c.types.includes('street_number'))
        ?.long_name || '',
    postalCode:
      place.address_components?.find((c) => c.types.includes('postal_code'))
        ?.long_name || '',
    location: {
      place: place.formatted_address?.split(',')[0] || '',
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
    },
    formattedAddress: place.formatted_address || '',
  };
}
