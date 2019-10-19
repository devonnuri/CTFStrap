import client from './client';

export interface FileData {
  filename: string;
  originalname: string;
  path: string;
  size: number;
}

export const downloadFile = (filename: string, originalname: string) =>
  client.get(`/file/download/${filename}`, {responseType: 'blob'})
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalname);
      document.body.appendChild(link);
      link.click();
    })

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
