export interface School {
  id: string;
  business_name: string;
  description: string;
  zip_code: string;
  hourly_rate: number;
  dds_license_number: string;
  is_verified: boolean;
  rating: number;
  review_count: number;
  image: string;
  vehicles: string[];
  lesson_types: ('teen' | 'adult')[];
  car_type: 'sedan' | 'suv' | 'dual-control';
  owner_name: string;
  phone: string;
  email: string;
}

export interface TimeSlot {
  id: string;
  school_id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface Booking {
  id: string;
  school: School;
  slot: TimeSlot;
  status: 'pending' | 'confirmed' | 'completed';
  total_price: number;
}

export const mockSchools: School[] = [
  {
    id: "s1",
    business_name: "Peach State Driving Academy",
    description: "Premier driving instruction serving the Smyrna & Marietta area since 2015. We specialize in teen driver education with patient, certified instructors and dual-control vehicles for maximum safety.",
    zip_code: "30080",
    hourly_rate: 85,
    dds_license_number: "GA-DDS-2024-1847",
    is_verified: true,
    rating: 4.9,
    review_count: 142,
    image: "",
    vehicles: ["2024 Toyota Corolla (Dual Control)", "2023 Honda Civic"],
    lesson_types: ['teen', 'adult'],
    car_type: 'dual-control',
    owner_name: "Marcus Johnson",
    phone: "(678) 555-0142",
    email: "info@peachstatedriving.com",
  },
  {
    id: "s2",
    business_name: "Atlanta Safe Drivers",
    description: "Comprehensive driving lessons for teens and adults. Specializing in nervous beginners and defensive driving techniques. Flexible scheduling available 7 days a week.",
    zip_code: "30080",
    hourly_rate: 75,
    dds_license_number: "GA-DDS-2023-0923",
    is_verified: true,
    rating: 4.7,
    review_count: 89,
    image: "",
    vehicles: ["2023 Hyundai Elantra (Dual Control)"],
    lesson_types: ['teen', 'adult'],
    car_type: 'sedan',
    owner_name: "Lisa Chen",
    phone: "(404) 555-0198",
    email: "book@atlsafedrivers.com",
  },
  {
    id: "s3",
    business_name: "Cobb County Driving School",
    description: "Family-owned driving school with over 20 years of experience in the greater Atlanta area. We offer both in-car instruction and classroom courses for Joshua's Law compliance.",
    zip_code: "30082",
    hourly_rate: 95,
    dds_license_number: "GA-DDS-2022-3345",
    is_verified: true,
    rating: 4.8,
    review_count: 203,
    image: "",
    vehicles: ["2024 Kia Forte (Dual Control)", "2023 Toyota Camry", "2024 Honda HR-V"],
    lesson_types: ['teen'],
    car_type: 'dual-control',
    owner_name: "Robert Williams",
    phone: "(770) 555-0267",
    email: "hello@cobbdriving.com",
  },
  {
    id: "s4",
    business_name: "DriveRight ATL",
    description: "Modern, tech-forward driving instruction. We use dashcam reviews and progress tracking apps to accelerate your learning. Perfect for adult learners and international license transfers.",
    zip_code: "30339",
    hourly_rate: 110,
    dds_license_number: "GA-DDS-2024-5567",
    is_verified: false,
    rating: 4.6,
    review_count: 34,
    image: "",
    vehicles: ["2024 Tesla Model 3", "2024 Toyota RAV4"],
    lesson_types: ['adult'],
    car_type: 'suv',
    owner_name: "Priya Patel",
    phone: "(470) 555-0331",
    email: "lessons@driverightatl.com",
  },
  {
    id: "s5",
    business_name: "South Cobb Auto School",
    description: "Affordable, no-nonsense driving instruction. We get you road-ready fast with focused, practical lessons. Serving Smyrna, Mableton, and Austell.",
    zip_code: "30080",
    hourly_rate: 65,
    dds_license_number: "GA-DDS-2023-7782",
    is_verified: true,
    rating: 4.4,
    review_count: 67,
    image: "",
    vehicles: ["2022 Nissan Sentra (Dual Control)"],
    lesson_types: ['teen', 'adult'],
    car_type: 'sedan',
    owner_name: "James Carter",
    phone: "(678) 555-0455",
    email: "info@southcobbauto.com",
  },
];

// Generate availability for next 14 days
export function generateAvailability(schoolId: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();

  for (let day = 1; day <= 14; day++) {
    const date = new Date(now);
    date.setDate(now.getDate() + day);
    
    const slotCount = 3 + Math.floor(Math.random() * 4);
    const startHours = [8, 9, 10, 11, 13, 14, 15, 16, 17];
    const shuffled = startHours.sort(() => Math.random() - 0.5).slice(0, slotCount);
    
    for (const hour of shuffled) {
      const start = new Date(date);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(hour + 1);
      
      slots.push({
        id: `${schoolId}-${day}-${hour}`,
        school_id: schoolId,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        is_booked: Math.random() < 0.2,
      });
    }
  }
  return slots;
}

export const mockBookings: Booking[] = [
  {
    id: "b1",
    school: mockSchools[0],
    slot: {
      id: "slot-1",
      school_id: "s1",
      start_time: new Date(Date.now() + 2 * 86400000).toISOString(),
      end_time: new Date(Date.now() + 2 * 86400000 + 3600000).toISOString(),
      is_booked: true,
    },
    status: 'confirmed',
    total_price: 100,
  },
  {
    id: "b2",
    school: mockSchools[2],
    slot: {
      id: "slot-2",
      school_id: "s3",
      start_time: new Date(Date.now() + 5 * 86400000).toISOString(),
      end_time: new Date(Date.now() + 5 * 86400000 + 3600000).toISOString(),
      is_booked: true,
    },
    status: 'pending',
    total_price: 110,
  },
  {
    id: "b3",
    school: mockSchools[1],
    slot: {
      id: "slot-3",
      school_id: "s2",
      start_time: new Date(Date.now() - 3 * 86400000).toISOString(),
      end_time: new Date(Date.now() - 3 * 86400000 + 3600000).toISOString(),
      is_booked: true,
    },
    status: 'completed',
    total_price: 90,
  },
];
