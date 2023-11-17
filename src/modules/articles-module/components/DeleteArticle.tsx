import React from 'react';
import { List } from 'antd';
import { IArticle } from '@/types';
import DeleteArticleModal from '@/modules/articles-module/components/DeleteArticleModal';

interface DeleteArticleComponentProps {
  article: IArticle | null;
}
const DeleteArticleComponent: React.FC<DeleteArticleComponentProps> = ({
  article,
}) => {
  return (
    <>
      <List.Item
        actions={[
          <DeleteArticleModal
            key="delete-modal"
            article={article}
            showButton={false}
          />,
        ]}
      />
    </>
  );
};

export default DeleteArticleComponent;
