export type MainTab = 'home' | 'vip' | 'payout' | 'team' | 'my' | 'admin';

export interface VipTier {
  id: string;
  name: string;
  sinhalaName: string;
  priceLkr: number;
  dailyRewardLkr: number;
  cycleDays: number;
  description: string;
  marketLevel: string;
  levelNumber: number;
  hashPower: string;
  stockBacking: string;
  themeColor: string;
}

export interface ActivePackage {
  id: string;
  tierId: string;
  tierName: string;
  priceLkr: number;
  dailyRewardLkr: number;
  activatedAt: string;
  daysClaimed: number;
  totalDays: number;
  lastClaimDate: string | null;
  marketLevel: string;
  hashPower: string;
  liveYieldAccruedLkr: number;
}

export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'daily_bonus'
  | 'package_reward'
  | 'referral_commission'
  | 'package_purchase'
  | 'live_mining_claim';

export type TransactionStatus = 'completed' | 'pending' | 'rejected';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amountLkr: number;
  feeLkr?: number;
  netAmountLkr?: number;
  status: TransactionStatus;
  createdAt: string;
  method?: string;
  accountDetails?: string;
  receiptUrl?: string;
  referenceNo?: string;
  depositBankName?: string;
  note: string;
}

export interface TeamMember {
  id: string;
  name: string;
  phone: string;
  level: 1 | 2 | 3;
  joinedAt: string;
  activePackageLkr: number;
  commissionGeneratedLkr: number;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'support';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface PlatformConfig {
  dailySignupBonusLkr: number;
  minDepositLkr: number;
  minWithdrawalLkr: number;
  withdrawalFeePercent: number;
  level1CommissionPercent: number;
  level2CommissionPercent: number;
  level3CommissionPercent: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'member' | 'admin';
  referralCode: string;
  referredBy?: string;
  balanceLkr: number;
  totalDepositedLkr: number;
  totalWithdrawnLkr: number;
  totalReferralEarnedLkr: number;
  lastDailyBonusDate: string | null;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  activePackages: ActivePackage[];
  status?: 'active' | 'suspended';
  joinedAt?: string;
}

export interface StockTicker {
  symbol: string;
  name: string;
  priceLkr: number;
  changeLkr: number;
  changePercent: number;
  highLkr: number;
  lowLkr: number;
  volume: string;
  trend: 'up' | 'down';
  sparkline: number[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'market' | 'mining' | 'bonus' | 'team' | 'payout';
  timestamp: string;
  read: boolean;
  linkTab?: MainTab;
}

export interface CompanyBankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  isActive: boolean;
  instructions: string;
}

export interface SocialSupportChannels {
  telegramSupport: string;
  telegramChannel: string;
  telegramGroup: string;
  whatsappSupport: string;
  whatsappGroup: string;
  facebookPage: string;
}
