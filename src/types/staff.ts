export interface Infractions {
  id: string;
  datetime: string;
  reason: string;
  penalty: number;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'Manager' | 'Staff';
  // xóa position
  accountStatus: 'Active' | 'Inactive'; // Nghỉ việc hay chưa Manager quản lý
  //availability: 'Available' | 'Busy' | 'On Leave'; // rảnh / nghỉ phép ko tính lương / nghỉ phép có tính lương
  salary: number;
  hireDate: string;
  infractions: Infractions[];
  dob?: string; // date of birth
  phone?: string;
  address?: string; // Dấu ? vì address có thể không bắt buộc

  //THÔNG TIN XEM THÊM SAU KHI CLICK VÀO tạm chưa làm bàn bạc sau
  //leaveBalance: number; // Số ngày phép còn lại - 1 năm reset 1 lần
  //hourlyRate: number;
  //maxHoursPerWeek: number; // Giới hạn số giờ làm (tránh OT quá mức)
  //currentHoursThisWeek: number;
}