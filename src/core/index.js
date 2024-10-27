import client from './client';

// Example of CRUD request

export const getUsers = (params) => {
   return client.get('Users', {
      params
   });
};

export const getUser = (id, params) => {
   // for example https://host:port/users?id={ID}
   return client.get(`Users/${id}`, {
      ...params,
      id
   });
};

export const createUser = (data) => {
   return client.post('Users', data);
};

export const updateUser = (id, data) => {
   return client.put(`Users/${id}`, data);
   // or with Patch
   // return client.patch(`Users/${id}`, data);
};

export const deleteUser = (id) => {
   return client.delete(`Users/${id}`);
};
