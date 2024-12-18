export interface Cashier {
  id: string;
  name: string;
  photoUrl: string;
  isActive: boolean;
  role: string;
}

export interface Register {
  id: string;
  name: string;
  isActive: boolean;
  cashiers: Cashier[];
}

export interface Area {
  id: string;
  name: string;
  registers: Register[];
}

export interface Manager {
  id: string;
  name: string;
  photoUrl: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  manager: Manager;
  areas: Area[];
  employeeCount: number;
}

