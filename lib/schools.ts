export type School = {
  id: string;
  name: string;
  dorm: string;
  dimensions: {
    width: number;  // feet
    depth: number;  // feet
    height: number; // feet
  };
};

export const SCHOOLS: Record<string, School> = {
  tulane: {
    id: "tulane",
    name: "Tulane University",
    dorm: "Monroe Hall",
    dimensions: {
      width: 15.92,
      depth: 12.0,
      height: 9.0,
    },
  },
};
