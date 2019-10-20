import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FaFile } from 'react-icons/fa';

import AdminBasePage from './AdminBasePage';
import LabelInput from '../../components/common/LabelInput';
import PageTitle from '../../components/base/PageTitle';
import LabelTextArea from '../../components/common/LabelTextArea';
import Button from '../../components/common/Button';
import { createChall } from '../../lib/api/chall';
import { uploadFile } from '../../lib/api/file';
import palette from '../../lib/styles/palette';

const CreateForm = styled.form`
  margin: 5rem 0;
  padding: 0 15vw;
`;

const ButtonSet = styled.div`
  text-align: center;
`;

const FileListContainer = styled.div`
  margin: 1rem 0;
  div {
    svg,
    span {
      vertical-align: middle;
    }
    svg + span {
      margin-left: 0.5rem;
    }
  }
`;

const Dropzone = styled.div`
  margin-bottom: 2rem;
  padding: 0.3rem 1rem;
  border: 3px solid ${palette.primary400};
  outline: none;

  cursor: pointer;
  color: ${palette.primary800};
  background-color: ${palette.primary100};
  font-weight: bold;
`;

interface AdminChallCreatePageProps {}

const AdminChallCreatePage: React.FC<AdminChallCreatePageProps> = () => {
  const [form, setValues] = useState({
    name: '',
    description: '',
    points: '',
    category: '',
    author: '',
    tags: '',
    flags: '',
  });

  const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      Promise.all(acceptedFiles.map(file => uploadFile(file))).then(
        responses => {
          setFiles([...files, ...responses.map(res => res.data)]);
        },
      );
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    const {
      name, description, points, category, author, flags, tags,
    } = form;

    createChall({
      name,
      description,
      points: Number(points),
      category,
      author,
      flags: flags
        .split('\n')
        .filter(flag => flag)
        .map(content => ({ content })),
      tags: tags
        .split(',')
        .filter(tag => tag)
        .map(tagName => ({ name: tagName })),
      files,
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
        <FileListContainer>
          {files.map(file => (
            <div key={file.filename}>
              <FaFile />
              <span>{file.originalname}</span>
            </div>
          ))}
        </FileListContainer>
        <Dropzone {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
        </Dropzone>
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