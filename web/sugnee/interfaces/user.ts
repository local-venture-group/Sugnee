import { FavoriteJobOffer } from "./job";
export interface User {
  id: number;
  appliedJobs: { friku: [FavoriteJobOffer]; om: [FavoriteJobOffer] };
  applied_at: string;
  birth: string;
  created_at: string;
  email: string;
  email_verified_at: string;
  favorites: { friku: [FavoriteJobOffer]; om: [FavoriteJobOffer] };
  first_name: string;
  first_name_kana: string;
  gender: number;
  img_path: string;
  last_name: string;
  last_name_kana: string;
  name: string;
  phone: string;
  updated_at: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: number;
  password: string;
  passwordConfirm: string;
}
