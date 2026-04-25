import axiosClient from './axiosClient';
import { type Invitation } from '../types/warehouse';

const invitationApi = {
  getAll() {
    const url = '/invitations/received';
    return axiosClient.get(url);
  },

  create(data: Invitation) {
    const url = '/invitations';
    return axiosClient.post(url, data);
  }
};

export default invitationApi;