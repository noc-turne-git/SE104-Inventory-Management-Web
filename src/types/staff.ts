export interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'Manager' | 'Staff';
  //availability: 'Available' | 'Busy'; // rảnh / nghỉ phép
  salary: number;
  hireDate: string;

  //THÔNG TIN XEM THÊM SAU KHI CLICK VÀO tạm chưa làm bàn bạc sau
  //infractions: number; // cái này t muốn là click nv vào sẽ hiện ra ds giống product hiện ra ds supplier
  //leaveBalance: number; // Số ngày phép còn lại - 1 năm reset 1 lần
  //hourlyRate: number;
  //maxHoursPerWeek: number; // Giới hạn số giờ làm (tránh OT quá mức)
  //currentHoursThisWeek: number;
}