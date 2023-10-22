import { FC } from 'react';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/router';
import { routes } from '@/common/routing/routes';

export const Articles: FC = () => {
  const router = useRouter();

  return (
    <div>
      <Flex justify="space-between" align="center" gap="middle">
        <div>
          <Button
            type="primary"
            onClick={() => router.push(routes.dashboard.articles.create)}
          >
            Add Article
          </Button>
        </div>
      </Flex>
    </div>
  );
};
