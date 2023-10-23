import {
  ArticlesBlock,
  GravesArchiveBlock,
  InteractiveMapBlock,
} from '@/modules/home-module';
import { ContainerHomeBlock } from '@/modules/home-module/components/pages-block/ContainerHomeBlock';

export const HomePage = () => {
  return (
    <>
      <ContainerHomeBlock className="relative bg-dark-700">
        <GravesArchiveBlock />
      </ContainerHomeBlock>
      <ContainerHomeBlock className="relative bg-dark-900">
        <ArticlesBlock />
      </ContainerHomeBlock>
      <ContainerHomeBlock className="bg-light-100">
        <InteractiveMapBlock />
      </ContainerHomeBlock>
    </>
  );
};
