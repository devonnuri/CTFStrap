import React from 'react';
import AdminBasePage from './AdminBasePage';

interface AdminMainPageProps {}

const AdminMainPage: React.FC<AdminMainPageProps> = () => {
  return (
    <AdminBasePage>
      <h1>Welcome!!</h1>
    </AdminBasePage>
  );
};

export default AdminMainPage;
