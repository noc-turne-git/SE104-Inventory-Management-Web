import axiosClient from './axiosClient';

export interface InviteStaffPayload {
  warehouseId: number;
  email: string;
  role: "Manager" | "Staff";
}

export interface InvitationActionPayload {
  InvitationId: string;
}

const invitationApi = {
  getAll() {
    const url = '/invitations/received';
    return axiosClient.get(url);
  },

  create(data: InviteStaffPayload) {
    const url = '/warehouse/invite-staff';
    return axiosClient.post(url, data);
  },

  accept(data: InvitationActionPayload) {
    const url = '/invitations/accept';
    return axiosClient.post(url, data);
  },
  reject(data: InvitationActionPayload) {
    const url = '/invitations/reject';
    return axiosClient.post(url, data);
  }
};

export default invitationApi;
