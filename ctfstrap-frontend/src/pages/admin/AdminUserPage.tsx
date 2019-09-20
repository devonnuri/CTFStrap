import React from 'react';
import AdminBasePage from './AdminBasePage';

interface AdminUserPageProps {}

const AdminUserPage: React.FC<AdminUserPageProps> = () => {
  return (
    <AdminBasePage>
      <h1>Manage Users</h1>
    </AdminBasePage>
  );
};

export default AdminUserPage;
