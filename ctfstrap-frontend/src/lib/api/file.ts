import client from './client';

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  console.log([...formData.entries()]);

  return client.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
