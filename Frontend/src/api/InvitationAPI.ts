import axiosClient from './axiosClient';
import { type Invitation, type InvitationForm } from '../types/warehouse';

const invitationApi = {
  getAll() {
    const url = '/invitations/received';
    return axiosClient.get(url);
  },

  create(data: Invitation) {
    const url = '/warehouse/invite-staff';
    return axiosClient.post(url, data);
  },

  accept(data: InvitationForm) {
    const url = '/invitations/accept';
    return axiosClient.post(url, data);
  },
  reject(data: InvitationForm) {
    const url = '/invitations/reject';
    return axiosClient.post(url, data);
  }
};

export default invitationApi;