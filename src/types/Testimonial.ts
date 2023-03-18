export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export type Testimonial = {
  id: string
  project_id: string;
  name?: string
  avatar?: string
  tagline?: string
  body?: string
  url?: string
  status: Status
  created_at: string
  updated_at: string
}

