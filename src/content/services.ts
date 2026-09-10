export type ServiceIcon = 'corporate' | 'personal' | 'shield';

export interface ServiceItem {
  title: string;
  description: string;
  // Any icon key defined in Services.astro's icon registry.
  // Unrecognized keys fall back to a generic "shield" icon, so a new
  // service can be added here even before a bespoke icon exists for it.
  icon: ServiceIcon;
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
