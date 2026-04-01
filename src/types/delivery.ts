export interface Delivery {
    id : string;
    deliveryNumber: string; // DN-YYYYMMDD-001
    dateCreated: string;
    status: 'new' | 'in process' | 'pending' | 'approved' | 'rejected';
    destination: string;
    items: {
        product: string;
        quantity: number;
    }[];
    picker: string,
};

export type DeliveryFormData = Omit<Delivery, 'id' | 'deliveryNumber'> & {

}