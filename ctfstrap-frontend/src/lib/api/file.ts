import client from './client';

export interface FileData {
  filename: string;
  originalname: string;
  path: string;
  size: number;
}

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  console.log([...formData.entries()]);

  return client.post<FileData>('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
