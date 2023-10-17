export interface IPlaceResultAfterExtract {
  country: string;
  city: string;
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  formattedAddress: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
}
