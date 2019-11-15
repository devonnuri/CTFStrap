import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FaFile } from 'react-icons/fa';
import { RootState } from '../../modules';
import { closeChallModal } from '../../modules/chall';
import LabelInput from '../common/LabelInput';
import palette from '../../lib/styles/palette';
import { authChall } from '../../lib/api/chall';
import Alert from '../common/Alert';
import Badge from '../common/Badge';
import { downloadFile } from '../../lib/api/file';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.16);
`;

const ChallModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  padding: 2rem;

  background-color: white;

  .name,
  .points,
  .tag-list {
    text-align: center;
  }

  .name {
    font-size: 2em;
    margin: 0.5rem 0;
  }

  .points {
    font-size: 1.4em;
    margin: 0;
  }

  .tag-list {
    padding: 1rem 0;
  }

  .download-file {
    display: table;
    margin-top: 0.3rem;
    padding: 0.5rem 0.7rem;

    cursor: pointer;
    font-size: 1em;
    background-color: ${palette.gray100};

    svg + span {
      margin-left: 0.5rem;
    }
  }
`;

const mapStateToProps = (state: RootState) => ({
  modalChall: state.chall.modalChall,
});

const mapDispatchToProps = { closeChallModal };

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type ChallModalProps = OwnProps & StateProps & DispatchProps;

const ChallModal: React.FC<ChallModalProps> = ({
  modalChall,
  closeChallModal,
}) => {
  const [flag, setFlag] = useState('');
  const [authState, setAuthState] = useState('INITIAL');

  if (!modalChall) {
    return null;
  }

  const onSubmit = (event: React.FormEvent) => {
    authChall(modalChall.id, flag)
      .then(() => {
        setAuthState('SUCCESS');
      })
      .catch(() => {
        setAuthState('FAIL');
      });

    setFlag('');

    event.preventDefault();
  };

  const onDownload = (filename: string, originalname: string) => {
    downloadFile(filename, originalname);
  };

  const { name, points, description, author, files, tags, solved } = modalChall;

  return (
    <>
      <ModalOverlay
        onClick={() => {
          setFlag('');
          setAuthState('INITIAL');
          closeChallModal();
        }}
      />
      <ChallModalContainer>
        <h2 className="name">{name}</h2>
        <h3 className="points">
          {points}
          pts
        </h3>
        {tags && (
          <div className="tag-list">
            {tags.map(tag => (
              <Badge key={tag.name}>{tag.name}</Badge>
            ))}
            {solved && <Badge bgColor={palette.primary600}>Solved</Badge>}
          </div>
        )}
        <p className="description">{description}</p>
        {author && <p className="author">{`Author: ${author}`}</p>}
        {files &&
          files.map(({ filename, originalname }) => (
            <button
              type="button"
              className="download-file"
              onClick={() => onDownload(filename, originalname)}
            >
              <FaFile />
              <span>{originalname}</span>
            </button>
          ))}
        <form onSubmit={onSubmit}>
          <LabelInput
            label="Flag"
            value={flag}
            onChange={event => setFlag(event.target.value)}
          />
        </form>
        {authState === 'SUCCESS' ? (
          <Alert color="primary">Correct!</Alert>
        ) : (
          authState === 'FAIL' && <Alert color="secondary">Incorrect!</Alert>
        )}
      </ChallModalContainer>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(ChallModal);
