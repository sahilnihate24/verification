export interface InternshipRecord {
  code: string;
  studentName: string;
  role?: string;
  department?: string;
  duration?: string;
  issueDate?: string;
  status: 'Verified' | 'Completed';
  isSample?: boolean;
}

/**
 * Official Qythera internship verification registry.
 * Codes are matched case-insensitively with leading/trailing whitespace trimmed.
 */
export const INTERNSHIP_RECORDS: InternshipRecord[] = [
  {
    code: 'P4G9N2K',
    studentName: 'Rachi Vinod Gawai',
    duration: '1 June 2026 – 31 July 2026',
    status: 'Verified',
  },
  {
    code: 'N8M2R5K',
    studentName: 'Yogita Nitin Magar',
    duration: '1 June 2026 – 31 July 2026',
    status: 'Verified',
  },
  {
    code: 'R9K7L3V',
    studentName: 'Shrikant Raju Phad',
    duration: '25 September 2025 – 18 November 2025',
    status: 'Verified',
  },
  {
    code: 'V7P4M8K',
    studentName: 'Vivek Patil',
    duration: '1 June 2026 – 31 July 2026',
    status: 'Verified',
  },
  {
    code: 'Q7M4K2P',
    studentName: 'Eshant Vidyadhar Nandurkar',
    status: 'Verified',
  },
  {
    code: 'A9X2L7C',
    studentName: 'Navneet Shivajirao Bhaltilak',
    status: 'Verified',
  },
  {
    code: 'R4T8N2K',
    studentName: 'Harsh Rajesh Sukhdeve',
    status: 'Verified',
  },
  {
    code: 'B7P3W9D',
    studentName: 'Ishanay Vijay Jaisingpure',
    status: 'Verified',
  },
];

export function normalizeVerificationCode(rawCode: string): string {
  return rawCode.trim().toUpperCase().replace(/\s+/g, '');
}

export function findInternshipRecord(rawCode: string): InternshipRecord | null {
  const normalized = normalizeVerificationCode(rawCode);
  if (!normalized) {
    return null;
  }

  return (
    INTERNSHIP_RECORDS.find(
      (record) => normalizeVerificationCode(record.code) === normalized
    ) ?? null
  );
}
