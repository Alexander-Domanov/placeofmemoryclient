import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';

export interface AutoCompleteMapComponentProps {
  onPlaceSelected: (place: IPlaceResultAfterExtract) => void;
}
