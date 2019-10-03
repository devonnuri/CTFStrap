import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    border-bottom: 2px solid gray;

    padding: 1rem;
  }

  tbody td {
    border-bottom: 1px solid gray;
    padding: 1rem;
  }
`;

export default Table;
