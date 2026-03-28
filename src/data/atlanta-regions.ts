export interface Region {
  city: string;
  slug: string;
  zipCodes: string[];
}

export const atlantaRegions: Region[] = [
  {
    city: "Marietta",
    slug: "marietta",
    zipCodes: ["30060", "30062", "30064", "30066", "30067", "30068"],
  },
  {
    city: "Alpharetta",
    slug: "alpharetta",
    zipCodes: ["30004", "30005", "30009", "30022", "30023"],
  },
  {
    city: "Roswell",
    slug: "roswell",
    zipCodes: ["30075", "30076", "30077"],
  },
  {
    city: "Sandy Springs",
    slug: "sandy-springs",
    zipCodes: ["30328", "30350", "30358"],
  },
  {
    city: "Lawrenceville",
    slug: "lawrenceville",
    zipCodes: ["30043", "30044", "30045", "30046"],
  },
  {
    city: "Smyrna",
    slug: "smyrna",
    zipCodes: ["30080", "30081", "30082"],
  }
];
