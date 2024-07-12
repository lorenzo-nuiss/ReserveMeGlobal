export type UserData = {
  id: number;
  date: string;
  firstname: string;
  lastname: string;
  guests: string;
  notes: string;
  phoneNumber: string;
  status: string;
  email: string;
};

export type ReservationsRepo = {
  id: number;
  civilite: string | null;
  date: string;
  date_expiration: Date | null;
  firstname: string;
  guests: number;
  lastname: string | null;
  notes: string | null;
  phoneNumber: string | null;
  status: string;
  restaurant_id: bigint | null;
  email: string | null;
};

export type FormData = {
  date: string | null; // Utilisez le type Dayjs pour le champ date
  civilite: string | null;
  firstname: string;
  lastname: string | null;
  guests: number;
  notes: string | null;
  phoneNumber: string | null;
  status?: string;
  email: string | null;
};

// ... le reste de votre code ...
