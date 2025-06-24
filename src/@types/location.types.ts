export interface addNewLocationType {
  name: string;
  state: string;
  country: string;
  adminId: string;
  locationImage?: string;
  description?: string;
}
export interface updateLocationType {
  name?: string;
  state?: string;
  country?: string;
  adminId?: string;
  locationImage?: string | null;
  description?: string;
}
