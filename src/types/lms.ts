export interface LMSClassSchedule {
  code?: string;
  deliveryType?: 'online' | 'virtual' | 'classroom' | 'blended' | string;
  batchType?: 'weekend' | 'weekday' | string;
  duration?: string;
  totalSessions?: number;
  isFlexibleSchedule?: boolean;
  commenceDate?: string;
  commencementDate?: string;
  commencedAt?: string;
  startsAtUtc?: string;
  endsAtUtc?: string;
}

export interface LMSClassPricing {
  payAmount?: number;
  listAmount?: number;
  currency?: {
    code?: string;
    symbol?: string;
  };
  hasMultiplePlans?: boolean;
}

export interface LMSClass {
  id: string;
  cohortCode: string;
  title: string;
  image?: string;
  status?: string;
  isOpenForEnrollment?: boolean;
  startDate?: string;
  endDate?: string;
  seatsLeft?: number | null;
  isFull?: boolean;
  timezone?: string;
  course?: {
    slug: string;
    title: string;
  };
  schedule?: LMSClassSchedule;
  pricing?: LMSClassPricing;
}

export interface LMSProgramPricing {
  currency?: string;
  symbol?: string;
  actualPrice?: number;
  comparedPrice?: number;
  discountPercent?: number;
}

export interface LMSProgramStats {
  sectionCount?: number;
  lessonCount?: number;
  quizCount?: number;
  totalDuration?: number;
}

export interface LMSProgram {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: {
    url?: string;
    thumbnail?: string;
  };
  level?: string;
  categoryName?: string;
  instructorName?: string | null;
  isFree?: boolean;
  pricing?: LMSProgramPricing;
  hasCertificate?: boolean;
  rating?: number;
  reviews?: number;
  enrolledCount?: number;
  stats?: LMSProgramStats;
  course?: {
    id: string;
    slug: string;
    title: string;
  };
}

