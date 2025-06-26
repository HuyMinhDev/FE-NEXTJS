export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other" | "";
  role: "Admin" | "User" | "Moderator" | "";
  avatar: string;
  password: string;
}
// Input cho form đăng nhập
export interface LoginInput {
  email: string;
  password: string;
}

// Kết quả trả về khi đăng nhập thành công
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  avatar: string;
  password: string;
}
