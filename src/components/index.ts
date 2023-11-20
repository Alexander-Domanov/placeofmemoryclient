// layouts
export * from './layouts/LayoutWithHeader';
export { AuthLayout } from './layouts/AuthLayout';
export { Header } from './layouts/components/Header';
export { Container } from './layouts/components/Containter';
export { AvatarMenuHeader } from './layouts/components/avatar-menu/AvatarMenuHeader';
export { DropdownMenuHeader } from './layouts/components/avatar-menu/DropdownMenuHeader';
export * from './dashboard/dashboard-modals';
export { Footer } from './layouts/components/Footer';
export { getHomeLayout } from './layouts/HomeLayout';

// dashboard
export { DashboardSelectLanguage } from './dashboard/dashboard-select-language/DashboardSelectLanguage';

// dashboard helpers
export * from './dashboard/helpers/ColorStatusTag';
// export * from './dashboard/helpers/CreateBreadcrumb';
export * from './dashboard/helpers/GetCharacterCount.helper';
export * from './dashboard/helpers/GetEllipsisSlug.helper';
export * from './dashboard/helpers/QuillCharacterCount';
export * from './dashboard/helpers/RenderImage';
export * from './dashboard/helpers/CustomSelectInput';
export * from './dashboard/helpers/SupportedImageFormatsTooltip';
export * from './dashboard/helpers/MetaInfoForm';
export * from './dashboard/helpers/MetaInfoLocationForm';
export * from './dashboard/helpers/MetaInfoSelectedPlaceForm';
export * from './dashboard/helpers/GetUpdateOptions';
export * from './dashboard/helpers/DeleteConfirmationModal';
