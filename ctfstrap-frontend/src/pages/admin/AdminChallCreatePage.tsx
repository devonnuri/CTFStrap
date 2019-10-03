import React, { useState } from 'react';
import AdminBasePage from './AdminBasePage';
import LabelInput from '../../components/common/LabelInput';
import styled from 'styled-components';
import PageTitle from '../../components/base/PageTitle';
import LabelTextArea from '../../components/common/LabelTextArea';

const CreateForm = styled.form`
  margin: 5rem 0;
  padding: 0 15vw;
`;

interface AdminChallCreatePageProps {}

const AdminChallCreatePage: React.FC<AdminChallCreatePageProps> = () => {
  const [form, setValues] = useState({
    name: '',
    description: '',
    points: '',
    category: '',
    author: '',
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <AdminBasePage>
      <PageTitle>Create Challenge</PageTitle>

      <CreateForm onSubmit={onSubmit}>
        <LabelInput
          name="name"
          label="Name"
          value={form.name}
          onChange={updateField}
        />
        <LabelInput
          name="category"
          label="Category"
          value={form.category}
          onChange={updateField}
        />
        <LabelInput
          type="number"
          name="points"
          label="Points"
          min="0"
          value={form.points}
          onChange={updateField}
        />
        <LabelTextArea
          name="description"
          label="Description"
          value={form.description}
          onChange={updateField}
        />
      </CreateForm>
    </AdminBasePage>
  );
};

export default AdminChallCreatePage;
