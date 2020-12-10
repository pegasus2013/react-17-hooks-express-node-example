import http from './http';

const getAll = () => http.get('/contact');

const get = (id) => http.get(`/contact/${id}`);

const create = (data) => http.post('/contact', data);

const update = (id, data) => http.put(`/contact/${id}`, data);

const remove = (id) => http.delete(`/contact/${id}`);

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
