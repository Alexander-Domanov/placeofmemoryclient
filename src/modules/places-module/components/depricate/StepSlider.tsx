// import { FC } from 'react';
// import { Flex, Slider } from 'antd';
//
// interface StepSliderProps {
//   status: string;
// }
// const StepSlider: FC<StepSliderProps> = ({ status }) => {
//   let position = 0;
//   if (status === 'DRAFT') {
//     position = 0;
//   } else if (status === 'PENDING_REVIEW') {
//     position = 33;
//   } else if (status === 'PUBLISHED') {
//     position = 66;
//   } else if (status === 'ARCHIVED') {
//     position = 100;
//   }
//
//   return (
//     <Flex gap="large" vertical>
//       <Slider
//         min={0}
//         step={1}
//         marks={{
//           0: 'Draft',
//           33: 'Pending to Review',
//           66: 'Publish',
//           100: 'Archived',
//         }}
//         styles={{
//           tracks: {
//             backgroundColor: '#5dd771',
//           },
//         }}
//         value={position}
//         disabled
//       />
//     </Flex>
//   );
// };
//
// export default StepSlider;
