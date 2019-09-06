import React, { useState, useEffect } from 'react';
import { getChallList } from '../../lib/api/chall';
import { ChallengeModal } from '../../modules/chall';
import AdminBasePage from './AdminBasePage';

interface AdminChallPageProps {}

const AdminChallPage: React.FC<AdminChallPageProps> = () => {
  const [challList, setChallList] = useState<ChallengeModal[]>([]);

  useEffect(() => {
    getChallList().then(({ data }) => {
      setChallList(data);
    });
  }, []);

  return (
    <AdminBasePage>
      <h1>Manage Challenges</h1>
    </AdminBasePage>
  );
};

export default AdminChallPage;
