import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { getChallList } from '../../lib/api/chall';
import { ChallengeModal } from '../../modules/chall';
import PageTitle from '../../components/base/PageTitle';
import Table from '../../components/base/Table';
import Badge from '../../components/base/Badge';
import AdminBasePage from './AdminBasePage';
import palette from '../../lib/styles/palette';

const ChallTable = styled(Table)`
  tbody td {
    &:nth-child(1) {
      width: 5%;
      text-align: center;
    }
    &:nth-child(3),
    &:nth-child(4) {
      width: 10%;
    }
    &:nth-child(5) {
      width: 20%;
      text-align: center;
    }

    &.create-chall {
      padding: 0;
      border-bottom: none;

      a {
        text-decoration: none;
        div {
          padding: 1rem;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;

          color: ${palette.primary700};
          background-color: ${palette.primary50};

          font-weight: bold;
          font-size: 1.1em;

          span {
            vertical-align: top;
          }

          svg + span {
            padding-left: 0.5rem;
          }

          &:hover {
            background-color: ${palette.primary100};
          }
        }
      }
    }
  }
`;

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
      <PageTitle>Manage Challenge</PageTitle>
      <ChallTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {challList.map(chall => (
            <tr key={chall.id}>
              <td>{chall.id}</td>
              <td>{chall.name}</td>
              <td>{chall.category}</td>
              <td>{chall.points}pts</td>
              <td>
                <Badge>Edit</Badge>
                <Badge>Remove</Badge>
              </td>
            </tr>
          ))}
          <tr>
            <td className="create-chall" colSpan={5}>
              <Link to="/admin/chall/create">
                <div>
                  <FaPlus />
                  <span>Create Challenge</span>
                </div>
              </Link>
            </td>
          </tr>
        </tbody>
      </ChallTable>
    </AdminBasePage>
  );
};

export default AdminChallPage;
