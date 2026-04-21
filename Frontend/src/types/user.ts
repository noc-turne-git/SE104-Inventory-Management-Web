export interface User {
  id: string;
  fullName: string;
  email: string;
  dob: string; // date of birth
  phone: string;
  address?: string; // Dấu ? vì address có thể không bắt buộc
  //role: 'manager' | 'staff' | ''; 
}

export interface SignupFormData {
  fullName: string;
  email: string;
  dob: string; // date of birth
  phone: string;
  address?: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface forgotpasswordFormData {
  email: string;
}

export interface verifyOtpFormData {
  email: string | null;
  otp: string;
}

export interface resetPasswordFormData {
  resetPassToken: string| null;
  newPass: string;
  confirmNewPass: string ;
}

export interface refreshFormData {
  refreshToken: string;
  accessToken: string;
}
