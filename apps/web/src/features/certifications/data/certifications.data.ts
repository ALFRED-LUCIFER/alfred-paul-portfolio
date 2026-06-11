export interface Certification {
  title: string
  issuer: string
  year: string
  description: string
  /** Badge image in public/images */
  badge: string
  verifyUrl: string
}

/** Extracted from the previous Resume section — sorted by year descending */
export const CERTIFICATIONS: Certification[] = [
  {
    title: 'GitHub Copilot Certified (GH-300)',
    issuer: 'GitHub / Microsoft',
    year: '2026',
    description:
      'AI-driven code completion, prompt engineering, responsible AI practices, and optimising software development productivity, quality, and security with GitHub Copilot',
    badge: '/images/Github-copilot.png',
    verifyUrl:
      'https://learn.microsoft.com/api/credentials/share/en-us/AlfredPaul-9725/E4D292AE9EDD022B?sharingId=9E9FB7700C134DB8',
  },
  {
    title: 'Microsoft Certified: AI Transformation Leader',
    issuer: 'Microsoft',
    year: '2026',
    description: 'Enterprise AI adoption, transformation strategy, and responsible AI practices',
    badge: '/images/ai-transformation-leader.png',
    verifyUrl:
      'https://learn.microsoft.com/en-us/users/alfredpaul-9725/credentials/e4d292ae9edd022b',
  },
  {
    title: 'Professional Scrum Master™ I (PSM I)',
    issuer: 'Scrum.org',
    year: '2023',
    description: 'Certified in Scrum framework implementation and Agile team leadership',
    badge: '/images/PSM1.png',
    verifyUrl: 'https://www.scrum.org/certificates',
  },
  {
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    year: '2023',
    description:
      'Cloud concepts, Azure services, security, privacy, compliance, and pricing fundamentals',
    badge: '/images/azure_fundamental.png',
    verifyUrl: 'https://www.linkedin.com/in/alfred-paul-56438454/details/certifications/',
  },
  {
    title: 'Google People Management Essentials',
    issuer: 'Google',
    year: '2023',
    description: 'People management, coaching techniques, and high-performance team building',
    badge: '/images/Google.png',
    verifyUrl:
      'https://www.credly.com/badges/fca21388-2459-4c06-b32b-c8d7a24d1fa1/linked_in_profile',
  },
  {
    title: 'PCEP – Certified Entry-Level Python Programmer',
    issuer: 'Python Institute',
    year: '2022',
    description:
      'Professional certification in Python programming fundamentals and best practices',
    badge: '/images/pythoncert.png',
    verifyUrl:
      'https://www.credly.com/badges/fa176b3b-01dd-4daa-9526-e19ddb895b6d/linked_in_profile',
  },
]
