export interface User {
  id: string;
  userName: string;
  email: string;
  dob: string; // date of birth
  phone: string;
  address?: string; // Dấu ? vì address có thể không bắt buộc
  role: 'manager' | 'staff' | ''; 
}

export interface SignupFormData extends User {
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}
