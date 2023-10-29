import { FC, useMemo } from 'react';
import dynamic from 'next/dynamic';

interface Props {
  content: string;
  setContent: (name: string, value: string) => void;
}

export const TextEditor: FC<Props> = ({ content, setContent }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={(value) => setContent('content', value)}
    />
  );
};
