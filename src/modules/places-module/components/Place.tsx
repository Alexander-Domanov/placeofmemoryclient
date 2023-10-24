import React, { FC, useEffect, useState } from 'react';
import { Breadcrumb, Card, Col, Flex, notification, Row } from 'antd';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import PlaceForm from '@/modules/places-module/components/PlaceForm';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile, IPlace } from '@/types';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { usePlace } from '@/modules/places-module/hooks/usePlace';
import { useUpdatePlace } from '@/modules/places-module/hooks/useUpdatePlace';
import { routes } from '@/common/routing/routes';
import { IResponseError } from '@/types/response-error-message.type';
import { CardLocationPreview } from '@/modules/maps/components/CardLocationPreview';

function breadcrumbs(
  id: string | string[] | undefined
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] {
  return [
    {
      key: routes.dashboard.index,
      title: <Link href={routes.dashboard.index}>Dashboard</Link>,
    },
    {
      key: routes.dashboard.places.index,
      title: <Link href={routes.dashboard.places.index}>Places</Link>,
    },
    {
      key: routes.dashboard.places.place(id as string),
      title: `${id}`,
    },
  ];
}
export const PlacePage: FC = () => {
  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);
  const router = useRouter();
  const { placeId } = router.query;

  const { place, isSuccess, isLoading } = usePlace(placeId);
  const { updatePlaceById } = useUpdatePlace();

  useEffect(() => {
    const inputPlace: Partial<IPlaceResultAfterExtract> = {
      country: place?.country,
      city: place?.city,
      formattedAddress: place?.nameCemetery,
      location: {
        name: place?.location?.place as string,
        lat: place?.location?.latitude as number,
        lng: place?.location?.longitude as number,
      },
    };
    if (place) {
      setSelectedPlace(place);
      setSelectedPlaceFromMap(inputPlace as IPlaceResultAfterExtract);
      selectedFiles.length === 0 && setSelectedFiles(place.photos);
    }
  }, [place]);

  const onFinish = (values: ICreatePlace) => {
    const newPlace: ICreatePlace = {
      ...values,
      ids: selectedFiles.map((file) => file.uploadId),
    };
    updatePlaceById(
      { id: placeId, place: newPlace },
      {
        onSuccess: (data) => {
          notification.success({
            message: 'Place updated successfully',
            description: 'You will be redirected to the place page',
            placement: 'bottomLeft',
          });
        },
        onError: (error: IResponseError) => {
          const messages = error?.response?.data?.messages;
          messages?.forEach(({ message }) => {
            notification.error({
              message: `Error: ${message}`,
              placement: 'bottomLeft',
            });
          });
        },
      }
    );
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(placeId)} />
      </div>
      <Row gutter={32}>
        <Col span={14} style={{ width: '100%' }}>
          <Card>
            <PlaceForm
              onPlaceSelectedFromMap={selectedPlaceFromMap}
              onFinish={onFinish}
              place={place}
            />
          </Card>
        </Col>
        <Col span={10} style={{ width: '100%' }}>
          <Card style={{ width: '100%', marginBottom: '32px' }}>
            <ChooseGalleryFiles
              onFilesSelected={setSelectedFiles}
              maxFileLimit={1}
              // inputFiles={place?.photos || []}
            />
          </Card>
          <Card>
            <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
            <CardLocationPreview onPlaceSelected={selectedPlaceFromMap} />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
