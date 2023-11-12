export const MarkupRenderer = ({ markup }: { markup: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
};
