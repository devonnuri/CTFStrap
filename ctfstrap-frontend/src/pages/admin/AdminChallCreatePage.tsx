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

const UploadSet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 3 1;
    margin: 0;
  }

  button {
    margin-left: 1rem;
  }
`;

interface AdminChallCreatePageProps {}

const AdminChallCreatePage: React.FC<AdminChallCreatePageProps> = () => {
  const [form, setValues] = useState({
    name: '',
    description: '',
    points: '',
    category: '',
    author: '',
    files: '',
    tags: '',
    flags: '',
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    const { name, description, points, category, author, flags, tags } = form;

    createChall({
      name,
      description,
      points: Number(points),
      category,
      author,
      flags: flags.split('\n').map(content => ({ content })),
      tags: tags.split(',').map(name => ({ name })),
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
        <UploadSet>
          <LabelTextArea
            name="files"
            label="Files (seperated by newline)"
            value={form.files}
            onChange={updateField}
            required
          />
          <Button size="medium" color="lightGray">
            Upload
          </Button>
        </UploadSet>
        <LabelTextArea
          name="flags"
          label="Flags (seperated by newline)"
          value={form.flags}
          onChange={updateField}
          required
        />
        <LabelTextArea
          name="tags"
          label="Tags (seperated by comma)"
          value={form.tags}
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
