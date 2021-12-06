export interface JobOffer {
  id: number;
  company_id: number;
  url: string;
  job_offer_status: number;
  preview_id: string;
  company_name: string;
  item_name: string;
  work_type: string;
  hiring_system: string;
  job_type: string;
  job_description: string;
  work_time?: string;
  work_flow?: string;
  trial: string;
  trial_condition: number;
  trial_period?: string;
  holiday_description: string;
  welfare_description: string;
  period_min?: string;
  shift_circle?: string;
  environment_gender_ratio?: number;
  worker_message?: string;
  work_location?: string;
  access?: string;
  zip_code?: string;
  prefecture?: number;
  city?: string;
  building?: string;
  salary_pattern: number;
  salary_min?: string;
  salary_max?: string;
  salary_description?: string;
  travel_cost: string;
  travel_cost_description?: string;
  shift_income_example?: string;
  image1_caption?: string;
  image2_caption?: string;
  image3_caption?: string;
  image4_caption?: string;
  applied_flow?: string;
  phone?: string;
  recruit_number?: string;
  recruit_number_description?: string;
  is_crawled: boolean;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  type_of_job: [number];
  created_at: string;
  updated_at: string;
}

export interface JobSearchFormData {
  locations?: [string];
  keyWords?: [string];
  workType?: [string];
}

// ピックアップ企業
export interface pickupArticle {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  companyId: string;
  companyName: string;
  companyAddress: string;
  companyLogo?: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
  companyUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  description: string;
}
