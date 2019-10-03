import React, { useState } from 'react';
import AdminBasePage from './AdminBasePage';
import LabelInput from '../../components/common/LabelInput';
import styled from 'styled-components';
import PageTitle from '../../components/base/PageTitle';
import LabelTextArea from '../../components/common/LabelTextArea';
import Button from '../../components/common/Button';
import { createChall } from '../../lib/api/chall';

const CreateForm = styled.form`
  margin: 5rem 0;
  padding: 0 15vw;
`;

const ButtonSet = styled.div`
  text-align: center;
`;

interface AdminChallCreatePageProps {}

const AdminChallCreatePage: React.FC<AdminChallCreatePageProps> = () => {
  const [form, setValues] = useState({
    name: '',
    description: '',
    points: '',
    category: '',
    author: '',
    flag: '',
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    const { name, description, points, category, author, flag } = form;

    createChall({
      name,
      description,
      points: Number(points),
      category,
      author,
      flags: [{ content: flag }],
    });

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
          required
        />
        <LabelInput
          name="author"
          label="Author"
          value={form.author}
          onChange={updateField}
        />
        <LabelInput
          name="category"
          label="Category"
          value={form.category}
          onChange={updateField}
          required
        />
        <LabelInput
          type="number"
          name="points"
          label="Points"
          min="0"
          value={form.points}
          onChange={updateField}
          required
        />
        <LabelTextArea
          name="description"
          label="Description"
          value={form.description}
          onChange={updateField}
          required
        />
        <ButtonSet>
          <Button type="submit" size="large" onClick={onSubmit}>
            Create
          </Button>
        </ButtonSet>
      </CreateForm>
    </AdminBasePage>
  );
};

export default AdminChallCreatePage;
