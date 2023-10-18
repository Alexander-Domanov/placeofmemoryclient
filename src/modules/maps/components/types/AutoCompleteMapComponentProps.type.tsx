import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

export interface MapLocationProps {
  onDefineLocation: (location: google.maps.LatLngLiteral) => void;
}

export interface AutoCompleteMapComponentProps {
  onPlaceSelected: (place: IPlaceResultAfterExtract) => void;
}
