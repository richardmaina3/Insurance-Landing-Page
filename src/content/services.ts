export interface ServiceItem {
  title: string;
  description: string;
  icon: 'corporate' | 'personal';
}

export const services: ServiceItem[] = [
  {
    title: 'Corporate International Health Plans',
    description:
      'Group coverage for globally mobile teams and international businesses, structured around your workforce and budget.',
    icon: 'corporate',
  },
  {
    title: 'Personal International Health Plans',
    description:
      'Individual and family coverage that travels with you across borders, matched to your circumstances.',
    icon: 'personal',
  },
];
