import axiosClient from './axiosClient';

export interface InfractionCreatePayload {
  userId: number;
  date: string;
  description: string;
  penalty: number;
}

const infractionApi = {
  create(warehouseId: number, data: InfractionCreatePayload) {
    const url = `/warehouses/${warehouseId}/infractions`;
    return axiosClient.post(url, data);
  },
};

export default infractionApi;
