import React from 'react';
import AdminBasePage from './AdminBasePage';

interface AdminChallPageProps {}

const AdminChallPage: React.FC<AdminChallPageProps> = () => {
  return (
    <AdminBasePage>
      <h1>Manage Challenges</h1>
    </AdminBasePage>
  );
};

export default AdminChallPage;
