import React, { FC, useEffect, useState } from 'react';
import { Flex } from 'antd';
import { IPlace } from '@/types';
import StepSlider from '@/modules/places-module/components/StepSlider';

interface CardActionsPreviewProps {
  onPlaceSelected: IPlace | null;
}

export const CardActionsPreview: FC<CardActionsPreviewProps> = ({
  onPlaceSelected,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);

  useEffect(() => {
    setSelectedPlace(onPlaceSelected);
  }, [onPlaceSelected]);

  return (
    <Flex gap="large" vertical>
      <StepSlider status={selectedPlace?.status as string} />
    </Flex>
  );
};
