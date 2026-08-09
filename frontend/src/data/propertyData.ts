export interface Property {
  id: string;
  _id?: string;

  houseNumber: string;

  title: string;
  building: string;
  location: string;

  status: "available" | "occupied";

  rent: number;
  deposit: number;

  configuration: string;
  floor: string;
  furnishing: string;

  parking: boolean;
  parkingType?: string;

  petsAllowed?: boolean;
  petPolicy?: string;

  maintenance?: number;

  preferredTenants?: string;
  availableFrom?: string;

  amenities: string[];

  images: string[];
  video: string;

  description?: string;

  createdAt?: string;
  updatedAt?: string;
}

export const properties: Property[] = [
  {
    id: "101",

    houseNumber: "House 101",

    title: "2 BHK Apartment",

    building: "VNS Residency",

    location: "Bangalore, Karnataka",

    status: "available",

    rent: 20000,

    deposit: 100000,

    configuration: "2 BHK",

    floor: "1st Floor",

    furnishing: "Semi Furnished",

    parking: true,

    parkingType: "Covered Parking",

    petsAllowed: false,

    maintenance: 2000,

    preferredTenants: "Family / Working Professionals",

    availableFrom: "Immediately",

    amenities: [
      "24/7 Water Supply",
      "Power Backup",
      "Covered Parking",
      "Security",
      "Balcony",
    ],

    images: [
      "/properties/house-101/main.png",
      "/properties/house-101/living-room.png",
      "/properties/house-101/bedroom.png",
      "/properties/house-101/kitchen.png",
    ],

    video: "/properties/house-101/walkthrough.mp4",
  },

  {
    id: "103",

    houseNumber: "House 103",

    title: "1 BHK Apartment",

    building: "VNS Residency",

    location: "Bangalore, Karnataka",

    status: "available",

    rent: 15000,

    deposit: 75000,

    configuration: "1 BHK",

    floor: "2nd Floor",

    furnishing: "Fully Furnished",

    parking: true,

    parkingType: "Covered Parking",

    petsAllowed: false,

    maintenance: 1500,

    preferredTenants: "Working Professionals",

    availableFrom: "Immediately",

    amenities: [
      "24/7 Water Supply",
      "Power Backup",
      "Covered Parking",
      "Security",
      "Balcony",
    ],

    images: [
      "/properties/house-101/main.png",
      "/properties/house-101/living-room.png",
      "/properties/house-101/bedroom.png",
      "/properties/house-101/kitchen.png",
    ],

    video: "/properties/house-101/walkthrough.mp4",
  },

  {
    id: "104",

    houseNumber: "House 104",

    title: "2 BHK Apartment",

    building: "VNS Residency",

    location: "Bangalore, Karnataka",

    status: "available",

    rent: 22000,

    deposit: 110000,

    configuration: "2 BHK",

    floor: "3rd Floor",

    furnishing: "Semi Furnished",

    parking: true,

    parkingType: "Covered Parking",

    petsAllowed: true,

    maintenance: 2000,

    preferredTenants: "Family / Working Professionals",

    availableFrom: "Immediately",

    amenities: [
      "24/7 Water Supply",
      "Power Backup",
      "Covered Parking",
      "Security",
      "Balcony",
    ],

    images: [
      "/properties/house-101/main.png",
      "/properties/house-101/living-room.png",
      "/properties/house-101/bedroom.png",
      "/properties/house-101/kitchen.png",
    ],

    video: "/properties/house-101/walkthrough.mp4",
  },
];

export const house101 = properties[0];