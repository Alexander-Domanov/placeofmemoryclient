// import React, { useState } from 'react';
// import { notification, Select } from 'antd';
// import {
//   ClockCircleOutlined,
//   EyeInvisibleOutlined,
//   EyeOutlined,
//   InboxOutlined,
// } from '@ant-design/icons';
// import { IPlace } from '@/types';
// import { useUpdatePlaceStatus } from '@/modules/places-module/hooks/useUpdatePlaceStatus';
//
// const { Option } = Select;
//
// interface UpdatePlaceStatusComponentProps {
//   place: IPlace | null;
// }
//
// const UpdatePlaceStatusComp: React.FC<UpdatePlaceStatusComponentProps> = ({
//   place,
// }) => {
//   const { id, status } = place || { id: null, status: null };
//   const [newStatus, setNewStatus] = useState(status);
//
//   const { updateStatusPlace } = useUpdatePlaceStatus();
//
//   const handleStatusChange = (selectedStatus: string) => {
//     setNewStatus(selectedStatus);
//
//     updateStatusPlace(
//       { id, status: selectedStatus },
//       {
//         onSuccess: () => {
//           notification.success({
//             message: `Changed status to: ${selectedStatus} for place: ${place?.nameCemetery}`,
//             placement: 'bottomLeft',
//           });
//         },
//       }
//     );
//   };
//
//   return (
//     <Select value={newStatus} onChange={handleStatusChange}>
//       <Option value="DRAFT">
//         <EyeInvisibleOutlined /> Draft
//       </Option>
//       <Option value="PENDING_REVIEW">
//         <ClockCircleOutlined /> Send for review
//       </Option>
//       <Option value="PUBLISHED">
//         <EyeOutlined /> Publish
//       </Option>
//       <Option value="ARCHIVED">
//         <InboxOutlined /> Archive
//       </Option>
//     </Select>
//   );
// };
//
// export default UpdatePlaceStatusComp;
