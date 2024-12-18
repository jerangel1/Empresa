export interface Administrator {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl: string;
  permissions: string[];
}

export interface ActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  timestamp: string;
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  permissions: string[];
  description: string;
}

