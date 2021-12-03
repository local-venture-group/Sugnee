export interface Staff {
  id: number;
  username: string;
  last_name: string;
  first_name: string;
  email: string;
  is_active: Boolean;
  is_staff: Boolean;
  is_superuser: Boolean;
  last_login?: Date;
  date_joined: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SignupFormData {
  companyName: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
