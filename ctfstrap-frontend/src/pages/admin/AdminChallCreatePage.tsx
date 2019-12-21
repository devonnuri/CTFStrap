import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FaFile } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router-dom';
import AdminBasePage from './AdminBasePage';
import LabelInput from '../../components/common/LabelInput';
import PageTitle from '../../components/base/PageTitle';
import LabelTextArea from '../../components/common/LabelTextArea';
import Button from '../../components/common/Button';
import { createChall, viewChall, updateChall } from '../../lib/api/chall';
import { uploadFile, FileData } from '../../lib/api/file';
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

const InputGroup = styled.div`
  padding: 0.3rem 1rem;
  border: 3px solid ${palette.gray400};
  background-color: ${palette.gray50};

  h3 {
    color: ${palette.gray800};
    margin: 0.5rem 0;
  }

  & + & {
    margin-top: 1rem;
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

interface MatchParams {
  challId: string;
}

interface AdminChallCreatePageProps extends RouteComponentProps<MatchParams> {}

const AdminChallCreatePage: React.FC<AdminChallCreatePageProps> = ({
  match,
  history,
}) => {
  const [form, setValues] = useState({
    name: '',
    description: '',
    points: '',
    category: '',
    author: '',
    tags: '',
    flags: '',
  });

  const [files, setFiles] = useState<FileData[]>([]);

  const isEdit = !!match.params.challId;

  useEffect(() => {
    if (isEdit) {
      viewChall(Number(match.params.challId)).then(response => {
        const {
          name,
          description,
          points,
          category,
          author,
          files,
          tags,
          flags,
        } = response.data;

        setValues({
          name,
          description,
          points: String(points),
          category,
          author: author || '',
          tags: tags ? tags.map(e => e.name).join(',') : '',
          flags: flags ? flags.map(e => e.content).join('\n') : '',
        });

        if (files) {
          setFiles(files);
        }
      });
    }
  }, [isEdit, match.params.challId]);

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

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      const { name, description, points, category, author, flags, tags } = form;

      const inputData = {
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
        files: files.map(({ id }) => ({ id })),
      };

      if (isEdit) {
        updateChall({ ...inputData, id: Number(match.params.challId) });
      } else {
        createChall(inputData);
      }

      event.preventDefault();

      history.push('/admin/chall');
    },
    [isEdit, match.params.challId, form, files, history],
  );

  return (
    <AdminBasePage>
      <PageTitle>{`${isEdit ? 'Edit' : 'Create'} Challenge`}</PageTitle>

      <CreateForm onSubmit={onSubmit}>
        <InputGroup>
          <h3>Brief Information</h3>
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
          <LabelTextArea
            name="description"
            label="Description"
            value={form.description}
            onChange={updateField}
            required
          />
        </InputGroup>
        <InputGroup>
          <h3>Scoring</h3>
          <LabelInput
            type="number"
            name="points"
            label="Points"
            min="0"
            value={form.points}
            onChange={updateField}
            required
          />
        </InputGroup>
        <InputGroup>
          <h3>Flags</h3>
          <LabelTextArea
            name="flags"
            label="Flags (separated by newline)"
            value={form.flags}
            onChange={updateField}
            required
          />
        </InputGroup>
        <InputGroup>
          <h3>Tags</h3>
          <LabelTextArea
            name="tags"
            label="Tags (separated by comma)"
            value={form.tags}
            onChange={updateField}
            required
          />
        </InputGroup>
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
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </ButtonSet>
      </CreateForm>
    </AdminBasePage>
  );
};

export default AdminChallCreatePage;
