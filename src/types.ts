export type ServiceType = 'tour' | 'flight-hotel' | 'visa' | 'consultation';

export interface BaseFormData {
  fullName: string;
  phone: string;
  email?: string;
  additionalDetails: string;
}

export interface TourFormData extends BaseFormData {
  origin: string;
  destination: string;
  travelDate: string;
  duration: string;
  passengers: {
    adults: number;
    children: number; // 2-12 years
    infants: number;  // <2 years
  };
  hotelStars: string; // '3', '4', '5', 'any'
  transportType: string; // 'air', 'train', 'bus', 'any'
}

export interface FlightHotelFormData extends BaseFormData {
  flightType: 'round-trip' | 'one-way';
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: 'economy' | 'business' | 'first';
  roomType: 'single' | 'double' | 'triple' | 'family';
  mealPlan: 'room-only' | 'breakfast' | 'half-board' | 'all-inclusive';
}

export interface VisaFormData extends BaseFormData {
  destinationCountry: string;
  visaType: 'tourist' | 'business' | 'study' | 'other';
  applicantCount: number;
  jobTitle: string;
  financialStatus: string;
}

export interface ConsultationFormData extends BaseFormData {
  subject: string;
  preferredContact: 'phone' | 'whatsapp' | 'telegram';
}
