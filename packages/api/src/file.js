import API from './utils/API';

const api = new API();
const prefix = '/file';

const upload = ({ file }) => {
  const formData = new FormData();
  formData.append('file', file);

  return api
    .callApi({
      url: `${prefix}/upload`,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(result => result.data.result);
};

export default {
  upload
};
