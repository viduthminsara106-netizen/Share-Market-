import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Home,
  Crown,
  Wallet,
  Users,
  UserCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Copy,
  Check,
  Send,
  LogOut,
  HelpCircle,
  Phone,
  User,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ExternalLink,
  Cpu,
  Activity,
  TrendingUp,
  TrendingDown,
  Bell,
  Zap,
  CheckCheck,
  BarChart3,
  Flame,
  Radio,
  X,
  Plus,
  Edit3,
  Trash2,
  Receipt,
  Building,
  CreditCard,
  MessageCircle,
  Share2,
  Search,
  FileText,
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Package,
  History,
  Info,
  ChevronRight,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import ZoomableReceiptModal from './components/ZoomableReceiptModal';
import {
  ActivePackage,
  AppNotification,
  CompanyBankAccount,
  MainTab,
  PlatformConfig,
  SocialSupportChannels,
  StockTicker,
  SupportMessage,
  TeamMember,
  Transaction,
  UserProfile,
  VipTier,
} from './types';
import {
  ADMIN_USER,
  INITIAL_ALL_USERS,
  INITIAL_COMPANY_BANKS,
  INITIAL_CONFIG,
  INITIAL_NOTIFICATIONS,
  INITIAL_STOCKS,
  INITIAL_SUPPORT_CHANNELS,
  INITIAL_SUPPORT_MESSAGES,
  INITIAL_TEAM,
  INITIAL_TRANSACTIONS,
  INITIAL_USER,
  VIP_TIERS,
} from './data/initialData';

const formatLkr = (amount: number) =>
  `Rs. ${amount.toLocaleString('en-LK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const SRI_LANKAN_BANKS = [
  'Commercial Bank of Ceylon',
  'Bank of Ceylon (BOC)',
  'Sampath Bank PLC',
  'Hatton National Bank (HNB)',
  'People\'s Bank',
  'Nations Trust Bank (NTB)',
  'Seylan Bank PLC',
  'National Development Bank (NDB)',
  'DFCC Bank PLC',
  'Pan Asia Banking Corporation',
  'Union Bank of Colombo',
  'Cargills Bank Limited',
  'Standard Chartered Bank Sri Lanka',
  'HSBC Sri Lanka',
];

// Brand Logo component
function BrandLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const iconSize = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-11 h-11';
  return (
    <div className="flex items-center gap-3">
      <div className={`${iconSize} relative flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="url(#logoGrad)" stroke="#34d399" strokeWidth="3" />
          <polygon points="50,14 82,32 82,68 50,86 18,68 18,32" fill="#064e3b" opacity="0.6" />
          <line x1="32" y1="62" x2="32" y2="44" stroke="#6ee7b7" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="44" x2="32" y2="40" stroke="#6ee7b7" strokeWidth="2" />
          <line x1="50" y1="58" x2="50" y2="34" stroke="#a7f3d0" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="62" x2="50" y2="30" stroke="#a7f3d0" strokeWidth="2" />
          <line x1="68" y1="48" x2="68" y2="22" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round" />
          <line x1="68" y1="52" x2="68" y2="18" stroke="url(#goldGrad)" strokeWidth="2" />
          <polyline points="26,60 42,46 58,40 76,20" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="76" cy="20" r="4.5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <span className="font-bold tracking-tight text-white block text-base leading-tight">
          SHARE MARKET
        </span>
        <span className="text-[10px] tracking-wider text-teal-300 font-mono font-medium block">
          LKR MINING
        </span>
      </div>
    </div>
  );
}

// Share Market Illustration for VIP Tiers
function ShareMarketCardImage({ levelNumber }: { levelNumber: number }) {
  if (levelNumber === 1) {
    return (
      <div className="relative h-28 w-full bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-xl overflow-hidden border border-emerald-800/40 p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            CSE LEVEL 1 · 15.0 GH/s
          </span>
          <span className="text-emerald-300 font-semibold">+10% DAILY</span>
        </div>
        <svg viewBox="0 0 200 60" className="w-full h-12 stroke-emerald-400 fill-none">
          <path d="M 0,50 L 30,45 L 60,48 L 90,32 L 120,38 L 150,22 L 180,14 L 200,8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="90" y1="26" x2="90" y2="42" stroke="#34d399" strokeWidth="1" />
          <line x1="150" y1="16" x2="150" y2="34" stroke="#34d399" strokeWidth="1" />
          <line x1="180" y1="8" x2="180" y2="24" stroke="#34d399" strokeWidth="1" />
        </svg>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Banking & Telecom Equities</span>
          <span className="text-emerald-400">Active Mining Node</span>
        </div>
      </div>
    );
  }
  if (levelNumber === 2) {
    return (
      <div className="relative h-28 w-full bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 rounded-xl overflow-hidden border border-teal-800/40 p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] text-teal-400 font-mono">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
            CSE LEVEL 2 · 35.0 GH/s
          </span>
          <span className="text-teal-300 font-semibold">+10% DAILY</span>
        </div>
        <svg viewBox="0 0 200 60" className="w-full h-12 stroke-teal-400 fill-none">
          <path d="M 0,52 L 25,48 L 55,42 L 85,46 L 115,28 L 145,22 L 175,12 L 200,5" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="110,25 120,25 120,35 110,35" fill="#0d9488" stroke="#5eead4" strokeWidth="1" />
          <polygon points="170,9 180,9 180,19 170,19" fill="#0d9488" stroke="#5eead4" strokeWidth="1" />
        </svg>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Industrial Growth Cluster</span>
          <span className="text-teal-400">High Throughput</span>
        </div>
      </div>
    );
  }
  if (levelNumber === 3) {
    return (
      <div className="relative h-28 w-full bg-gradient-to-br from-cyan-950 via-slate-900 to-sky-950 rounded-xl overflow-hidden border border-cyan-800/40 p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            CSE LEVEL 3 · 65.0 GH/s
          </span>
          <span className="text-cyan-300 font-semibold">+10% DAILY</span>
        </div>
        <svg viewBox="0 0 200 60" className="w-full h-12 stroke-cyan-400 fill-none">
          <path d="M 0,55 L 30,50 L 60,38 L 90,42 L 120,24 L 150,18 L 180,10 L 200,4" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="150" cy="18" r="3" fill="#38bdf8" />
          <circle cx="180" cy="10" r="3" fill="#38bdf8" />
        </svg>
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Conglomerate Mining Array</span>
          <span className="text-cyan-400">Multi-Channel</span>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-28 w-full bg-gradient-to-br from-amber-950 via-slate-900 to-yellow-950 rounded-xl overflow-hidden border border-amber-700/50 p-3 flex flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
        <span className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
          CSE LEVEL 4 · 150.0 GH/s
        </span>
        <span className="text-amber-300 font-semibold">+10% DAILY</span>
      </div>
      <svg viewBox="0 0 200 60" className="w-full h-12 stroke-amber-400 fill-none">
        <path d="M 0,56 L 30,46 L 55,48 L 85,28 L 115,32 L 145,14 L 175,8 L 200,2" strokeWidth="3" strokeLinecap="round" />
        <circle cx="175" cy="8" r="3.5" fill="#fde047" stroke="#d97706" />
      </svg>
      <div className="flex items-center justify-between text-[10px] text-amber-200">
        <span>S&P SL20 Apex Institutional</span>
        <span className="text-amber-400 font-bold">Maximum Yield</span>
      </div>
    </div>
  );
}

export default function App() {
  // Authentication state - default to 'register' until at least one account is registered on this browser
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>(() => {
    try {
      return localStorage.getItem('lkr_sm_has_registered_v1') === 'true' ? 'login' : 'register';
    } catch {
      return 'register';
    }
  });
  const [authPhone, setAuthPhone] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState<string>('');
  const [authName, setAuthName] = useState<string>('');
  const [authReferral, setAuthReferral] = useState<string>('');
  const [isRefLocked, setIsRefLocked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');

  // Navigation & Core State
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [config, setConfig] = useState<PlatformConfig>(INITIAL_CONFIG);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('lkr_sm_users_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as UserProfile[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasAdmin = parsed.some((u) => u.phone === ADMIN_USER.phone);
          return hasAdmin ? parsed : [ADMIN_USER, ...parsed];
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_ALL_USERS;
  });
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('lkr_sm_txs_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as Transaction[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_TRANSACTIONS;
  });
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>(INITIAL_SUPPORT_MESSAGES);

  // Admin Configurable Company Banks & Social Channels
  const [companyBanks, setCompanyBanks] = useState<CompanyBankAccount[]>(INITIAL_COMPANY_BANKS);
  const [socialChannels, setSocialChannels] = useState<SocialSupportChannels>(INITIAL_SUPPORT_CHANNELS);

  // Live Share Market & Stocks State
  const [stocks, setStocks] = useState<StockTicker[]>(INITIAL_STOCKS);
  const [aspiIndex, setAspiIndex] = useState<{ points: number; change: number; percent: number }>({
    points: 12482.3,
    change: 48.2,
    percent: 0.39,
  });

  // Notification System State
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [showNotificationCenter, setShowNotificationCenter] = useState<boolean>(false);
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'market' | 'mining' | 'team'>('all');
  const [liveToast, setLiveToast] = useState<AppNotification | null>(null);

  // Live Mining Engine State
  const [liveYieldCounter, setLiveYieldCounter] = useState<number>(72.5);
  const [totalHashRateGh, setTotalHashRateGh] = useState<number>(50.0);
  const [blocksMined, setBlocksMined] = useState<number>(1428);

  // Toast / Feedback Banner
  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showNotice = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setFeedbackBanner({ type, message });
    setTimeout(() => {
      setFeedbackBanner((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Payout & Deposit State
  const [payoutSubTab, setPayoutSubTab] = useState<'withdraw' | 'deposit'>('withdraw');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('1000');
  const [depositAmount, setDepositAmount] = useState<string>('1500');
  const [selectedDepositBankId, setSelectedDepositBankId] = useState<string>(INITIAL_COMPANY_BANKS[0]?.id || '');
  const [depositReferenceNo, setDepositReferenceNo] = useState<string>('');
  const [depositReceiptFileUrl, setDepositReceiptFileUrl] = useState<string>('');
  const [depositReceiptFileName, setDepositReceiptFileName] = useState<string>('');
  const [depositReceiptError, setDepositReceiptError] = useState<string>('');
  const receiptFileInputRef = useRef<HTMLInputElement>(null);

  // Payment Gateway Portal State (LankaPay / LKR Direct Pay)
  const [showPaymentGateway, setShowPaymentGateway] = useState<boolean>(false);
  const [gatewayStage, setGatewayStage] = useState<'loading' | 'portal'>('loading');
  const [gatewayOrderNo, setGatewayOrderNo] = useState<string>('');
  const [gatewayProgress, setGatewayProgress] = useState<number>(20);
  const [gatewayStatusText, setGatewayStatusText] = useState<string>(
    'Connecting to Sri Lanka Interbank Payment Gateway...'
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // My Tab Sub-Navigation & Dedicated User Sections
  const [mySubView, setMySubView] = useState<
    'menu' | 'profile' | 'withdraw_bank' | 'transactions' | 'deposit_banks' | 'about' | 'support'
  >('menu');
  const [txFilterType, setTxFilterType] = useState<
    'all' | 'deposit' | 'withdrawal' | 'package_reward' | 'referral_commission'
  >('all');
  const [withdrawBankForm, setWithdrawBankForm] = useState({
    bankName: INITIAL_USER.bankName,
    accountNumber: INITIAL_USER.accountNumber,
    accountHolder: INITIAL_USER.accountHolder,
    branch: 'Colombo Main Branch (001)',
  });

  // Team Filter State
  const [teamLevelFilter, setTeamLevelFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Profile State
  const [profileForm, setProfileForm] = useState({
    name: INITIAL_USER.name,
    phone: INITIAL_USER.phone,
    bankName: INITIAL_USER.bankName,
    accountNumber: INITIAL_USER.accountNumber,
    accountHolder: INITIAL_USER.accountHolder,
  });
  const [chatInput, setChatInput] = useState<string>('');

  // VIP Packages State (Admin can Add, Edit, Delete)
  const [vipTiers, setVipTiers] = useState<VipTier[]>(VIP_TIERS);
  const [editingPackage, setEditingPackage] = useState<VipTier | null>(null);
  const [isAddingPackage, setIsAddingPackage] = useState<boolean>(false);
  const [packageFormData, setPackageFormData] = useState<Omit<VipTier, 'id'>>({
    name: '',
    sinhalaName: '',
    priceLkr: 1500,
    dailyRewardLkr: 150,
    cycleDays: 30,
    description: '',
    marketLevel: 'Share Market Level 1',
    levelNumber: 1,
    hashPower: '15.0 GH/s',
    stockBacking: 'Colombo Financials & Telecom Index',
    themeColor: 'emerald',
  });

  // Admin SubTab & Management State
  const [adminSubTab, setAdminSubTab] = useState<
    'users' | 'packages' | 'deposits' | 'withdrawals' | 'banks' | 'channels' | 'commissions' | 'support'
  >('users');
  const [adminConfigDraft, setAdminConfigDraft] = useState<PlatformConfig>(INITIAL_CONFIG);
  const [adminReplyInput, setAdminReplyInput] = useState<string>('');

  // Admin Selected User & Balance Edit Modal State
  const [adminSelectedUser, setAdminSelectedUser] = useState<UserProfile | null>(null);
  const [adminViewUserTxHistory, setAdminViewUserTxHistory] = useState<UserProfile | null>(null);
  const [adminBalanceDelta, setAdminBalanceDelta] = useState<string>('');
  const [adminBalanceReason, setAdminBalanceReason] = useState<string>('Administrative manual adjustment');
  const [adminUserSearch, setAdminUserSearch] = useState<string>('');

  // Admin Bank Accounts Form State
  const [editingBank, setEditingBank] = useState<CompanyBankAccount | null>(null);
  const [isAddingBank, setIsAddingBank] = useState<boolean>(false);
  const [bankFormData, setBankFormData] = useState<Omit<CompanyBankAccount, 'id'>>({
    bankName: '',
    accountName: '',
    accountNumber: '',
    branch: '',
    isActive: true,
    instructions: '',
  });

  // Admin Social Channels Form State
  const [socialFormData, setSocialFormData] = useState<SocialSupportChannels>(INITIAL_SUPPORT_CHANNELS);

  // Receipt Inspection Modal State
  const [viewingReceiptTx, setViewingReceiptTx] = useState<Transaction | null>(null);

  const todayStr = '2026-10-22';

  // Check for reflink ?ref=CODE in URL on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref');
      if (refParam && refParam.trim()) {
        const cleanRef = refParam.trim();
        setAuthReferral(cleanRef);
        setIsRefLocked(true);
        setAuthMode('register');
        setIsAuthenticated(false);
      }
    } catch {
      // ignore
    }
  }, []);

  // Update total hashrate whenever user activePackages change
  useEffect(() => {
    const totalGh = user.activePackages.reduce((acc, p) => {
      const val = parseFloat(p.hashPower) || 15.0;
      return acc + val;
    }, 0);
    setTotalHashRateGh(totalGh);
  }, [user.activePackages]);

  // LIVE MINING ENGINE: Ticks every second
  useEffect(() => {
    if (!isAuthenticated || totalHashRateGh <= 0) return;

    const miningInterval = setInterval(() => {
      const yieldPerSec = (totalHashRateGh / 50.0) * 0.04;
      setLiveYieldCounter((prev) => prev + yieldPerSec);
      setBlocksMined((prev) => prev + 1);

      setUser((prevUser) => ({
        ...prevUser,
        activePackages: prevUser.activePackages.map((pkg) => {
          const pkgHash = parseFloat(pkg.hashPower) || 15.0;
          return {
            ...pkg,
            liveYieldAccruedLkr: (pkg.liveYieldAccruedLkr || 0) + (pkgHash / 50.0) * 0.04,
          };
        }),
      }));
    }, 1000);

    return () => clearInterval(miningInterval);
  }, [isAuthenticated, totalHashRateGh]);

  // LIVE SHARE MARKET SIMULATOR
  useEffect(() => {
    if (!isAuthenticated) return;

    const marketInterval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const delta = (Math.random() - 0.48) * (stock.priceLkr > 100 ? 1.25 : 0.2);
          const newPrice = Math.max(1, +(stock.priceLkr + delta).toFixed(2));
          const newChangeLkr = +(stock.changeLkr + delta).toFixed(2);
          const newPercent = +((newChangeLkr / (newPrice - newChangeLkr)) * 100).toFixed(2);
          const newSparkline = [...stock.sparkline.slice(1), newPrice];

          return {
            ...stock,
            priceLkr: newPrice,
            changeLkr: newChangeLkr,
            changePercent: newPercent,
            trend: newChangeLkr >= 0 ? 'up' : 'down',
            sparkline: newSparkline,
          };
        })
      );

      setAspiIndex((prev) => {
        const ptDelta = (Math.random() - 0.46) * 4.5;
        const pts = +(prev.points + ptDelta).toFixed(2);
        const chg = +(prev.change + ptDelta).toFixed(2);
        return {
          points: pts,
          change: chg,
          percent: +((chg / (pts - chg)) * 100).toFixed(2),
        };
      });
    }, 3500);

    return () => clearInterval(marketInterval);
  }, [isAuthenticated]);

  // LIVE MARKET NOTIFICATION DISPATCHER
  useEffect(() => {
    if (!isAuthenticated) return;

    const notifTimer = setInterval(() => {
      const stockSample = stocks[Math.floor(Math.random() * stocks.length)];
      if (!stockSample) return;

      const isUp = stockSample.trend === 'up';
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        title: `CSE Alert: ${stockSample.name} (${stockSample.symbol.split('.')[0]})`,
        message: `${stockSample.symbol.split('.')[0]} is trading at Rs. ${stockSample.priceLkr.toFixed(2)} (${isUp ? '+' : ''}${stockSample.changePercent}%). Volume active at ${stockSample.volume}.`,
        type: 'market',
        timestamp: 'Just now',
        read: false,
        linkTab: 'home',
      };

      setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);
      setLiveToast(newNotif);

      setTimeout(() => {
        setLiveToast((curr) => (curr?.id === newNotif.id ? null : curr));
      }, 5000);
    }, 28000);

    return () => clearInterval(notifTimer);
  }, [isAuthenticated, stocks]);

  const totalCommissionPercent =
    config.level1CommissionPercent +
    config.level2CommissionPercent +
    config.level3CommissionPercent;

  const canClaimDailyBonus = user.lastDailyBonusDate !== todayStr;

  const totalDailyVipReward = useMemo(() => {
    return user.activePackages.reduce((acc, pkg) => acc + pkg.dailyRewardLkr, 0);
  }, [user.activePackages]);

  const unreadNotifCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const adminStats = useMemo(() => {
    const completedDeposits = transactions
      .filter((t) => t.type === 'deposit' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amountLkr, 0);
    const pendingDeposits = transactions.filter(
      (t) => t.type === 'deposit' && t.status === 'pending'
    );
    const pendingWithdrawals = transactions.filter(
      (t) => t.type === 'withdrawal' && t.status === 'pending'
    );
    const completedWithdrawals = transactions
      .filter((t) => t.type === 'withdrawal' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amountLkr, 0);

    return {
      completedDeposits,
      pendingDepositsCount: pendingDeposits.length,
      pendingDepositsTotal: pendingDeposits.reduce((sum, t) => sum + t.amountLkr, 0),
      pendingWithdrawalsCount: pendingWithdrawals.length,
      pendingWithdrawalsTotal: pendingWithdrawals.reduce((sum, t) => sum + t.amountLkr, 0),
      completedWithdrawals,
    };
  }, [transactions]);

  // Persist allUsers and transactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lkr_sm_users_v1', JSON.stringify(allUsers));
    } catch {
      // ignore storage errors
    }
  }, [allUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('lkr_sm_txs_v1', JSON.stringify(transactions));
    } catch {
      // ignore storage errors
    }
  }, [transactions]);

  // Auth Submit
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!authPhone.trim() || !authPassword.trim()) {
      setAuthError('කරුණාකර දුරකථන අංකය සහ මුරපදය ඇතුළත් කරන්න. (Please enter your phone number and password.)');
      return;
    }

    const cleanPhone = authPhone.replace(/[\s\-+]/g, '');
    const cleanPassword = authPassword.trim();

    if (cleanPhone.length < 9 || !/^\d+$/.test(cleanPhone)) {
      setAuthError('කරුණාකර නිවැරදි දුරකථන අංකයක් ඇතුළත් කරන්න. (Please enter a valid phone number.)');
      return;
    }

    // EXCLUSIVE ADMIN LOGIN (Phone: 0711452778, Password: 12345678)
    if (cleanPhone === '0711452778' && authMode === 'login') {
      if (cleanPassword !== '12345678') {
        setAuthError('පරිපාලක මුරපදය වැරදියි. (Invalid admin password. Please try again.)');
        return;
      }
      setUser(ADMIN_USER);
      setProfileForm({
        name: ADMIN_USER.name,
        phone: ADMIN_USER.phone,
        bankName: ADMIN_USER.bankName,
        accountNumber: ADMIN_USER.accountNumber,
        accountHolder: ADMIN_USER.accountHolder,
      });
      setIsAuthenticated(true);
      setActiveTab('admin');
      showNotice('Welcome Administrator. Central Management Suite activated.');
      return;
    }

    if (authMode === 'register') {
      if (cleanPhone === '0711452778') {
        setAuthError('This phone number is reserved for administration. Please switch to Login.');
        return;
      }
      if (!authName.trim()) {
        setAuthError('කරුණාකර ඔබගේ නම ඇතුළත් කරන්න. (Please enter your name to register.)');
        return;
      }
      if (cleanPassword.length < 4) {
        setAuthError('මුරපදය අවම වශයෙන් අකුරු හෝ ඉලක්කම් 4ක් විය යුතුය. (Password must be at least 4 characters.)');
        return;
      }
      if (authPassword !== authConfirmPassword) {
        setAuthError('මුරපද දෙක සමාන නොවේ! (Passwords do not match.)');
        return;
      }

      // Check if this phone number is already registered
      const existingRegisteredUser = allUsers.find(
        (u) => u.isRegistered && u.phone.replace(/[\s\-+]/g, '') === cleanPhone
      );
      if (existingRegisteredUser) {
        setAuthError(
          'මෙම දුරකථන අංකය දැනටමත් ලියාපදිංචි කර ඇත! කරුණාකර Login වන්න. (This phone number is already registered. Please login.)'
        );
        return;
      }

      const displayName = authName.trim();
      const generatedRefCode = `LKR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: displayName,
        phone: authPhone.trim(),
        email: `${cleanPhone}@lkrsharemarket.lk`,
        password: cleanPassword,
        isRegistered: true,
        role: 'member',
        referralCode: generatedRefCode,
        referredBy: authReferral.trim() || undefined,
        balanceLkr: config.dailySignupBonusLkr,
        totalDepositedLkr: 0,
        totalWithdrawnLkr: 0,
        totalReferralEarnedLkr: 0,
        lastDailyBonusDate: todayStr,
        bankName: '',
        accountNumber: '',
        accountHolder: displayName,
        activePackages: [],
        status: 'active',
        joinedAt: todayStr,
      };

      setAllUsers((prev) => [
        newUser,
        ...prev.filter((u) => u.phone.replace(/[\s\-+]/g, '') !== cleanPhone),
      ]);
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          userId: newUser.id,
          userName: newUser.name,
          type: 'daily_bonus',
          amountLkr: config.dailySignupBonusLkr,
          status: 'completed',
          createdAt: '2026-10-22 10:50',
          note: `ලියාපදිංචි වීමේ ප්‍රසාද දීමනාව (+${formatLkr(config.dailySignupBonusLkr)})`,
        },
        ...prev,
      ]);

      try {
        localStorage.setItem('lkr_sm_has_registered_v1', 'true');
      } catch {
        // ignore
      }

      // Switch to Login tab so user logs in with their newly registered account
      setAuthMode('login');
      setAuthPassword('');
      setAuthConfirmPassword('');
      setAuthSuccess(
        `ලියාපදිංචිය සාර්ථකයි! (+${formatLkr(config.dailySignupBonusLkr)} ප්‍රසාද දීමනාව එක් කරන ලදී). දැන් ඔබගේ මුරපදය ඇතුළත් කර Login වන්න.`
      );
      return;
    }

    // STRICT LOGIN MODE: User MUST be registered first!
    const matchedUser = allUsers.find(
      (u) => u.isRegistered && u.phone.replace(/[\s\-+]/g, '') === cleanPhone
    );

    if (!matchedUser) {
      setAuthError(
        'මෙම දුරකථන අංකය ලියාපදිංචි කර නැත! ගිණුමට පිවිසීමට පෙර අනිවාර්යයෙන්ම Register විය යුතුය. (Account not found! You must register first before logging in.)'
      );
      return;
    }

    if (matchedUser.status === 'suspended') {
      setAuthError('ඔබගේ ගිණුම පරිපාලක විසින් අත්හිටුවා ඇත. (Your account has been deactivated by Administrator.)');
      return;
    }

    if (matchedUser.password !== cleanPassword) {
      setAuthError(
        'මුරපදය වැරදියි! කරුණාකර නිවැරදි මුරපදය ඇතුළත් කරන්න. (Incorrect password! Please enter the correct password.)'
      );
      return;
    }

    setUser(matchedUser);
    setProfileForm({
      name: matchedUser.name,
      phone: matchedUser.phone,
      bankName: matchedUser.bankName,
      accountNumber: matchedUser.accountNumber,
      accountHolder: matchedUser.accountHolder,
    });
    setWithdrawBankForm({
      bankName: matchedUser.bankName,
      accountNumber: matchedUser.accountNumber,
      accountHolder: matchedUser.accountHolder || matchedUser.name,
      branch: 'Colombo Main Branch (001)',
    });
    setIsAuthenticated(true);
    setActiveTab('home');
    showNotice(`ආයුබෝවන් ${matchedUser.name}! ගිණුමට සාර්ථකව පිවිසුණා.`);
  };

  // Guard: Ensure non-admin users cannot access admin tab
  useEffect(() => {
    if (activeTab === 'admin' && user.role !== 'admin') {
      setActiveTab('home');
    }
  }, [activeTab, user.role]);

  // Collect Real-Time Live Mining Yield
  const handleCollectLiveMiningYield = () => {
    if (liveYieldCounter <= 0.5) {
      showNotice('No accrued live mining yield to collect yet. Mining is running actively!', 'info');
      return;
    }

    const collected = +liveYieldCounter.toFixed(2);
    setUser((prev) => ({
      ...prev,
      balanceLkr: +(prev.balanceLkr + collected).toFixed(2),
    }));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, balanceLkr: +(u.balanceLkr + collected).toFixed(2) } : u
      )
    );
    setLiveYieldCounter(0);

    setTransactions((prev) => [
      {
        id: `tx-mine-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: 'live_mining_claim',
        amountLkr: collected,
        status: 'completed',
        createdAt: '2026-10-22 11:15',
        note: `Live Mining Yield Collection (${totalHashRateGh} GH/s Hashrate)`,
      },
      ...prev,
    ]);

    showNotice(`Successfully collected +${formatLkr(collected)} from live mining engine into balance!`);
  };

  // Claim Daily Check-In Bonus
  const handleClaimDailyBonus = () => {
    if (!canClaimDailyBonus) {
      showNotice('Daily Rs. 25 bonus already claimed today.', 'info');
      return;
    }
    const bonus = config.dailySignupBonusLkr;
    setUser((prev) => ({
      ...prev,
      balanceLkr: prev.balanceLkr + bonus,
      lastDailyBonusDate: todayStr,
    }));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, balanceLkr: u.balanceLkr + bonus } : u))
    );
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: 'daily_bonus',
        amountLkr: bonus,
        status: 'completed',
        createdAt: '2026-10-22 10:52',
        note: `දිනපතා ප්‍රසාද දීමනාව (+${formatLkr(bonus)})`,
      },
      ...prev,
    ]);
    showNotice(`+${formatLkr(bonus)} added to your balance!`);
  };

  // Activate VIP Tier
  const handleActivateVipTier = (tier: VipTier) => {
    if (user.balanceLkr < tier.priceLkr) {
      showNotice(
        `Insufficient balance (${formatLkr(user.balanceLkr)}). Minimum ${formatLkr(tier.priceLkr)} required.`,
        'error'
      );
      setPayoutSubTab('deposit');
      setDepositAmount(String(tier.priceLkr));
      setActiveTab('payout');
      return;
    }

    const newPkg: ActivePackage = {
      id: `act-${Date.now()}`,
      tierId: tier.id,
      tierName: tier.name,
      priceLkr: tier.priceLkr,
      dailyRewardLkr: tier.dailyRewardLkr,
      activatedAt: todayStr,
      daysClaimed: 1,
      totalDays: tier.cycleDays,
      lastClaimDate: todayStr,
      marketLevel: tier.marketLevel,
      hashPower: tier.hashPower,
      liveYieldAccruedLkr: 0,
    };

    const netDelta = -tier.priceLkr + tier.dailyRewardLkr;
    setUser((prev) => ({
      ...prev,
      balanceLkr: prev.balanceLkr + netDelta,
      activePackages: [newPkg, ...prev.activePackages],
    }));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              balanceLkr: u.balanceLkr + netDelta,
              activePackages: [newPkg, ...u.activePackages],
            }
          : u
      )
    );

    setTransactions((prev) => [
      {
        id: `tx-rew-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: 'package_reward',
        amountLkr: tier.dailyRewardLkr,
        status: 'completed',
        createdAt: '2026-10-22 10:53',
        note: `Day 1 Return · ${tier.name} (+${formatLkr(tier.dailyRewardLkr)})`,
      },
      {
        id: `tx-pur-${Date.now() - 1}`,
        userId: user.id,
        userName: user.name,
        type: 'package_purchase',
        amountLkr: tier.priceLkr,
        status: 'completed',
        createdAt: '2026-10-22 10:53',
        note: `Activated ${tier.marketLevel} (${tier.name})`,
      },
      ...prev,
    ]);

    const pkgNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `${tier.marketLevel} Activated`,
      message: `Your ${tier.name} is now mining with ${tier.hashPower} allocation. Day 1 return of ${formatLkr(tier.dailyRewardLkr)} credited.`,
      type: 'mining',
      timestamp: 'Just now',
      read: false,
      linkTab: 'vip',
    };
    setNotifications((prev) => [pkgNotif, ...prev]);

    showNotice(`Activated ${tier.marketLevel}! +${formatLkr(tier.dailyRewardLkr)} credited.`);
  };

  // Claim Individual Package Daily Return
  const handleClaimPackageDaily = (pkgId: string) => {
    const target = user.activePackages.find((p) => p.id === pkgId);
    if (!target) return;

    if (target.lastClaimDate === todayStr) {
      showNotice(`Today's ${formatLkr(target.dailyRewardLkr)} for ${target.tierName} already claimed.`, 'info');
      return;
    }

    setUser((prev) => ({
      ...prev,
      balanceLkr: prev.balanceLkr + target.dailyRewardLkr,
      activePackages: prev.activePackages.map((p) =>
        p.id === pkgId
          ? { ...p, daysClaimed: p.daysClaimed + 1, lastClaimDate: todayStr }
          : p
      ),
    }));

    setTransactions((prev) => [
      {
        id: `tx-claim-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: 'package_reward',
        amountLkr: target.dailyRewardLkr,
        status: 'completed',
        createdAt: '2026-10-22 10:54',
        note: `Daily Return · ${target.marketLevel}`,
      },
      ...prev,
    ]);

    showNotice(`+${formatLkr(target.dailyRewardLkr)} return credited from ${target.marketLevel}!`);
  };

  // Open Secure Payment Gateway Portal
  const handleOpenPaymentGateway = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(depositAmount);
    if (isNaN(amount) || amount < config.minDepositLkr) {
      showNotice(`Minimum deposit is ${formatLkr(config.minDepositLkr)}.`, 'error');
      return;
    }

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const autoRef = `REF-${user.phone.replace(/\s+/g, '').slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGatewayOrderNo(orderId);
    setDepositReferenceNo(autoRef);
    setDepositReceiptFileUrl('');
    setDepositReceiptFileName('');
    setDepositReceiptError('');
    setShowPaymentGateway(true);
    setGatewayStage('loading');
    setGatewayProgress(20);
    setGatewayStatusText('Connecting to Sri Lanka Interbank Payment Gateway...');

    setTimeout(() => {
      setGatewayProgress(55);
      setGatewayStatusText('Allocating merchant treasury receiving channel...');
    }, 450);

    setTimeout(() => {
      setGatewayProgress(88);
      setGatewayStatusText('Verifying SSL 256-bit encryption & CEFTS link...');
    }, 950);

    setTimeout(() => {
      setGatewayProgress(100);
      setGatewayStage('portal');
      setGatewayStatusText('Gateway Secure Connection Ready.');
    }, 1500);
  };

  // Handle Receipt File Upload with validation
  const handleReceiptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotice('Please select a valid image file (PNG, JPG, JPEG, WEBP).', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showNotice('Image file size must be under 10MB.', 'error');
      return;
    }

    setDepositReceiptFileName(file.name);
    setDepositReceiptError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDepositReceiptFileUrl(result);
      showNotice(`Receipt slip attached: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveReceipt = () => {
    setDepositReceiptFileUrl('');
    setDepositReceiptFileName('');
    setDepositReceiptError('');
    if (receiptFileInputRef.current) {
      receiptFileInputRef.current.value = '';
    }
  };

  // Submit Deposit through Payment Gateway (Requires Receipt)
  const handleGatewayConfirmDeposit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mandatory receipt check
    if (!depositReceiptFileUrl || !depositReceiptFileUrl.trim()) {
      setDepositReceiptError('Deposit receipt slip is required! Please upload your payment slip or screenshot before submitting.');
      showNotice('Deposit receipt slip is required! Please upload your payment slip.', 'error');
      return;
    }

    const amount = Number(depositAmount);
    const targetBank = companyBanks.find((b) => b.id === selectedDepositBankId) || companyBanks[0];
    const ref = depositReferenceNo.trim() || `REF-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      type: 'deposit',
      amountLkr: amount,
      status: 'pending',
      createdAt: '2026-10-22 11:45',
      method: targetBank ? targetBank.bankName : 'LankaPay Direct CEFTS',
      depositBankName: targetBank ? targetBank.bankName : 'Commercial Bank',
      referenceNo: ref,
      receiptUrl: depositReceiptFileUrl,
      note: `Deposit via Gateway to ${targetBank?.bankName || 'Company Bank'} (${gatewayOrderNo}) · Awaiting Verification`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setShowPaymentGateway(false);
    setDepositReceiptFileUrl('');
    setDepositReceiptFileName('');
    setDepositReceiptError('');

    const depNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Deposit Slip Submitted via Gateway',
      message: `Deposit slip for ${formatLkr(amount)} submitted via ${targetBank?.bankName} (Order: ${gatewayOrderNo}). Verification pending.`,
      type: 'payout',
      timestamp: 'Just now',
      read: false,
      linkTab: 'payout',
    };
    setNotifications((prev) => [depNotif, ...prev]);

    showNotice(
      `Deposit transfer for ${formatLkr(amount)} submitted with receipt slip! Awaiting Admin review in Treasury.`
    );
  };

  // Helper for copying individual bank detail with visual tick
  const handleCopyDetail = (label: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedField(label);
    showNotice(`Copied ${label}: ${text}`);
    setTimeout(() => {
      setCopiedField((curr) => (curr === label ? null : curr));
    }, 2500);
  };

  // Save Member's Personal Withdrawal Bank Account
  const handleSaveWithdrawBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawBankForm.bankName.trim() || !withdrawBankForm.accountNumber.trim()) {
      showNotice('Bank name and account number are required.', 'error');
      return;
    }

    const updatedUser = {
      ...user,
      bankName: withdrawBankForm.bankName.trim(),
      accountNumber: withdrawBankForm.accountNumber.trim(),
      accountHolder: withdrawBankForm.accountHolder.trim() || user.name,
    };

    setUser(updatedUser);
    setProfileForm((prev) => ({
      ...prev,
      bankName: withdrawBankForm.bankName.trim(),
      accountNumber: withdrawBankForm.accountNumber.trim(),
      accountHolder: withdrawBankForm.accountHolder.trim() || user.name,
    }));

    setAllUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...updatedUser } : u))
    );

    showNotice('Withdrawal bank account saved successfully!');
  };

  // Withdraw Handler
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (isNaN(amount) || amount < config.minWithdrawalLkr) {
      showNotice(`Minimum withdrawal is ${formatLkr(config.minWithdrawalLkr)}.`, 'error');
      return;
    }
    if (amount > user.balanceLkr) {
      showNotice('Insufficient balance.', 'error');
      return;
    }

    const fee = Math.round((amount * config.withdrawalFeePercent) / 100);
    const net = amount - fee;

    setUser((prev) => ({
      ...prev,
      balanceLkr: prev.balanceLkr - amount,
    }));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, balanceLkr: u.balanceLkr - amount } : u))
    );

    setTransactions((prev) => [
      {
        id: `tx-wd-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: 'withdrawal',
        amountLkr: amount,
        feeLkr: fee,
        netAmountLkr: net,
        status: 'pending',
        createdAt: '2026-10-22 10:56',
        method: `${user.bankName} · ${user.accountNumber}`,
        accountDetails: `${user.bankName} - ${user.accountNumber} (${user.accountHolder})`,
        note: `Withdrawal (${config.withdrawalFeePercent}% fee: ${formatLkr(fee)}, Net: ${formatLkr(net)})`,
      },
      ...prev,
    ]);

    showNotice(`Withdrawal request for ${formatLkr(amount)} submitted to Admin.`);
  };

  // Referral Simulation
  const handleSimulateReferralActivity = (level: 1 | 2 | 3, packageAmount: number) => {
    const rate =
      level === 1
        ? config.level1CommissionPercent
        : level === 2
        ? config.level2CommissionPercent
        : config.level3CommissionPercent;
    const commission = Math.round((packageAmount * rate) / 100);
    const sampleNames = ['Sahan Wijesinghe', 'Tharindu Perera', 'Kaveesha Herath', 'Malithi Gamage'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: randomName,
      phone: `07${Math.floor(1 + Math.random() * 7)} ${Math.floor(100 + Math.random() * 899)} ••••`,
      level,
      joinedAt: todayStr,
      activePackageLkr: packageAmount,
      commissionGeneratedLkr: commission,
    };

    setTeam((prev) => [newMember, ...prev]);
    setUser((prev) => ({
      ...prev,
      balanceLkr: prev.balanceLkr + commission,
      totalReferralEarnedLkr: prev.totalReferralEarnedLkr + commission,
    }));
    setTransactions((prev) => [
      {
        id: `tx-ref-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        type: 'referral_commission',
        amountLkr: commission,
        status: 'completed',
        createdAt: '2026-10-22 10:57',
        note: `Level ${level} Commission (${rate}% · ${randomName})`,
      },
      ...prev,
    ]);

    const teamNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Team Bonus Earned: Level ${level}`,
      message: `${randomName} activated Rs. ${packageAmount.toLocaleString()}. You earned ${formatLkr(commission)} (${rate}% rebate).`,
      type: 'team',
      timestamp: 'Just now',
      read: false,
      linkTab: 'team',
    };
    setNotifications((prev) => [teamNotif, ...prev]);

    showNotice(`Level ${level} commission +${formatLkr(commission)} (${rate}%) added!`);
  };

  const handleCopyInvite = () => {
    const inviteUrl = `${window.location.origin}/?ref=${user.referralCode}`;
    navigator.clipboard?.writeText(inviteUrl).catch(() => {});
    setCopiedCode(true);
    showNotice(`Copied invite link: ?ref=${user.referralCode}`);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleOpenReferralLink = (refCode: string) => {
    setAuthReferral(refCode);
    setIsRefLocked(true);
    setAuthMode('register');
    setIsAuthenticated(false);
    try {
      window.history.replaceState(null, '', `?ref=${encodeURIComponent(refCode)}`);
    } catch {
      // ignore
    }
    showNotice(`Invite link applied: ${refCode}. Referral code is locked.`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: profileForm.name,
      phone: profileForm.phone,
      bankName: profileForm.bankName,
      accountNumber: profileForm.accountNumber,
      accountHolder: profileForm.accountHolder,
    }));
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              name: profileForm.name,
              phone: profileForm.phone,
              bankName: profileForm.bankName,
              accountNumber: profileForm.accountNumber,
              accountHolder: profileForm.accountHolder,
            }
          : u
      )
    );
    showNotice('Profile saved.');
  };

  const handleSendSupportMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    const userMsg: SupportMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: user.name,
      text,
      timestamp: '10:58 AM',
    };
    setSupportMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const autoReply: SupportMessage = {
        id: `msg-rep-${Date.now()}`,
        sender: 'support',
        senderName: 'Support Desk',
        text: `Received. Minimum deposit: ${formatLkr(config.minDepositLkr)}, minimum withdrawal: ${formatLkr(config.minWithdrawalLkr)} (${config.withdrawalFeePercent}% fee). Join our Telegram or WhatsApp community for live updates!`,
        timestamp: '10:58 AM',
      };
      setSupportMessages((prev) => [...prev, autoReply]);
    }, 500);
  };

  // ADMIN: Approve or Reject Deposit with Receipt
  const handleAdminDepositDecision = (txId: string, decision: 'completed' | 'rejected') => {
    const target = transactions.find((t) => t.id === txId);
    if (!target || target.status !== 'pending' || target.type !== 'deposit') return;

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === txId
          ? {
              ...t,
              status: decision,
              note:
                decision === 'completed'
                  ? `Receipt verified & approved by Admin (+${formatLkr(t.amountLkr)})`
                  : 'Receipt rejected by Admin · Invalid reference or unverified deposit',
            }
          : t
      )
    );

    // If approved, credit target user balance!
    if (decision === 'completed') {
      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === target.userId
            ? {
                ...u,
                balanceLkr: u.balanceLkr + target.amountLkr,
                totalDepositedLkr: u.totalDepositedLkr + target.amountLkr,
              }
            : u
        )
      );

      if (target.userId === user.id) {
        setUser((prev) => ({
          ...prev,
          balanceLkr: prev.balanceLkr + target.amountLkr,
          totalDepositedLkr: prev.totalDepositedLkr + target.amountLkr,
        }));
      }
    }

    showNotice(
      decision === 'completed'
        ? `Deposit ${txId} approved! ${formatLkr(target.amountLkr)} credited to ${target.userName}.`
        : `Deposit ${txId} rejected.`,
      decision === 'completed' ? 'success' : 'info'
    );
  };

  // ADMIN: Withdrawal Decision
  const handleAdminWithdrawalDecision = (txId: string, decision: 'completed' | 'rejected') => {
    const target = transactions.find((t) => t.id === txId);
    if (!target || target.status !== 'pending' || target.type !== 'withdrawal') return;

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === txId
          ? {
              ...t,
              status: decision,
              note:
                decision === 'completed'
                  ? `Approved · Net ${formatLkr(t.netAmountLkr ?? t.amountLkr)} disbursed to user bank`
                  : 'Rejected · Full amount refunded to user balance',
            }
          : t
      )
    );

    if (decision === 'completed') {
      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === target.userId
            ? { ...u, totalWithdrawnLkr: u.totalWithdrawnLkr + target.amountLkr }
            : u
        )
      );
      if (target.userId === user.id) {
        setUser((prev) => ({
          ...prev,
          totalWithdrawnLkr: prev.totalWithdrawnLkr + target.amountLkr,
        }));
      }
    } else {
      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === target.userId ? { ...u, balanceLkr: u.balanceLkr + target.amountLkr } : u
        )
      );
      if (target.userId === user.id) {
        setUser((prev) => ({
          ...prev,
          balanceLkr: prev.balanceLkr + target.amountLkr,
        }));
      }
    }

    showNotice(
      decision === 'completed'
        ? `Approved withdrawal (${formatLkr(target.amountLkr)}).`
        : `Rejected withdrawal and refunded ${formatLkr(target.amountLkr)} to user.`,
      decision === 'completed' ? 'success' : 'info'
    );
  };

  // ADMIN: Edit User Balance
  const handleAdminSubmitBalanceEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminSelectedUser) return;
    const delta = parseFloat(adminBalanceDelta);
    if (isNaN(delta) || delta === 0) {
      showNotice('Please enter a valid amount to credit (+) or debit (-).', 'error');
      return;
    }

    const newBal = Math.max(0, +(adminSelectedUser.balanceLkr + delta).toFixed(2));
    const reason = adminBalanceReason.trim() || 'Admin manual balance adjustment';

    // Update in allUsers list
    setAllUsers((prev) =>
      prev.map((u) => (u.id === adminSelectedUser.id ? { ...u, balanceLkr: newBal } : u))
    );

    // If currently logged-in user, update live user
    if (adminSelectedUser.id === user.id) {
      setUser((prev) => ({ ...prev, balanceLkr: newBal }));
    }

    // Add transaction log
    const adjTx: Transaction = {
      id: `tx-adj-${Date.now()}`,
      userId: adminSelectedUser.id,
      userName: adminSelectedUser.name,
      type: delta > 0 ? 'deposit' : 'withdrawal',
      amountLkr: Math.abs(delta),
      status: 'completed',
      createdAt: '2026-10-22 11:25',
      note: `Admin Balance Adjustment: ${delta > 0 ? '+' : '-'}${formatLkr(Math.abs(delta))} (${reason})`,
    };
    setTransactions((prev) => [adjTx, ...prev]);

    showNotice(
      `Updated ${adminSelectedUser.name}'s balance by ${delta > 0 ? '+' : ''}${formatLkr(delta)}. New Balance: ${formatLkr(newBal)}.`
    );

    setAdminSelectedUser(null);
    setAdminBalanceDelta('');
  };

  // ADMIN: Force Logout / Suspend User
  const handleAdminForceLogoutUser = (targetUserId: string) => {
    const targetUser = allUsers.find((u) => u.id === targetUserId);
    if (!targetUser) return;

    const isCurrentActive = targetUser.status === 'active' || !targetUser.status;
    const newStatus = isCurrentActive ? 'suspended' : 'active';

    setAllUsers((prev) =>
      prev.map((u) => (u.id === targetUserId ? { ...u, status: newStatus } : u))
    );

    if (targetUserId === user.id && newStatus === 'suspended') {
      setIsAuthenticated(false);
      showNotice('Your session has been logged out by Administrator.', 'error');
      return;
    }

    showNotice(
      newStatus === 'suspended'
        ? `Logged out and suspended ${targetUser.name}'s session.`
        : `Re-activated ${targetUser.name}'s account.`
    );
  };

  // ADMIN: Save Company Bank Account (Add / Edit)
  const handleSaveCompanyBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankFormData.bankName.trim() || !bankFormData.accountNumber.trim()) {
      showNotice('Bank name and account number are required.', 'error');
      return;
    }

    if (editingBank) {
      setCompanyBanks((prev) =>
        prev.map((b) => (b.id === editingBank.id ? { ...b, ...bankFormData } : b))
      );
      showNotice(`Updated company bank account: ${bankFormData.bankName}`);
      setEditingBank(null);
    } else {
      const newBank: CompanyBankAccount = {
        id: `bank-${Date.now()}`,
        ...bankFormData,
      };
      setCompanyBanks((prev) => [newBank, ...prev]);
      showNotice(`Added new company bank account: ${bankFormData.bankName}`);
      setIsAddingBank(false);
    }

    setBankFormData({
      bankName: '',
      accountName: '',
      accountNumber: '',
      branch: '',
      isActive: true,
      instructions: '',
    });
  };

  // ADMIN: Delete Company Bank Account
  const handleDeleteCompanyBank = (bankId: string) => {
    setCompanyBanks((prev) => prev.filter((b) => b.id !== bankId));
    showNotice('Deleted company bank account.');
  };

  // ADMIN: Save Package (Add or Edit)
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageFormData.name.trim() || packageFormData.priceLkr <= 0 || packageFormData.dailyRewardLkr <= 0) {
      showNotice('Please enter valid package details (Name, Price, and Daily Return).', 'error');
      return;
    }

    if (editingPackage) {
      setVipTiers((prev) =>
        prev.map((t) => (t.id === editingPackage.id ? { ...t, ...packageFormData } : t))
      );
      showNotice(`Updated package: ${packageFormData.name}`);
      setEditingPackage(null);
    } else {
      const newTier: VipTier = {
        id: `tier-${Date.now()}`,
        ...packageFormData,
      };
      setVipTiers((prev) => [...prev, newTier]);
      showNotice(`Added new package: ${packageFormData.name}`);
      setIsAddingPackage(false);
    }

    setPackageFormData({
      name: '',
      sinhalaName: '',
      priceLkr: 1500,
      dailyRewardLkr: 150,
      cycleDays: 30,
      description: '',
      marketLevel: 'Share Market Level 1',
      levelNumber: 1,
      hashPower: '15.0 GH/s',
      stockBacking: 'Colombo Financials & Telecom Index',
      themeColor: 'emerald',
    });
  };

  // ADMIN: Delete Package
  const handleDeletePackage = (tierId: string) => {
    const target = vipTiers.find((t) => t.id === tierId);
    if (!target) return;
    setVipTiers((prev) => prev.filter((t) => t.id !== tierId));
    showNotice(`Deleted package: ${target.name}`);
  };

  // ADMIN: Reset Default Packages
  const handleResetDefaultPackages = () => {
    setVipTiers(VIP_TIERS);
    showNotice('Reset VIP packages to Sri Lankan default tiers.');
  };

  // ADMIN: Save Social Channels (Telegram, WhatsApp, Facebook)
  const handleSaveSocialChannels = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialChannels(socialFormData);
    showNotice('Updated Telegram, WhatsApp, and Facebook support channels.');
  };

  // ADMIN: Save Commission Settings
  const handleSaveAdminConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(adminConfigDraft);
    showNotice(
      `Saved: Level 1 (${adminConfigDraft.level1CommissionPercent}%), Level 2 (${adminConfigDraft.level2CommissionPercent}%), Level 3 (${adminConfigDraft.level3CommissionPercent}%).`
    );
  };

  // ADMIN: Support Reply
  const handleAdminSendSupportReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyInput.trim()) return;
    const reply: SupportMessage = {
      id: `msg-adm-${Date.now()}`,
      sender: 'support',
      senderName: 'Admin',
      text: adminReplyInput.trim(),
      timestamp: '11:00 AM',
    };
    setSupportMessages((prev) => [...prev, reply]);
    setAdminReplyInput('');
    showNotice('Reply sent.');
  };

  // Mark all notifications read
  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showNotice('All notifications marked as read.');
  };

  // =====================================================================
  // LOGIN & REGISTRATION PAGE
  // =====================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
        {/* Cinematic Financial Market Abstract Background */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/25 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-teal-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-800/25 rounded-full blur-[100px]" />

          <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="trading-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#10b981" strokeWidth="0.6" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#trading-grid)" />
            <line x1="120" y1="200" x2="120" y2="350" stroke="#34d399" strokeWidth="1" strokeOpacity="0.5" />
            <rect x="114" y="240" width="12" height="60" fill="#059669" stroke="#34d399" strokeWidth="1" rx="2" opacity="0.6" />
            <line x1="280" y1="180" x2="280" y2="380" stroke="#34d399" strokeWidth="1" strokeOpacity="0.5" />
            <rect x="274" y="210" width="12" height="90" fill="#059669" stroke="#34d399" strokeWidth="1" rx="2" opacity="0.6" />
            <line x1="440" y1="220" x2="440" y2="390" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.4" />
            <rect x="434" y="260" width="12" height="70" fill="#b45309" stroke="#fbbf24" strokeWidth="1" rx="2" opacity="0.5" />
            <line x1="600" y1="160" x2="600" y2="330" stroke="#34d399" strokeWidth="1" strokeOpacity="0.5" />
            <rect x="594" y="190" width="12" height="85" fill="#059669" stroke="#34d399" strokeWidth="1" rx="2" opacity="0.6" />
            <path d="M 0,420 Q 250,300 500,340 T 1000,240 T 1500,160 T 2000,190" fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.6" />
            <path d="M 0,500 Q 300,430 600,460 T 1200,340 T 1800,260" fill="none" stroke="#14b8a6" strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>

        {/* Brand Logo Header */}
        <div className="relative z-10 mb-6 flex flex-col items-center">
          <BrandLogo size="lg" />
        </div>

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-teal-800 px-6 py-6 text-center text-white">
            <h1 className="text-2xl font-bold tracking-tight">
              {authMode === 'login' ? 'Login' : 'Register'}
            </h1>
            <p className="text-xs text-teal-100 mt-1">
              {authMode === 'login'
                ? 'ගිණුමට පිවිසෙන්න · Sign in to your account'
                : 'නව ගිණුමක් සාදන්න · Create your account'}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className={`py-2.5 text-xs font-semibold rounded-lg transition-colors min-h-[44px] cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Login · පිවිසෙන්න
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className={`py-2.5 text-xs font-semibold rounded-lg transition-colors min-h-[44px] cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register · ලියාපදිංචි වන්න
              </button>
            </div>

            {authSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{authSuccess}</span>
              </div>
            )}

            {authError && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
                {authMode === 'login' && authError.includes('Register') && (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError('');
                      setAuthSuccess('');
                    }}
                    className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    දැන්ම Register වන්න (Create Account First) →
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Name · නම
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number · දුරකථන අංකය
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="0771234567"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password · මුරපදය
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Confirm Password · මුරපදය තහවුරු කරන්න
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authConfirmPassword}
                        onChange={(e) => setAuthConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Invitation Code · ආරාධනා කේතය
                      </label>
                      {isRefLocked && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                          <Lock className="w-3 h-3" />
                          Locked
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <KeyRound
                        className={`w-4 h-4 absolute left-3.5 top-3.5 ${
                          isRefLocked ? 'text-emerald-700' : 'text-slate-400'
                        }`}
                      />
                      <input
                        type="text"
                        value={authReferral}
                        onChange={(e) => {
                          if (!isRefLocked) {
                            setAuthReferral(e.target.value);
                          }
                        }}
                        readOnly={isRefLocked}
                        disabled={isRefLocked}
                        placeholder={isRefLocked ? authReferral : 'Invitation code'}
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none font-mono ${
                          isRefLocked
                            ? 'bg-emerald-50/70 border border-emerald-300 text-emerald-950 font-bold cursor-not-allowed select-none'
                            : 'bg-slate-50 border border-slate-200 focus:border-teal-600 focus:bg-white'
                        }`}
                      />
                    </div>
                    {isRefLocked && (
                      <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3" />
                        Referral code auto-filled via invite link and locked
                      </p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-xl transition-colors min-h-[48px] cursor-pointer mt-2"
              >
                {authMode === 'login' ? 'Login' : 'Register'}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                }}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline cursor-pointer"
              >
                {authMode === 'login'
                  ? "Don't have an account? Create an account"
                  : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-12">
      {/* LIVE CSE SHARE MARKET TICKER TAPE */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-mono shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-emerald-400 font-bold">CSE ASPI:</span>
            <span className="text-white font-semibold">{aspiIndex.points.toLocaleString()}</span>
            <span className="text-emerald-400 text-[11px]">
              +{aspiIndex.change} (+{aspiIndex.percent}%)
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] overflow-x-auto py-0.5">
            {stocks.map((stk) => (
              <div key={stk.symbol} className="flex items-center gap-1.5 shrink-0">
                <span className="font-semibold text-slate-300">{stk.symbol.split('.')[0]}:</span>
                <span className="text-white">Rs. {stk.priceLkr.toFixed(2)}</span>
                <span className={stk.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                  {stk.trend === 'up' ? '▲' : '▼'} {Math.abs(stk.changePercent)}%
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-teal-400 shrink-0 font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>MINING: {totalHashRateGh.toFixed(1)} GH/s</span>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('home');
          }}
          className="flex items-center gap-2.5 tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          <div className="w-7 h-7 relative flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="#047857" stroke="#10b981" strokeWidth="4" />
              <polyline points="26,60 42,46 58,40 76,20" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-base text-slate-900">LKR SHARE MARKET</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'home'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-700'
                : 'hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vip')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'vip'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-700'
                : 'hover:text-slate-900'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-500" />
            <span>VIP Mining</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('payout')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'payout'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-700'
                : 'hover:text-slate-900'
            }`}
          >
            Payout
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'team'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-700'
                : 'hover:text-slate-900'
            }`}
          >
            Team ({totalCommissionPercent}%)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('my')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'my'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-700'
                : 'hover:text-slate-900'
            }`}
          >
            My
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {/* Notification Bell */}
          <button
            type="button"
            onClick={() => setShowNotificationCenter((prev) => !prev)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Admin Panel button - ONLY visible to Administrator (0711452778) */}
          {user.role === 'admin' && (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-teal-700 text-white hover:bg-teal-800 shadow-sm'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>{activeTab === 'admin' ? 'Home' : 'Admin Panel'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* NOTIFICATION CENTER DRAWER */}
      {showNotificationCenter && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-700" />
                    <span>Notifications & Alerts</span>
                  </h2>
                  <p className="text-xs text-slate-500">Live share market signals & mining notices</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotificationCenter(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 pt-3 pb-2 flex gap-1 border-b border-slate-100 overflow-x-auto">
                {(['all', 'market', 'mining', 'team'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setNotificationFilter(tab)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap cursor-pointer ${
                      notificationFilter === tab
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-slate-100 max-h-[calc(100vh-170px)] overflow-y-auto p-2">
                {notifications
                  .filter((n) => (notificationFilter === 'all' ? true : n.type === notificationFilter))
                  .map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (notif.linkTab) {
                          setActiveTab(notif.linkTab);
                          setShowNotificationCenter(false);
                        }
                      }}
                      className={`p-3.5 rounded-xl transition-colors cursor-pointer ${
                        notif.read ? 'hover:bg-slate-50' : 'bg-teal-50/60 hover:bg-teal-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={handleMarkAllNotifsRead}
                className="text-xs text-teal-700 font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
              <button
                type="button"
                onClick={() => setNotifications([])}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE MARKET TOAST */}
      {liveToast && (
        <div className="fixed bottom-20 right-4 z-40 max-w-sm bg-slate-950 text-white border border-emerald-500/40 rounded-2xl p-4 shadow-2xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-emerald-400 truncate">{liveToast.title}</p>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{liveToast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setLiveToast(null)}
            className="text-slate-400 hover:text-white shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Feedback Banner */}
      {feedbackBanner && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div
            className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between gap-4 ${
              feedbackBanner.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : feedbackBanner.type === 'info'
                ? 'bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-teal-50 border-teal-200 text-teal-900'
            }`}
          >
            <span>{feedbackBanner.message}</span>
            <button
              type="button"
              onClick={() => setFeedbackBanner(null)}
              className="text-xs underline shrink-0 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* =========================================================
            TAB 1: HOME (Live Mining Engine, CSE Ticker, Home Icons)
           ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* LIVE MINING ENGINE TELEMETRY BANNER */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/30 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      LIVE SHARE MARKET MINING ENGINE
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                    Active Mining: {totalHashRateGh.toFixed(1)} GH/s Hashrate
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Synchronized with Colombo Stock Exchange (CSE) equity nodes. Generating live loyalty rewards.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCollectLiveMiningYield}
                    className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 min-h-[46px] cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Collect Mined +Rs. {liveYieldCounter.toFixed(2)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('vip')}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl min-h-[46px] cursor-pointer"
                  >
                    Upgrade Hash Power →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 font-mono">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-sans">Accrued Live Yield</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                    Rs. {liveYieldCounter.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-emerald-500 mt-0.5">Ticking live every sec</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-sans">Active VIP Mining Rig</p>
                  <p className="text-2xl font-bold text-teal-300 mt-1 tabular-nums">
                    {user.activePackages.length} Nodes
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{totalHashRateGh.toFixed(1)} GH/s Allocation</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-sans">Daily Package Return</p>
                  <p className="text-2xl font-bold text-white mt-1 tabular-nums">
                    +{formatLkr(totalDailyVipReward)}/d
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Automated Daily Tiers</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-sans">Blocks Confirmed</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">
                    {blocksMined.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Synchronized</p>
                </div>
              </div>
            </div>

            {/* WALLET SUMMARY & RULES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>MEMBER WALLET · {user.phone}</span>
                    <span className="font-mono text-teal-700 font-bold">ID: {user.referralCode}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Available LKR Balance · ශේෂය</p>
                      <p className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                        {formatLkr(user.balanceLkr)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClaimDailyBonus}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors min-h-[44px] flex items-center gap-2 cursor-pointer ${
                        canClaimDailyBonus
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>{canClaimDailyBonus ? `Claim Daily +${formatLkr(config.dailySignupBonusLkr)}` : 'Claimed Today'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 grid grid-cols-3 gap-4 font-mono tabular-nums">
                  <div>
                    <p className="text-xs text-slate-500 font-sans">Total Deposited</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">{formatLkr(user.totalDepositedLkr)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-sans">Team Rebates</p>
                    <p className="text-base font-bold text-teal-700 mt-0.5">{formatLkr(user.totalReferralEarnedLkr)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-sans">Total Withdrawn</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">{formatLkr(user.totalWithdrawnLkr)}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    🎁 <strong>ලියාපදිංචි වීමේ ප්‍රසාද දීමනාව:</strong> දිනකට රු. {config.dailySignupBonusLkr}
                  </p>
                  <p>
                    🔔 <strong>අවම තැන්පතුව:</strong> රු. {config.minDepositLkr} · <strong>අවම මුදල් ආපසු ගැනීම:</strong> රු. {config.minWithdrawalLkr}
                  </p>
                  <p>
                    🔔 <strong>මුදල් ආපසු ගැනීමේ ගාස්තුව:</strong> {config.withdrawalFeePercent}% / අසීමිත මුදල් ආපසු ගැනීම්
                  </p>
                  <div className="pt-1 space-y-1 font-mono text-xs text-teal-800">
                    <p>🎬 රු. 1500 / දෛනික ප්‍රතිලාභ රු. 150 (Level 1)</p>
                    <p>🎬 රු. 3000 / දෛනික ප්‍රතිලාභ රු. 300 (Level 2)</p>
                    <p>🎬 රු. 5000 / දෛනික ප්‍රතිලාභ රු. 500 (Level 3)</p>
                    <p>🎬 රු. 10000 / දෛනික ප්‍රතිලාභ රු. 1000 (Level 4)</p>
                  </div>
                  <p className="pt-1 text-xs text-slate-600">
                    කණ්ඩායම් සාමාජිකයෙකුට ආරාධනා කර <strong>{totalCommissionPercent}%</strong> මුදල් වට්ටමක් ලබා ගන්න
                  </p>
                </div>
              </div>
            </div>

            {/* HOME ICONS */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <button
                type="button"
                onClick={() => {
                  setPayoutSubTab('deposit');
                  setActiveTab('payout');
                }}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[88px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-2">Deposit</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPayoutSubTab('withdraw');
                  setActiveTab('payout');
                }}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[88px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-2">Payout</span>
              </button>

              <button
                type="button"
                onClick={handleClaimDailyBonus}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[88px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-2">
                  Rs. {config.dailySignupBonusLkr} Bonus
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('vip')}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[88px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Crown className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-2">VIP Mining</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('team')}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[88px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-2">Team</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('my')}
                className="bg-white border border-slate-200 hover:border-teal-600 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors min-h-[88px] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-2">Support</span>
              </button>
            </div>

            {/* LIVE CSE WATCHLIST WIDGET */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-teal-700" />
                    <span>Live Colombo Stock Exchange (CSE) Watchlist</span>
                  </h2>
                  <p className="text-xs text-slate-500">Real-time market ticks, volume & indices</p>
                </div>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  MARKET CONNECTED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {stocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-900">{stock.symbol.split('.')[0]}</span>
                        <p className="text-[11px] text-slate-500 truncate max-w-[140px]">{stock.name}</p>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                          stock.trend === 'up' ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {stock.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {stock.trend === 'up' ? '+' : ''}
                        {stock.changePercent}%
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between font-mono">
                      <span className="text-lg font-bold text-slate-900 tabular-nums">
                        Rs. {stock.priceLkr.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-500">Vol: {stock.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: VIP UI (Share Market Images, Levels & Lively Mining)
           ========================================================= */}
        {activeTab === 'vip' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                      SHARE MARKET MINING TIERS
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold mt-1.5">
                    Share Market VIP Levels & Mining Power
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Activate high-throughput equity mining packages backed by Colombo Stock Exchange indices. Earn guaranteed 10% daily returns for 30 cycles.
                  </p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shrink-0 font-mono">
                  <p className="text-xs text-slate-400">Available Balance</p>
                  <p className="text-2xl font-bold text-teal-400 mt-0.5">{formatLkr(user.balanceLkr)}</p>
                </div>
              </div>
            </div>

            {/* LIVELY MINING USER BOUGHT PACKAGES */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-teal-700" />
                    <span>Your Active Mining Packages (Lively Mining)</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time mining state, hashrate performance, and daily return claims
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    Total Mining Power: {totalHashRateGh.toFixed(1)} GH/s
                  </span>
                </div>
              </div>

              {user.activePackages.length === 0 ? (
                <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-sm font-semibold text-slate-700">No active VIP mining packages yet.</p>
                  <p className="text-xs text-slate-500 mt-1">Select a Share Market level below to start mining at 10% daily returns.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.activePackages.map((pkg) => {
                    const claimedToday = pkg.lastClaimDate === todayStr;
                    const progressPercent = Math.min(100, Math.round((pkg.daysClaimed / pkg.totalDays) * 100));

                    return (
                      <div
                        key={pkg.id}
                        className="bg-slate-950 text-white rounded-2xl p-5 border border-emerald-800/40 relative overflow-hidden flex flex-col justify-between"
                      >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                        <div>
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                              {pkg.marketLevel}
                            </span>
                            <span className="text-slate-400">Cycle: Day {pkg.daysClaimed}/{pkg.totalDays}</span>
                          </div>

                          <h3 className="text-base font-bold text-white mt-2">{pkg.tierName}</h3>

                          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 font-mono text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Hashrate</span>
                              <span className="font-bold text-teal-300">{pkg.hashPower}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Daily Return</span>
                              <span className="font-bold text-emerald-400">+{formatLkr(pkg.dailyRewardLkr)}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Live Accrued</span>
                              <span className="font-bold text-white tabular-nums">
                                Rs. {(pkg.liveYieldAccruedLkr || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                              <span>30-Day Completion</span>
                              <span>{progressPercent}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                          <span className="text-[11px] text-emerald-400 font-mono">
                            Status: Lively Mining
                          </span>
                          <button
                            type="button"
                            onClick={() => handleClaimPackageDaily(pkg.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer min-h-[40px] ${
                              claimedToday
                                ? 'bg-slate-800 text-slate-500'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                            }`}
                          >
                            {claimedToday ? 'Claimed Today' : `Claim +${formatLkr(pkg.dailyRewardLkr)}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* VIP PACKAGES (Dynamic state managed by Admin) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Available Share Market VIP Packages · මට්ටම් ({vipTiers.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Choose your equity mining node (10% Daily Returns / 30-Day Contract)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vipTiers.map((tier) => {
                  const totalReturn = tier.dailyRewardLkr * tier.cycleDays;
                  return (
                    <div
                      key={tier.id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:border-teal-500 transition-colors"
                    >
                      <div>
                        <ShareMarketCardImage levelNumber={tier.levelNumber} />

                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                            {tier.marketLevel}
                          </span>
                          <span className="text-xs font-mono text-slate-500">30 Days Cycle</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mt-2">{tier.name}</h3>
                        <p className="text-xs text-teal-700 font-medium">{tier.sinhalaName}</p>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{tier.description}</p>

                        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 font-mono tabular-nums">
                          <div>
                            <span className="text-[11px] font-sans text-slate-500 block">Activation</span>
                            <span className="text-lg font-bold text-slate-900">{formatLkr(tier.priceLkr)}</span>
                          </div>
                          <div>
                            <span className="text-[11px] font-sans text-slate-500 block">Daily Yield</span>
                            <span className="text-lg font-bold text-emerald-700">+{formatLkr(tier.dailyRewardLkr)}</span>
                          </div>
                          <div>
                            <span className="text-[11px] font-sans text-slate-500 block">Total Mined</span>
                            <span className="text-lg font-bold text-slate-900">{formatLkr(totalReturn)}</span>
                          </div>
                        </div>

                        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between font-mono">
                          <span>Mining Power: <strong className="text-teal-700">{tier.hashPower}</strong></span>
                          <span>Equity: <strong className="text-slate-800">{tier.stockBacking}</strong></span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-500">
                          Team Rebate (L1): <strong className="font-mono">{formatLkr((tier.priceLkr * config.level1CommissionPercent) / 100)}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleActivateVipTier(tier)}
                          className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
                        >
                          Activate {formatLkr(tier.priceLkr)}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: PAYOUT (Deposit with Company Bank & Slip, Withdrawal)
           ========================================================= */}
        {activeTab === 'payout' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setPayoutSubTab('withdraw')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors min-h-[44px] cursor-pointer ${
                    payoutSubTab === 'withdraw'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Withdraw · මුදල් ගැනීම
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutSubTab('deposit')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors min-h-[44px] cursor-pointer ${
                    payoutSubTab === 'deposit'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Deposit · තැන්පතු
                </button>
              </div>

              {payoutSubTab === 'withdraw' ? (
                <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Available Balance:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {formatLkr(user.balanceLkr)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Amount (Min {formatLkr(config.minWithdrawalLkr)})
                    </label>
                    <input
                      type="number"
                      min={config.minWithdrawalLkr}
                      step="50"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full px-4 py-3 text-base font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>

                  {(() => {
                    const amt = Number(withdrawAmount) || 0;
                    const fee = Math.round((amt * config.withdrawalFeePercent) / 100);
                    const net = Math.max(0, amt - fee);
                    return (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Fee ({config.withdrawalFeePercent}%):</span>
                          <span className="font-mono text-rose-600">-{formatLkr(fee)}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between font-semibold text-slate-900 text-sm">
                          <span>Receive:</span>
                          <span className="font-mono text-teal-700">{formatLkr(net)}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm rounded-xl transition-colors min-h-[48px] cursor-pointer"
                  >
                    Withdraw
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOpenPaymentGateway} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-800/40">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>SECURE LKR PAYMENT GATEWAY PORTAL</span>
                    </div>
                    <p className="text-sm font-semibold mt-1">Direct Bank Deposit / CEFTS Fast Transfer</p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Minimum deposit: {formatLkr(config.minDepositLkr)} · Instant Gateway Routing
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Deposit Amount in LKR
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[1500, 3000, 5000, 10000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDepositAmount(String(amt))}
                          className={`py-2 px-2 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
                            Number(depositAmount) === amt
                              ? 'bg-teal-700 text-white border-teal-700 font-bold shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          Rs. {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min={config.minDepositLkr}
                      step="500"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder={`Enter amount (Min ${formatLkr(config.minDepositLkr)})`}
                      className="w-full px-4 py-3 text-base font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Select Preferred Bank Channel
                    </label>
                    <div className="space-y-2">
                      {companyBanks
                        .filter((b) => b.isActive)
                        .map((b) => (
                          <div
                            key={b.id}
                            onClick={() => setSelectedDepositBankId(b.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                              selectedDepositBankId === b.id
                                ? 'bg-teal-50 border-teal-600 shadow-xs'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-teal-700" />
                                <span className="text-xs font-bold text-slate-900">{b.bankName}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Account: <span className="font-mono font-bold text-slate-800">{b.accountNumber}</span> · {b.branch}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Active
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  selectedDepositBankId === b.id
                                    ? 'border-teal-700 bg-teal-700 text-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {selectedDepositBankId === b.id && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all min-h-[48px] cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-700/20"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Proceed to Secure Payment Gateway · ගෙවීම් පෝටලයට පිවිසෙන්න</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Protected by 256-bit SSL encryption and LankaPay CEFTS settlement standards
                  </p>
                </form>
              )}
            </div>

            {/* SECURE PAYMENT GATEWAY PORTAL MODAL */}
            {showPaymentGateway && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
                  {gatewayStage === 'loading' ? (
                    /* LOADING / CONNECTING SCREEN */
                    <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-500/30 flex items-center justify-center animate-pulse">
                          <Lock className="w-8 h-8 text-teal-700" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-teal-600 border-t-transparent animate-spin" />
                      </div>

                      <div>
                        <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                          LANKAPAY DIRECT GATEWAY
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-2">
                          Establishing Secure Banking Portal...
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Verifying treasury channel for {formatLkr(Number(depositAmount))}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full space-y-2">
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${gatewayProgress}%` }}
                          />
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 text-left flex items-center justify-between">
                          <span>{gatewayStatusText}</span>
                          <span className="font-bold text-teal-800">{gatewayProgress}%</span>
                        </p>
                      </div>

                      <div className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-left space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>256-bit SSL Cryptographic Handshake</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Sri Lanka Interbank CEFTS Network Routing</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Merchant Treasury Allocation Verified</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setGatewayStage('portal');
                          setGatewayProgress(100);
                        }}
                        className="text-xs text-teal-700 hover:text-teal-800 font-semibold underline cursor-pointer"
                      >
                        Skip wait & view deposit details →
                      </button>
                    </div>
                  ) : (
                    /* PORTAL ACTIVE SCREEN */
                    <div>
                      {/* Gateway Top Bar */}
                      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-teal-900 text-white p-5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-white/10 rounded-xl">
                            <Lock className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm tracking-wide">LankaPay Direct Portal</span>
                              <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                                SECURE
                              </span>
                            </div>
                            <p className="text-[11px] text-teal-200 font-mono">
                              Order ID: {gatewayOrderNo}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowPaymentGateway(false)}
                          className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Body */}
                      <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                        {/* Amount Card with Copy */}
                        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-slate-400 font-sans block">Payable Deposit Amount</span>
                            <span className="text-2xl font-bold font-mono text-emerald-400">
                              {formatLkr(Number(depositAmount))}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyDetail('Amount', String(depositAmount))}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer border border-teal-500/30"
                          >
                            {copiedField === 'Amount' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedField === 'Amount' ? 'Copied!' : 'Copy Amount'}</span>
                          </button>
                        </div>

                        {/* Company Bank Details with Individual Copy Buttons */}
                        {(() => {
                          const targetBank =
                            companyBanks.find((b) => b.id === selectedDepositBankId) || companyBanks[0];
                          if (!targetBank) return null;

                          return (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                  <Building className="w-4 h-4 text-teal-700" />
                                  <span>Deposit Bank Account Details (එකින් එක copy කරන්න)</span>
                                </span>
                              </div>

                              {/* 1. Bank Name */}
                              <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-xs">
                                <div>
                                  <span className="text-[11px] text-slate-500 block">Bank Name</span>
                                  <span className="font-bold text-slate-900">{targetBank.bankName}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail('Bank Name', targetBank.bankName)}
                                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-300 font-semibold flex items-center gap-1 cursor-pointer text-[11px]"
                                >
                                  {copiedField === 'Bank Name' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                                  <span>{copiedField === 'Bank Name' ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>

                              {/* 2. Account Number */}
                              <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-xs">
                                <div>
                                  <span className="text-[11px] text-slate-500 block">Account Number</span>
                                  <span className="font-mono font-bold text-teal-800 text-sm">{targetBank.accountNumber}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail('Account Number', targetBank.accountNumber)}
                                  className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-lg border border-teal-300 font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                                >
                                  {copiedField === 'Account Number' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-teal-700" />}
                                  <span>{copiedField === 'Account Number' ? 'Copied' : 'Copy Acc No'}</span>
                                </button>
                              </div>

                              {/* 3. Account Holder Name */}
                              <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-xs">
                                <div>
                                  <span className="text-[11px] text-slate-500 block">Account Holder Name</span>
                                  <span className="font-semibold text-slate-900">{targetBank.accountName}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail('Account Holder', targetBank.accountName)}
                                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-300 font-semibold flex items-center gap-1 cursor-pointer text-[11px]"
                                >
                                  {copiedField === 'Account Holder' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                                  <span>{copiedField === 'Account Holder' ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>

                              {/* 4. Branch */}
                              <div className="flex items-center justify-between py-1 border-b border-slate-200/60 text-xs">
                                <div>
                                  <span className="text-[11px] text-slate-500 block">Branch</span>
                                  <span className="text-slate-800 font-medium">{targetBank.branch}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail('Branch', targetBank.branch)}
                                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 rounded-lg border border-slate-300 font-semibold flex items-center gap-1 cursor-pointer text-[11px]"
                                >
                                  {copiedField === 'Branch' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                                  <span>{copiedField === 'Branch' ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>

                              {/* 5. Payment Remark / Ref */}
                              <div className="flex items-center justify-between py-1 text-xs bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                                <div>
                                  <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wider">
                                    Required Payment Remark (සටහන)
                                  </span>
                                  <span className="font-mono font-bold text-slate-900">{depositReferenceNo}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail('Payment Remark', depositReferenceNo)}
                                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                                >
                                  {copiedField === 'Payment Remark' ? <Check className="w-3 h-3 text-emerald-800" /> : <Copy className="w-3 h-3 text-amber-800" />}
                                  <span>{copiedField === 'Payment Remark' ? 'Copied' : 'Copy Remark'}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Step 2: Proof of Transfer Upload */}
                        <form onSubmit={handleGatewayConfirmDeposit} className="space-y-3 pt-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Enter Transfer Reference ID (from bank SMS / app)
                            </label>
                            <input
                              type="text"
                              required
                              value={depositReferenceNo}
                              onChange={(e) => setDepositReferenceNo(e.target.value)}
                              placeholder="e.g. CEFTS-998822 or CDM Ref"
                              className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                                <span>Upload Payment Receipt Slip</span>
                                <span className="text-rose-500 font-bold">*</span>
                              </label>
                              <span className="text-[10px] text-slate-400">PNG, JPG, WEBP (Max 10MB)</span>
                            </div>

                            <input
                              type="file"
                              ref={receiptFileInputRef}
                              accept="image/*"
                              onChange={handleReceiptFileChange}
                              className="hidden"
                              id="gateway-receipt-upload"
                            />

                            {!depositReceiptFileUrl ? (
                              <div>
                                <label
                                  htmlFor="gateway-receipt-upload"
                                  className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                                    depositReceiptError
                                      ? 'border-rose-300 bg-rose-50/50 hover:bg-rose-50'
                                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-teal-500'
                                  }`}
                                >
                                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
                                    <Upload className="w-5 h-5" />
                                  </div>
                                  <p className="text-xs font-bold text-slate-800">
                                    Click to Browse or Snap Receipt Photo
                                  </p>
                                  <p className="text-[11px] text-slate-500 mt-0.5">
                                    Required: Bank transfer screenshot, CDM slip, or ATM receipt
                                  </p>
                                </label>
                                {depositReceiptError && (
                                  <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{depositReceiptError}</span>
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="p-3 bg-teal-50/80 border border-teal-200 rounded-2xl flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <img
                                    src={depositReceiptFileUrl}
                                    alt="Receipt Preview"
                                    className="w-12 h-12 object-cover rounded-xl border border-teal-300 shrink-0 shadow-xs"
                                  />
                                  <div className="truncate">
                                    <p className="text-xs font-bold text-slate-900 truncate">
                                      {depositReceiptFileName || 'Bank_Deposit_Slip.jpg'}
                                    </p>
                                    <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>Receipt Attached · Ready for Verification</span>
                                    </span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={handleRemoveReceipt}
                                  className="px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer shrink-0"
                                >
                                  Change
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setShowPaymentGateway(false)}
                              className="w-full sm:w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className={`w-full sm:w-2/3 py-2.5 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2 ${
                                depositReceiptFileUrl
                                  ? 'bg-teal-700 hover:bg-teal-800'
                                  : 'bg-slate-400 hover:bg-slate-500'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Confirm & Submit Slip (ස්ලිප්පත යොමු කරන්න)</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900">Records</h2>
              <div className="mt-4 divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-1">
                {transactions
                  .filter((t) => t.userId === user.id)
                  .map((tx) => {
                    const isPositive =
                      tx.type === 'deposit' ||
                      tx.type === 'daily_bonus' ||
                      tx.type === 'package_reward' ||
                      tx.type === 'referral_commission' ||
                      tx.type === 'live_mining_claim';
                    return (
                      <div
                        key={tx.id}
                        className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">{tx.note}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                            <span className="font-mono">{tx.createdAt}</span>
                            <span>·</span>
                            <span
                              className={`font-semibold capitalize ${
                                tx.status === 'completed'
                                  ? 'text-teal-700'
                                  : tx.status === 'pending'
                                  ? 'text-amber-700'
                                  : 'text-rose-700'
                              }`}
                            >
                              {tx.status}
                            </span>
                            {tx.referenceNo && (
                              <>
                                <span>·</span>
                                <span className="font-mono text-slate-600">Ref: {tx.referenceNo}</span>
                              </>
                            )}
                            {tx.receiptUrl && (
                              <>
                                <span>·</span>
                                <button
                                  type="button"
                                  onClick={() => setViewingReceiptTx(tx)}
                                  className="text-teal-700 hover:text-teal-900 font-bold underline cursor-pointer"
                                >
                                  Inspect Slip
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <p
                          className={`text-sm font-mono font-bold tabular-nums ${
                            isPositive ? 'text-teal-700' : 'text-slate-900'
                          }`}
                        >
                          {isPositive ? '+' : '-'}
                          {formatLkr(tx.amountLkr)}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: TEAM (3-Level Commissions & Reflink)
           ========================================================= */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-xl font-bold">
                  Team Commission: {totalCommissionPercent}%
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  මට්ටම 1: {config.level1CommissionPercent}% · මට්ටම 2: {config.level2CommissionPercent}% · මට්ටම 3: {config.level3CommissionPercent}%
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
                <span className="font-mono text-sm font-bold text-teal-400">
                  {user.referralCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyInvite}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Link'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenReferralLink(user.referralCode)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer border border-teal-500/30"
                  title="Test clicking this referral link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Reflink</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { level: 1 as const, title: 'මට්ටම 1 · Level 1', percent: config.level1CommissionPercent },
                { level: 2 as const, title: 'මට්ටම 2 · Level 2', percent: config.level2CommissionPercent },
                { level: 3 as const, title: 'මට්ටම 3 · Level 3', percent: config.level3CommissionPercent },
              ].map((tier) => {
                const membersInLevel = team.filter((m) => m.level === tier.level);
                const levelEarned = membersInLevel.reduce(
                  (sum, m) => sum + m.commissionGeneratedLkr,
                  0
                );
                return (
                  <div
                    key={tier.level}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{tier.title}</span>
                        <span className="font-mono font-bold text-teal-700">{tier.percent}%</span>
                      </div>
                      <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-2">
                        {formatLkr(levelEarned)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {membersInLevel.length} Members
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSimulateReferralActivity(tier.level, 3000)}
                      className="mt-4 w-full py-2 px-3 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      + Test Level {tier.level}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-base font-bold text-slate-900">Team Members</h2>
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                  {(['all', 1, 2, 3] as const).map((lvl) => (
                    <button
                      key={String(lvl)}
                      type="button"
                      onClick={() => setTeamLevelFilter(lvl)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                        teamLevelFilter === lvl
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600'
                      }`}
                    >
                      {lvl === 'all' ? 'All' : `L${lvl}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {team
                  .filter((m) => (teamLevelFilter === 'all' ? true : m.level === teamLevelFilter))
                  .map((member) => (
                    <div
                      key={member.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-500 font-mono">
                          {member.phone} · Level {member.level}
                        </p>
                      </div>
                      <p className="text-sm font-mono font-bold text-teal-700">
                        +{formatLkr(member.commissionGeneratedLkr)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: MY (Profile, Support Chat & Official Channels)
           ========================================================= */}
        {activeTab === 'my' && (
          <div className="space-y-6">
            {/* USER PROFILE & WALLET STATS CARD */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{user.name}</h1>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {user.role === 'admin' ? 'Administrator' : 'VIP Shareholder'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="font-mono">{user.phone}</span>
                      <span>·</span>
                      <span>Joined {user.joinedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
                    <span className="text-xs text-slate-400">Referral Code:</span>
                    <span className="text-xs font-mono font-bold text-teal-400">{user.referralCode}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyDetail('Referral Code', user.referralCode)}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy referral code"
                    >
                      {copiedField === 'Referral Code' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAuthenticated(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl border border-rose-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Balance & Ledger Counters */}
              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Available Balance</span>
                  <span className="text-xl sm:text-2xl font-black text-teal-300 font-mono">
                    {formatLkr(user.balanceLkr)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Total Deposited</span>
                  <span className="text-lg sm:text-xl font-bold text-slate-200 font-mono">
                    {formatLkr(user.totalDepositedLkr)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Total Withdrawn</span>
                  <span className="text-lg sm:text-xl font-bold text-slate-200 font-mono">
                    {formatLkr(user.totalWithdrawnLkr)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Referral Rewards</span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">
                    +{formatLkr(user.totalReferralEarnedLkr)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setPayoutSubTab('deposit');
                    setActiveTab('payout');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Deposit via Gateway</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPayoutSubTab('withdraw');
                    setActiveTab('payout');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Withdraw Funds</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyInvite}
                  className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-teal-300 font-semibold text-xs border border-teal-500/30 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Link Copied!' : 'Copy Invite Link'}</span>
                </button>
              </div>
            </div>

            {/* SUB-VIEW NAVIGATION BAR */}
            <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs flex items-center gap-1.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setMySubView('menu')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'menu'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Account Hub</span>
              </button>
              <button
                type="button"
                onClick={() => setMySubView('transactions')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'transactions'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Transaction History</span>
              </button>
              <button
                type="button"
                onClick={() => setMySubView('withdraw_bank')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'withdraw_bank'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Withdraw Bank</span>
              </button>
              <button
                type="button"
                onClick={() => setMySubView('profile')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'profile'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button
                type="button"
                onClick={() => setMySubView('deposit_banks')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'deposit_banks'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Deposit Banks</span>
              </button>
              <button
                type="button"
                onClick={() => setMySubView('about')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'about'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>About & Rules</span>
              </button>
              <button
                type="button"
                onClick={() => setMySubView('support')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
                  mySubView === 'support'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Support & Channels</span>
              </button>
            </div>

            {/* =========================================================
                SUB-VIEW 0: MENU OVERVIEW (ACCOUNT HUB)
               ========================================================= */}
            {mySubView === 'menu' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Card 1: Transaction History */}
                  <div
                    onClick={() => setMySubView('transactions')}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <History className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        Transaction History
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Full financial ledger of deposits, withdrawals, daily yields, and referral bonuses.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-teal-700 gap-1">
                      <span>View Statement</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Withdraw Bank Account */}
                  <div
                    onClick={() => setMySubView('withdraw_bank')}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        Withdrawal Bank Account
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Configure or update your Sri Lankan bank account for CEFTS automated withdrawals.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-teal-700 gap-1">
                      <span>Edit Bank Account</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Edit Profile */}
                  <div
                    onClick={() => setMySubView('profile')}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <User className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        Profile Settings
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Manage your legal display name, registered phone number, and security preferences.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-teal-700 gap-1">
                      <span>Edit Details</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 4: Deposit Bank Directory */}
                  <div
                    onClick={() => setMySubView('deposit_banks')}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Building className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        Deposit Bank Directory
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Official company receiving accounts with individual 1-click copy buttons for CEFTS/CDM.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-teal-700 gap-1">
                      <span>View Bank Details</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 5: About & Operating Rules */}
                  <div
                    onClick={() => setMySubView('about')}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Info className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        About & Operating Rules
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Platform policies, 15% CEFTS withdrawal fee, 33% 3-level team commission matrix.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-teal-700 gap-1">
                      <span>Read Rules</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 6: Support & Social Channels */}
                  <div
                    onClick={() => setMySubView('support')}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        Support & Channels
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        24/7 Telegram direct line, WhatsApp customer care, community groups, and live desk.
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-bold text-teal-700 gap-1">
                      <span>Get Support</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Quick Social Channels Strip */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-teal-700" />
                      <span>Direct Customer Support Channels</span>
                    </h4>
                    <span className="text-xs text-slate-500">Official Sri Lanka Team</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <a
                      href={socialChannels.telegramSupport}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Send className="w-5 h-5 text-sky-600 mb-1" />
                      <span className="text-xs font-bold text-slate-900">Telegram 24/7</span>
                      <span className="text-[10px] text-slate-500">Direct Support</span>
                    </a>
                    <a
                      href={socialChannels.telegramChannel}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Send className="w-5 h-5 text-sky-700 mb-1" />
                      <span className="text-xs font-bold text-slate-900">TG Channel</span>
                      <span className="text-[10px] text-slate-500">Announcements</span>
                    </a>
                    <a
                      href={socialChannels.telegramGroup}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Users className="w-5 h-5 text-sky-800 mb-1" />
                      <span className="text-xs font-bold text-slate-900">TG Group</span>
                      <span className="text-[10px] text-slate-500">Community</span>
                    </a>
                    <a
                      href={socialChannels.whatsappSupport}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-600 mb-1" />
                      <span className="text-xs font-bold text-slate-900">WhatsApp Help</span>
                      <span className="text-[10px] text-slate-500">Customer Care</span>
                    </a>
                    <a
                      href={socialChannels.whatsappGroup}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Users className="w-5 h-5 text-emerald-700 mb-1" />
                      <span className="text-xs font-bold text-slate-900">WA Group</span>
                      <span className="text-[10px] text-slate-500">VIP Members</span>
                    </a>
                    <a
                      href={socialChannels.facebookPage}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Share2 className="w-5 h-5 text-indigo-600 mb-1" />
                      <span className="text-xs font-bold text-slate-900">Facebook</span>
                      <span className="text-[10px] text-slate-500">Official Page</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================
                SUB-VIEW 1: TRANSACTION HISTORY
               ========================================================= */}
            {mySubView === 'transactions' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setMySubView('menu')}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="Back to Hub"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <History className="w-5 h-5 text-teal-700" />
                          <span>Transaction History</span>
                        </h2>
                        <p className="text-xs text-slate-500">
                          Complete verified financial ledger for your account
                        </p>
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
                      {(
                        [
                          { key: 'all', label: 'All' },
                          { key: 'deposit', label: 'Deposits' },
                          { key: 'withdrawal', label: 'Withdrawals' },
                          { key: 'package_reward', label: 'VIP Yields' },
                          { key: 'referral_commission', label: 'Referrals' },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setTxFilterType(tab.key)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
                            txFilterType === tab.key
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transactions Ledger */}
                  {(() => {
                    const userTxs = transactions.filter((t) => t.userId === user.id);
                    const filteredTxs = userTxs.filter((t) => {
                      if (txFilterType === 'all') return true;
                      if (txFilterType === 'deposit') return t.type === 'deposit';
                      if (txFilterType === 'withdrawal') return t.type === 'withdrawal';
                      if (txFilterType === 'package_reward')
                        return (
                          t.type === 'package_reward' ||
                          t.type === 'package_purchase' ||
                          t.type === 'live_mining_claim' ||
                          t.type === 'daily_bonus'
                        );
                      if (txFilterType === 'referral_commission') return t.type === 'referral_commission';
                      return true;
                    });

                    if (filteredTxs.length === 0) {
                      return (
                        <div className="py-16 text-center">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <History className="w-7 h-7" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-700">No transactions recorded</h4>
                          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                            No records found under this filter. Deposit funds or activate VIP share market packages to see activity.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div className="divide-y divide-slate-100 mt-2">
                        {filteredTxs.map((tx) => {
                          const isCredit =
                            tx.type === 'deposit' ||
                            tx.type === 'package_reward' ||
                            tx.type === 'referral_commission' ||
                            tx.type === 'daily_bonus' ||
                            tx.type === 'live_mining_claim';

                          return (
                            <div
                              key={tx.id}
                              className="py-4 first:pt-2 last:pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 rounded-xl px-2 transition-colors"
                            >
                              <div className="flex items-start gap-3.5">
                                <div
                                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                                    tx.type === 'deposit'
                                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                      : tx.type === 'withdrawal'
                                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                      : tx.type === 'referral_commission'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                  }`}
                                >
                                  {tx.type === 'deposit' && <ArrowDownLeft className="w-5 h-5" />}
                                  {tx.type === 'withdrawal' && <ArrowUpRight className="w-5 h-5" />}
                                  {tx.type === 'referral_commission' && <Users className="w-5 h-5" />}
                                  {tx.type === 'package_reward' && <TrendingUp className="w-5 h-5" />}
                                  {tx.type === 'package_purchase' && <Package className="w-5 h-5" />}
                                  {tx.type === 'daily_bonus' && <Gift className="w-5 h-5" />}
                                  {tx.type === 'live_mining_claim' && <Zap className="w-5 h-5" />}
                                </div>

                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-slate-900">
                                      {tx.type === 'deposit' && 'Bank Deposit'}
                                      {tx.type === 'withdrawal' && 'Bank Withdrawal'}
                                      {tx.type === 'package_reward' && 'VIP Share Return'}
                                      {tx.type === 'package_purchase' && 'VIP Contract Activation'}
                                      {tx.type === 'referral_commission' && 'Team Referral Bonus'}
                                      {tx.type === 'daily_bonus' && 'Daily Check-in Bonus'}
                                      {tx.type === 'live_mining_claim' && 'Live Mining Claim'}
                                    </span>

                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                        tx.status === 'completed'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : tx.status === 'pending'
                                          ? 'bg-amber-100 text-amber-800'
                                          : 'bg-rose-100 text-rose-800'
                                      }`}
                                    >
                                      {tx.status}
                                    </span>
                                  </div>

                                  <p className="text-xs text-slate-600 mt-0.5">{tx.note || tx.method}</p>

                                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-mono">
                                    <span>{tx.createdAt}</span>
                                    <span>·</span>
                                    <span>ID: {tx.id}</span>
                                    {tx.referenceNo && (
                                      <>
                                        <span>·</span>
                                        <span>Ref: {tx.referenceNo}</span>
                                      </>
                                    )}
                                    {tx.receiptUrl && (
                                      <>
                                        <span>·</span>
                                        <button
                                          type="button"
                                          onClick={() => setViewingReceiptTx(tx)}
                                          className="text-teal-700 hover:text-teal-900 font-bold underline cursor-pointer"
                                        >
                                          Inspect Slip
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="sm:text-right shrink-0">
                                <span
                                  className={`text-base font-black font-mono block ${
                                    isCredit && tx.type !== 'package_purchase'
                                      ? 'text-teal-700'
                                      : 'text-slate-900'
                                  }`}
                                >
                                  {isCredit && tx.type !== 'package_purchase' ? '+' : '-'}
                                  {formatLkr(tx.amountLkr)}
                                </span>
                                {tx.feeLkr ? (
                                  <span className="text-[11px] text-slate-500 font-mono block">
                                    15% Fee: {formatLkr(tx.feeLkr)} · Net: {formatLkr(tx.netAmountLkr || 0)}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* =========================================================
                SUB-VIEW 2: WITHDRAW BANK ACCOUNT EDIT
               ========================================================= */}
            {mySubView === 'withdraw_bank' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Current Bank Details Card */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <button
                          type="button"
                          onClick={() => setMySubView('menu')}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Back to Hub"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-teal-700" />
                            <span>Currently Linked Bank</span>
                          </h2>
                          <p className="text-xs text-slate-500">Your registered payout destination</p>
                        </div>
                      </div>

                      <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
                            LankaPay CEFTS
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Verified
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] text-slate-400 block">Bank Name</span>
                          <p className="text-base font-bold text-white">{user.bankName || 'Not Set'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[11px] text-slate-400 block">Account Number</span>
                            <p className="text-sm font-mono font-bold text-teal-300">
                              {user.accountNumber || 'Not Set'}
                            </p>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-400 block">Account Holder</span>
                            <p className="text-sm font-semibold text-slate-200 truncate">
                              {user.accountHolder || user.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-amber-950">
                          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>Important Disbursal Notice</span>
                        </div>
                        <p className="text-slate-700">
                          Ensure the account holder name matches your national identity card (NIC). Payouts to mismatched third-party accounts will be rejected by compliance.
                        </p>
                        <p className="text-slate-600 font-semibold">
                          Minimum withdrawal: {formatLkr(config.minWithdrawalLkr)} · 15% CEFTS processing fee applies.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Edit Bank Form */}
                  <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                    <div className="pb-4 border-b border-slate-100">
                      <h2 className="text-base font-bold text-slate-900">Update Withdrawal Bank Account</h2>
                      <p className="text-xs text-slate-500">
                        Changes will take effect immediately on your next withdrawal submission
                      </p>
                    </div>

                    <form onSubmit={handleSaveWithdrawBank} className="mt-5 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Bank Name <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={withdrawBankForm.bankName}
                          onChange={(e) =>
                            setWithdrawBankForm((prev) => ({ ...prev, bankName: e.target.value }))
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                        >
                          <option value="">Select Sri Lankan Bank</option>
                          {SRI_LANKAN_BANKS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Account Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={withdrawBankForm.accountNumber}
                          onChange={(e) =>
                            setWithdrawBankForm((prev) => ({ ...prev, accountNumber: e.target.value }))
                          }
                          placeholder="e.g. 8004561289"
                          className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Account Holder Name (As per Bank Book/NIC) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={withdrawBankForm.accountHolder}
                          onChange={(e) =>
                            setWithdrawBankForm((prev) => ({ ...prev, accountHolder: e.target.value }))
                          }
                          placeholder="e.g. K. M. Danushka Perera"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Branch Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={withdrawBankForm.branch}
                          onChange={(e) =>
                            setWithdrawBankForm((prev) => ({ ...prev, branch: e.target.value }))
                          }
                          placeholder="e.g. Colombo Main Branch / Kandy Branch"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition-colors min-h-[44px] cursor-pointer shadow-md flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Save Withdrawal Bank Account</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================
                SUB-VIEW 3: PROFILE EDIT
               ========================================================= */}
            {mySubView === 'profile' && (
              <div className="space-y-6">
                <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMySubView('menu')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Back to Hub"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-teal-700" />
                        <span>Profile Settings</span>
                      </h2>
                      <p className="text-xs text-slate-500">Update your account identity and personal details</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Display Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Registered Phone Number (Login Account)
                      </label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                        required
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Admin credentials: 0711452778
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Permanent Referral Code:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-teal-700">{user.referralCode}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyDetail('Referral Code', user.referralCode)}
                            className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Account Role:</span>
                        <span className="font-semibold text-slate-800 uppercase">{user.role}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Member Since:</span>
                        <span className="font-mono text-slate-800">{user.joinedAt}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors min-h-[44px] cursor-pointer shadow-md"
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* =========================================================
                SUB-VIEW 4: DEPOSIT BANKS DIRECTORY
               ========================================================= */}
            {mySubView === 'deposit_banks' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMySubView('menu')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Back to Hub"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Building className="w-5 h-5 text-teal-700" />
                        <span>Official Company Deposit Bank Accounts</span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        Transfer funds directly via LankaPay CEFTS, Online Banking, or CDM. Copy details individually below:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {companyBanks
                      .filter((b) => b.isActive)
                      .map((bank) => (
                        <div
                          key={bank.id}
                          className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                              <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                                  <Building className="w-5 h-5" />
                                </div>
                                <div>
                                  <h3 className="text-base font-bold text-slate-900">{bank.bankName}</h3>
                                  <span className="text-[11px] text-teal-700 font-semibold">
                                    Instant CEFTS & ATM CDM
                                  </span>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Active Receiving
                              </span>
                            </div>

                            {/* Individual Copy Detail Rows */}
                            <div className="mt-4 space-y-3">
                              {/* Row 1: Bank Name */}
                              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Bank Name</span>
                                  <span className="text-xs font-semibold text-slate-900">{bank.bankName}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail(`${bank.id}-bank`, bank.bankName)}
                                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedField === `${bank.id}-bank` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Row 2: Account Number */}
                              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Account Number</span>
                                  <span className="text-sm font-mono font-black text-teal-700">{bank.accountNumber}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail(`${bank.id}-acc`, bank.accountNumber)}
                                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedField === `${bank.id}-acc` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy No</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Row 3: Account Holder */}
                              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Beneficiary Name</span>
                                  <span className="text-xs font-semibold text-slate-900">{bank.accountName}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail(`${bank.id}-holder`, bank.accountName)}
                                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedField === `${bank.id}-holder` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Row 4: Branch */}
                              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Branch</span>
                                  <span className="text-xs font-semibold text-slate-900">{bank.branch}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail(`${bank.id}-branch`, bank.branch)}
                                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedField === `${bank.id}-branch` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Row 5: Payment Remark */}
                              <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50/50 border border-teal-200/60">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-teal-800 block">
                                    Payment Remark (Reference)
                                  </span>
                                  <span className="text-xs font-mono font-bold text-teal-900">{user.phone}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopyDetail(`${bank.id}-remark`, user.phone)}
                                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-800 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedField === `${bank.id}-remark` ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {bank.instructions && (
                              <p className="text-[11px] text-slate-500 mt-3 italic bg-slate-100 p-2.5 rounded-xl">
                                💡 Note: {bank.instructions}
                              </p>
                            )}
                          </div>

                          <div className="mt-5 pt-4 border-t border-slate-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                setSelectedDepositBankId(bank.id);
                                setPayoutSubTab('deposit');
                                setActiveTab('payout');
                                handleOpenPaymentGateway(e);
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                            >
                              <ArrowDownLeft className="w-4 h-4" />
                              <span>Deposit via Secure Gateway</span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================
                SUB-VIEW 5: ABOUT & OPERATING RULES
               ========================================================= */}
            {mySubView === 'about' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMySubView('menu')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Back to Hub"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Info className="w-5 h-5 text-teal-700" />
                        <span>About Platform & Operating Rules</span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        Official guidelines, fee structures, and algorithmic share mining policies
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Platform Architecture */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Building className="w-4 h-4 text-teal-700" />
                        <span>Colombo Stock Exchange Watchlist Architecture</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The platform bridges institutional algorithmic mining nodes directly with top Colombo Stock Exchange (CSE) Watchlist equities—including John Keells Holdings PLC (JKH), Commercial Bank of Ceylon PLC (COMB), Sampath Bank PLC (SAMP), and Hatton National Bank PLC (HNB). Hash power allocation produces real-time algorithmic daily yields.
                      </p>
                    </div>

                    {/* Deposit Rules */}
                    <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
                      <div className="flex items-center gap-2 text-teal-950 font-bold text-sm">
                        <ArrowDownLeft className="w-4 h-4 text-teal-700" />
                        <span>Deposit & Gateway Portal Rules</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>
                          <strong>Minimum Deposit:</strong> {formatLkr(config.minDepositLkr)} per order.
                        </li>
                        <li>
                          <strong>Payment Gateway:</strong> All deposits connect via our SSL 256-bit encrypted gateway with a unique tracking order number.
                        </li>
                        <li>
                          <strong>Receipt Verification:</strong> Upload clear bank transfer slip/screen capture for treasury approval.
                        </li>
                      </ul>
                    </div>

                    {/* Withdrawal Policy & 15% Fee */}
                    <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                      <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                        <ArrowUpRight className="w-4 h-4 text-amber-700" />
                        <span>Withdrawal Policy & 15% Clearance Fee</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                        <li>
                          <strong>Minimum Withdrawal:</strong> {formatLkr(config.minWithdrawalLkr)} directly to your linked bank account.
                        </li>
                        <li>
                          <strong>15% Service Fee:</strong> Deducted automatically for Central Bank & LankaPay CEFTS interbank routing clearance.
                        </li>
                        <li>
                          <strong>Disbursal Window:</strong> Monday through Friday, 10:00 AM – 18:00 PM (Sri Lanka Time).
                        </li>
                      </ul>
                    </div>

                    {/* 3-Tier Referral Matrix */}
                    <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                        <Users className="w-4 h-4 text-emerald-700" />
                        <span>3-Level Team Referral Matrix (33% Total)</span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-700">
                        <div className="flex justify-between py-1 border-b border-emerald-200/50">
                          <span className="font-semibold">Level 1 (Direct Invitations):</span>
                          <span className="font-bold text-emerald-700">{config.level1CommissionPercent}% Instant Rebate</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-emerald-200/50">
                          <span className="font-semibold">Level 2 (Sub-Team):</span>
                          <span className="font-bold text-emerald-700">{config.level2CommissionPercent}% Instant Rebate</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="font-semibold">Level 3 (Extended Team):</span>
                          <span className="font-bold text-emerald-700">{config.level3CommissionPercent}% Instant Rebate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================
                SUB-VIEW 6: SUPPORT CHANNELS & LIVE CHAT
               ========================================================= */}
            {mySubView === 'support' && (
              <div className="space-y-6">
                {/* Official Channels */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMySubView('menu')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      title="Back to Hub"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-teal-700" />
                        <span>Official Support & Community Channels</span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        Join verified Sri Lankan customer channels and groups configured by Administrator
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                    <a
                      href={socialChannels.telegramSupport}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Send className="w-5 h-5 text-sky-600 mb-1" />
                      <span className="text-xs font-bold text-slate-900">Telegram 24/7</span>
                      <span className="text-[10px] text-slate-500">Direct Support</span>
                    </a>

                    <a
                      href={socialChannels.telegramChannel}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Send className="w-5 h-5 text-sky-700 mb-1" />
                      <span className="text-xs font-bold text-slate-900">TG Channel</span>
                      <span className="text-[10px] text-slate-500">Official News</span>
                    </a>

                    <a
                      href={socialChannels.telegramGroup}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Users className="w-5 h-5 text-sky-800 mb-1" />
                      <span className="text-xs font-bold text-slate-900">TG Group</span>
                      <span className="text-[10px] text-slate-500">Community Chat</span>
                    </a>

                    <a
                      href={socialChannels.whatsappSupport}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-600 mb-1" />
                      <span className="text-xs font-bold text-slate-900">WhatsApp Help</span>
                      <span className="text-[10px] text-slate-500">Customer Care</span>
                    </a>

                    <a
                      href={socialChannels.whatsappGroup}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Users className="w-5 h-5 text-emerald-700 mb-1" />
                      <span className="text-xs font-bold text-slate-900">WA Group</span>
                      <span className="text-[10px] text-slate-500">VIP Members</span>
                    </a>

                    <a
                      href={socialChannels.facebookPage}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors flex flex-col items-center text-center cursor-pointer"
                    >
                      <Share2 className="w-5 h-5 text-indigo-600 mb-1" />
                      <span className="text-xs font-bold text-slate-900">Facebook</span>
                      <span className="text-[10px] text-slate-500">Official Page</span>
                    </a>
                  </div>
                </div>

                {/* Support Chat Desk */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col h-[500px]">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Direct In-App Support Chat</h2>
                      <p className="text-xs text-slate-500">Chat with Treasury & Verification Officers</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Online</span>
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                    {supportMessages.map((msg) => {
                      const isUser = msg.sender === 'user';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                        >
                          <span className="text-[11px] text-slate-400 mb-1">{msg.senderName}</span>
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
                              isUser ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSendSupportMessage} className="pt-3 border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Write message to administrator..."
                      className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 6: COMPREHENSIVE ADMIN PANEL
            (User Management, Deposit Receipts, Bank CRUD, Socials)
           ========================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                    CENTRAL ADMINISTRATOR SUITE
                  </span>
                  <h1 className="text-2xl font-bold mt-1">Platform Treasury, Users & Content Governance</h1>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Back to Member View
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 font-mono tabular-nums">
                <div>
                  <p className="text-xs font-sans text-slate-400">Total Registered Users</p>
                  <p className="text-2xl font-bold text-white mt-1">{allUsers.length} Users</p>
                </div>
                <div>
                  <p className="text-xs font-sans text-slate-400">Pending Deposit Receipts</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">
                    {formatLkr(adminStats.pendingDepositsTotal)}{' '}
                    <span className="text-xs font-normal text-slate-400">({adminStats.pendingDepositsCount})</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-sans text-slate-400">Pending Withdrawals</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">
                    {formatLkr(adminStats.pendingWithdrawalsTotal)}{' '}
                    <span className="text-xs font-normal text-slate-400">({adminStats.pendingWithdrawalsCount})</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-sans text-slate-400">Company Deposit Accounts</p>
                  <p className="text-2xl font-bold text-teal-300 mt-1">{companyBanks.length} Active</p>
                </div>
              </div>
            </div>

            {/* Admin Sub Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-2xl w-fit">
              <button
                type="button"
                onClick={() => setAdminSubTab('users')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'users' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                User Management ({allUsers.length})
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('packages')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                  adminSubTab === 'packages' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Package className="w-3.5 h-3.5 text-teal-700" />
                <span>VIP Packages ({vipTiers.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('deposits')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'deposits' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Deposit Receipts ({adminStats.pendingDepositsCount} Pending)
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('withdrawals')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'withdrawals' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Withdrawals ({adminStats.pendingWithdrawalsCount})
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('banks')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'banks' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Deposit Bank Accounts ({companyBanks.length})
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('channels')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'channels' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Social & Support Channels
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('commissions')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'commissions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Commission Rates
              </button>
              <button
                type="button"
                onClick={() => setAdminSubTab('support')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  adminSubTab === 'support' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chat Desk
              </button>
            </div>

            {/* ADMIN SUB-VIEW 1: USER MANAGEMENT (View All Users, Bank Accounts, Edit Balance, Logout, History) */}
            {adminSubTab === 'users' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Registered Users Directory</h2>
                    <p className="text-xs text-slate-500">
                      View all registered members, inspect bank accounts, edit balances, view transaction ledgers, or force logout.
                    </p>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={adminUserSearch}
                      onChange={(e) => setAdminUserSearch(e.target.value)}
                      placeholder="Search by name, phone or code..."
                      className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl w-64 focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                        <th className="pb-3 pl-2">Member</th>
                        <th className="pb-3">Balance</th>
                        <th className="pb-3">Bank Account</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right pr-2">Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allUsers
                        .filter(
                          (u) =>
                            u.name.toLowerCase().includes(adminUserSearch.toLowerCase()) ||
                            u.phone.includes(adminUserSearch) ||
                            u.referralCode.toLowerCase().includes(adminUserSearch.toLowerCase())
                        )
                        .map((u) => (
                          <tr key={u.id} className="hover:bg-slate-50/60">
                            <td className="py-3 pl-2">
                              <p className="font-bold text-slate-900">{u.name}</p>
                              <p className="text-[11px] font-mono text-slate-500">
                                {u.phone} · <span className="text-teal-700 font-bold">{u.referralCode}</span>
                              </p>
                            </td>

                            <td className="py-3 font-mono">
                              <p className="font-bold text-slate-900 text-sm tabular-nums">
                                {formatLkr(u.balanceLkr)}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                In: {formatLkr(u.totalDepositedLkr)} · Out: {formatLkr(u.totalWithdrawnLkr)}
                              </p>
                            </td>

                            <td className="py-3">
                              {u.bankName ? (
                                <div className="space-y-0.5">
                                  <p className="font-semibold text-slate-800">{u.bankName}</p>
                                  <p className="font-mono text-slate-600 text-[11px]">No: {u.accountNumber}</p>
                                  <p className="text-slate-500 text-[10px]">Holder: {u.accountHolder}</p>
                                </div>
                              ) : (
                                <span className="text-slate-400 italic">No bank set</span>
                              )}
                            </td>

                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  u.status === 'suspended'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {u.status || 'Active'}
                              </span>
                            </td>

                            <td className="py-3 text-right pr-2 space-x-1 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setAdminSelectedUser(u)}
                                className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold rounded-lg text-[11px] cursor-pointer"
                              >
                                Edit Balance
                              </button>

                              <button
                                type="button"
                                onClick={() => setAdminViewUserTxHistory(u)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-[11px] cursor-pointer"
                              >
                                History
                              </button>

                              <button
                                type="button"
                                onClick={() => handleAdminForceLogoutUser(u.id)}
                                className={`px-2.5 py-1.5 font-semibold rounded-lg text-[11px] cursor-pointer ${
                                  u.status === 'suspended'
                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                }`}
                              >
                                {u.status === 'suspended' ? 'Activate' : 'Force Logout'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADMIN MODAL: EDIT USER BALANCE */}
            {adminSelectedUser && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">
                      Edit User Balance · {adminSelectedUser.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setAdminSelectedUser(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAdminSubmitBalanceEdit} className="mt-4 space-y-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                      <p className="text-slate-500">Current Balance:</p>
                      <p className="text-xl font-bold text-slate-900 mt-0.5">
                        {formatLkr(adminSelectedUser.balanceLkr)}
                      </p>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Amount to Credit (+) or Debit (-) in LKR
                      </label>
                      <input
                        type="number"
                        step="50"
                        value={adminBalanceDelta}
                        onChange={(e) => setAdminBalanceDelta(e.target.value)}
                        placeholder="e.g. 500 (Credit) or -500 (Debit)"
                        className="w-full px-3.5 py-2.5 font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Reason / Note for Ledger</label>
                      <input
                        type="text"
                        value={adminBalanceReason}
                        onChange={(e) => setAdminBalanceReason(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setAdminSelectedUser(null)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-semibold"
                      >
                        Apply Adjustment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ADMIN MODAL: VIEW USER TRANSACTION HISTORY */}
            {adminViewUserTxHistory && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Transaction History · {adminViewUserTxHistory.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                          ID: {adminViewUserTxHistory.id} · Phone: {adminViewUserTxHistory.phone}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAdminViewUserTxHistory(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
                      {transactions.filter((t) => t.userId === adminViewUserTxHistory.id).length === 0 ? (
                        <p className="py-8 text-center text-xs text-slate-400 italic">No transactions recorded for this user.</p>
                      ) : (
                        transactions
                          .filter((t) => t.userId === adminViewUserTxHistory.id)
                          .map((t) => (
                            <div key={t.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between text-xs">
                              <div>
                                <p className="font-semibold text-slate-900">{t.note}</p>
                                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                                  {t.createdAt} · Status: <span className="capitalize font-bold">{t.status}</span>
                                </p>
                              </div>
                              <span className="font-mono font-bold text-slate-900 text-sm">
                                {formatLkr(t.amountLkr)}
                              </span>
                            </div>
                          ))
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setAdminViewUserTxHistory(null)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                    >
                      Close Ledger
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN SUB-VIEW: MANAGE VIP PACKAGES (Add, Edit, Delete) */}
            {adminSubTab === 'packages' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Manage VIP Investment Packages · ආයෝජන මට්ටම්
                    </h2>
                    <p className="text-xs text-slate-500">
                      Add new share market packages, edit daily reward yields and activation costs, or delete tiers.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetDefaultPackages}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                    {!isAddingPackage && !editingPackage && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPackage(true);
                          setEditingPackage(null);
                          const nextLevel = vipTiers.length + 1;
                          setPackageFormData({
                            name: `VIP ${nextLevel} · Prime Sovereign`,
                            sinhalaName: `කොටස් වෙළඳපල මට්ටම ${nextLevel} · රු. ${(nextLevel * 3000).toLocaleString()}`,
                            priceLkr: nextLevel * 3000,
                            dailyRewardLkr: nextLevel * 300,
                            cycleDays: 30,
                            description: 'High-throughput Colombo Stock Exchange equity mining node.',
                            marketLevel: `Share Market Level ${nextLevel}`,
                            levelNumber: nextLevel,
                            hashPower: `${(nextLevel * 35).toFixed(1)} GH/s`,
                            stockBacking: 'CSE Institutional Growth Equities',
                            themeColor: 'emerald',
                          });
                        }}
                        className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Package</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Add / Edit Form */}
                {(isAddingPackage || editingPackage) && (
                  <form
                    onSubmit={handleSavePackage}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900">
                        {editingPackage ? `Edit Package: ${editingPackage.name}` : 'Add New VIP Package'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPackage(false);
                          setEditingPackage(null);
                        }}
                        className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Package Display Name
                        </label>
                        <input
                          type="text"
                          required
                          value={packageFormData.name}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="e.g. VIP 1 · Blue-Chip Micro"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Sinhala Title · නම
                        </label>
                        <input
                          type="text"
                          value={packageFormData.sinhalaName}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({ ...prev, sinhalaName: e.target.value }))
                          }
                          placeholder="e.g. ආරම්භක කොටස් වෙළඳපල මට්ටම 1"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Market Level Badge
                        </label>
                        <input
                          type="text"
                          required
                          value={packageFormData.marketLevel}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({ ...prev, marketLevel: e.target.value }))
                          }
                          placeholder="e.g. Share Market Level 1"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Level Number
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={packageFormData.levelNumber}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({
                              ...prev,
                              levelNumber: parseInt(e.target.value) || 1,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 font-mono bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Mining Hash Power
                        </label>
                        <input
                          type="text"
                          value={packageFormData.hashPower}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({ ...prev, hashPower: e.target.value }))
                          }
                          placeholder="e.g. 15.0 GH/s"
                          className="w-full px-3.5 py-2.5 font-mono bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Activation Price (LKR)
                        </label>
                        <input
                          type="number"
                          required
                          min="100"
                          step="100"
                          value={packageFormData.priceLkr}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({
                              ...prev,
                              priceLkr: parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 font-mono font-bold bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Daily Return / Reward (LKR)
                        </label>
                        <input
                          type="number"
                          required
                          min="10"
                          step="10"
                          value={packageFormData.dailyRewardLkr}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({
                              ...prev,
                              dailyRewardLkr: parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 font-mono font-bold text-emerald-700 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Cycle Duration (Days)
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="365"
                          value={packageFormData.cycleDays}
                          onChange={(e) =>
                            setPackageFormData((prev) => ({
                              ...prev,
                              cycleDays: parseInt(e.target.value) || 30,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 font-mono bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Underlying Stock Backing / CSE Node
                      </label>
                      <input
                        type="text"
                        value={packageFormData.stockBacking}
                        onChange={(e) =>
                          setPackageFormData((prev) => ({ ...prev, stockBacking: e.target.value }))
                        }
                        placeholder="e.g. Colombo Financials & Telecom Index"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Package Description
                      </label>
                      <input
                        type="text"
                        value={packageFormData.description}
                        onChange={(e) =>
                          setPackageFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="e.g. Starter CSE mining cluster allocated to banking and manufacturing equities."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    {/* Financial Return Summary */}
                    {packageFormData.priceLkr > 0 && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Daily Rate</span>
                          <span className="font-bold text-emerald-700">
                            +{((packageFormData.dailyRewardLkr / packageFormData.priceLkr) * 100).toFixed(1)}% / day
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Total Cycle Return</span>
                          <span className="font-bold text-slate-900">
                            {formatLkr(packageFormData.dailyRewardLkr * packageFormData.cycleDays)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Net Loyalty Gain</span>
                          <span className="font-bold text-teal-700">
                            +{formatLkr((packageFormData.dailyRewardLkr * packageFormData.cycleDays) - packageFormData.priceLkr)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">L1 Referral Rebate</span>
                          <span className="font-bold text-slate-700">
                            {formatLkr((packageFormData.priceLkr * config.level1CommissionPercent) / 100)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPackage(false);
                          setEditingPackage(null);
                        }}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-semibold cursor-pointer"
                      >
                        {editingPackage ? 'Save Package Changes' : 'Create Package'}
                      </button>
                    </div>
                  </form>
                )}

                {/* VIP Packages Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vipTiers.map((tier) => {
                    const totalReturn = tier.dailyRewardLkr * tier.cycleDays;
                    const dailyPercent = ((tier.dailyRewardLkr / tier.priceLkr) * 100).toFixed(1);

                    return (
                      <div
                        key={tier.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                {tier.marketLevel}
                              </span>
                              <h3 className="text-base font-bold text-slate-900 mt-1">{tier.name}</h3>
                              <p className="text-xs text-teal-700 font-medium">{tier.sinhalaName}</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                              {tier.hashPower}
                            </span>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 font-mono tabular-nums text-xs">
                            <div>
                              <span className="text-[10px] text-slate-500 font-sans block">Price</span>
                              <span className="font-bold text-slate-900 text-sm">{formatLkr(tier.priceLkr)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 font-sans block">Daily (+{dailyPercent}%)</span>
                              <span className="font-bold text-emerald-700 text-sm">+{formatLkr(tier.dailyRewardLkr)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 font-sans block">{tier.cycleDays} Days Return</span>
                              <span className="font-bold text-slate-900 text-sm">{formatLkr(totalReturn)}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 mt-3 leading-relaxed">{tier.description}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-1">Equity: {tier.stockBacking}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-end gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPackage(tier);
                              setIsAddingPackage(false);
                              setPackageFormData({
                                name: tier.name,
                                sinhalaName: tier.sinhalaName,
                                priceLkr: tier.priceLkr,
                                dailyRewardLkr: tier.dailyRewardLkr,
                                cycleDays: tier.cycleDays,
                                description: tier.description,
                                marketLevel: tier.marketLevel,
                                levelNumber: tier.levelNumber,
                                hashPower: tier.hashPower,
                                stockBacking: tier.stockBacking,
                                themeColor: tier.themeColor,
                              });
                            }}
                            className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePackage(tier.id)}
                            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ADMIN SUB-VIEW 2: DEPOSIT RECEIPTS (View submitted receipts & Approve/Reject) */}
            {adminSubTab === 'deposits' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Submitted Deposit Receipts Verification</h2>
                    <p className="text-xs text-slate-500">
                      Inspect submitted bank transfer slips, verify reference codes, and approve or reject deposit credits.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    {adminStats.pendingDepositsCount} Pending Verification
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {transactions.filter((t) => t.type === 'deposit').length === 0 ? (
                    <p className="py-8 text-center text-xs text-slate-400">No deposit records submitted yet.</p>
                  ) : (
                    transactions
                      .filter((t) => t.type === 'deposit')
                      .map((tx) => (
                        <div
                          key={tx.id}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{tx.userName}</span>
                              <span className="text-xs text-slate-400">·</span>
                              <span className="text-xs font-mono text-slate-600">{tx.createdAt}</span>
                            </div>

                            <p className="text-xs text-slate-700 mt-1">
                              Deposited To: <strong className="font-semibold">{tx.depositBankName || tx.method}</strong>
                            </p>

                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-mono">
                              <span>Amount: <strong className="text-slate-900 font-bold">{formatLkr(tx.amountLkr)}</strong></span>
                              {tx.referenceNo && (
                                <>
                                  <span>·</span>
                                  <span className="text-teal-700 font-semibold">Ref: {tx.referenceNo}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* View Receipt Button */}
                            {tx.receiptUrl && (
                              <button
                                type="button"
                                onClick={() => setViewingReceiptTx(tx)}
                                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer min-h-[40px]"
                              >
                                <FileText className="w-4 h-4 text-teal-700" />
                                <span>Inspect Receipt</span>
                              </button>
                            )}

                            {tx.status === 'pending' ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleAdminDepositDecision(tx.id, 'completed')}
                                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl min-h-[40px] cursor-pointer"
                                >
                                  Approve & Credit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAdminDepositDecision(tx.id, 'rejected')}
                                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl min-h-[40px] cursor-pointer"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span
                                className={`text-xs font-bold capitalize px-3 py-1 rounded-full ${
                                  tx.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {tx.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}



            {/* ADMIN SUB-VIEW 3: WITHDRAWAL REQUESTS */}
            {adminSubTab === 'withdrawals' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                <h2 className="text-base font-bold text-slate-900">Withdrawal Requests</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review member bank accounts, verify 15% fee deduction, and approve or reject payouts.
                </p>

                <div className="mt-4 divide-y divide-slate-100">
                  {transactions
                    .filter((t) => t.type === 'withdrawal')
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{tx.userName}</span>
                            <span className="text-xs text-slate-400">·</span>
                            <span className="text-xs font-mono text-slate-600">{tx.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            Destination: <strong className="font-mono">{tx.accountDetails || tx.method}</strong>
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-mono">
                            <span>Gross: {formatLkr(tx.amountLkr)}</span>
                            <span>·</span>
                            <span>Fee: {formatLkr(tx.feeLkr ?? 0)}</span>
                            <span>·</span>
                            <span className="text-teal-700 font-bold">
                              Net: {formatLkr(tx.netAmountLkr ?? tx.amountLkr)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {tx.status === 'pending' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleAdminWithdrawalDecision(tx.id, 'completed')}
                                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl min-h-[40px] cursor-pointer"
                              >
                                Approve Payout
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdminWithdrawalDecision(tx.id, 'rejected')}
                                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl min-h-[40px] cursor-pointer"
                              >
                                Reject & Refund
                              </button>
                            </>
                          ) : (
                            <span className="text-xs font-medium text-slate-500 capitalize">{tx.status}</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ADMIN SUB-VIEW 4: COMPANY DEPOSIT BANK ACCOUNTS CRUD */}
            {adminSubTab === 'banks' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Manage Company Deposit Bank Accounts</h2>
                    <p className="text-xs text-slate-500">
                      Add and edit the Sri Lankan recipient bank accounts that members see when making deposits.
                    </p>
                  </div>
                  {!isAddingBank && !editingBank && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingBank(true);
                        setEditingBank(null);
                        setBankFormData({
                          bankName: '',
                          accountName: '',
                          accountNumber: '',
                          branch: '',
                          isActive: true,
                          instructions: '',
                        });
                      }}
                      className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Bank Account</span>
                    </button>
                  )}
                </div>

                {/* Add / Edit Form */}
                {(isAddingBank || editingBank) && (
                  <form onSubmit={handleSaveCompanyBank} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
                    <h3 className="text-sm font-bold text-slate-900">
                      {editingBank ? `Edit Account: ${editingBank.bankName}` : 'Add New Deposit Bank Account'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={bankFormData.bankName}
                          onChange={(e) => setBankFormData((prev) => ({ ...prev, bankName: e.target.value }))}
                          placeholder="e.g. Commercial Bank of Ceylon"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Account Holder Name</label>
                        <input
                          type="text"
                          value={bankFormData.accountName}
                          onChange={(e) => setBankFormData((prev) => ({ ...prev, accountName: e.target.value }))}
                          placeholder="e.g. LKR Share Market Ltd"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Account Number</label>
                        <input
                          type="text"
                          value={bankFormData.accountNumber}
                          onChange={(e) => setBankFormData((prev) => ({ ...prev, accountNumber: e.target.value }))}
                          placeholder="e.g. 1000849201"
                          className="w-full px-3.5 py-2.5 font-mono bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">Branch Name / Code</label>
                        <input
                          type="text"
                          value={bankFormData.branch}
                          onChange={(e) => setBankFormData((prev) => ({ ...prev, branch: e.target.value }))}
                          placeholder="e.g. Colombo Fort (001)"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="bankActiveToggle"
                          checked={bankFormData.isActive}
                          onChange={(e) => setBankFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <label htmlFor="bankActiveToggle" className="font-semibold text-slate-800">
                          Active for User Deposits
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Deposit Instructions for Member</label>
                      <input
                        type="text"
                        value={bankFormData.instructions}
                        onChange={(e) => setBankFormData((prev) => ({ ...prev, instructions: e.target.value }))}
                        placeholder="e.g. Include your mobile number in the payment remark"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingBank(false);
                          setEditingBank(null);
                        }}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-semibold cursor-pointer"
                      >
                        {editingBank ? 'Save Changes' : 'Create Bank Account'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Bank Account List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companyBanks.map((bank) => (
                    <div
                      key={bank.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <span className="text-sm font-bold text-slate-900">{bank.bankName}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                              bank.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {bank.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <p className="font-mono text-xs font-bold text-teal-800 mt-2">
                          Account: {bank.accountNumber}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">Holder: {bank.accountName}</p>
                        <p className="text-[11px] text-slate-500">Branch: {bank.branch}</p>
                        {bank.instructions && (
                          <p className="text-[11px] text-slate-500 mt-2 italic bg-white p-2 rounded-lg border border-slate-200/60">
                            {bank.instructions}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-end gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBank(bank);
                            setIsAddingBank(false);
                            setBankFormData({
                              bankName: bank.bankName,
                              accountName: bank.accountName,
                              accountNumber: bank.accountNumber,
                              branch: bank.branch,
                              isActive: bank.isActive,
                              instructions: bank.instructions,
                            });
                          }}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompanyBank(bank.id)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN SUB-VIEW 5: SOCIAL SUPPORT CHANNELS (Telegram, WhatsApp, Facebook) */}
            {adminSubTab === 'channels' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs max-w-3xl">
                <h2 className="text-base font-bold text-slate-900">Configure Support, Channels & Groups</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update customer care links for Telegram, WhatsApp, and Facebook. These links are immediately displayed to members in the My tab.
                </p>

                <form onSubmit={handleSaveSocialChannels} className="mt-5 space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Telegram Direct Support Link</label>
                    <input
                      type="text"
                      value={socialFormData.telegramSupport}
                      onChange={(e) => setSocialFormData((prev) => ({ ...prev, telegramSupport: e.target.value }))}
                      placeholder="https://t.me/..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Telegram Official Channel</label>
                      <input
                        type="text"
                        value={socialFormData.telegramChannel}
                        onChange={(e) => setSocialFormData((prev) => ({ ...prev, telegramChannel: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Telegram Community Group</label>
                      <input
                        type="text"
                        value={socialFormData.telegramGroup}
                        onChange={(e) => setSocialFormData((prev) => ({ ...prev, telegramGroup: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">WhatsApp Customer Care Link</label>
                      <input
                        type="text"
                        value={socialFormData.whatsappSupport}
                        onChange={(e) => setSocialFormData((prev) => ({ ...prev, whatsappSupport: e.target.value }))}
                        placeholder="https://wa.me/..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">WhatsApp Community Group</label>
                      <input
                        type="text"
                        value={socialFormData.whatsappGroup}
                        onChange={(e) => setSocialFormData((prev) => ({ ...prev, whatsappGroup: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Facebook Official Page</label>
                    <input
                      type="text"
                      value={socialFormData.facebookPage}
                      onChange={(e) => setSocialFormData((prev) => ({ ...prev, facebookPage: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Save Support & Social Channels
                  </button>
                </form>
              </div>
            )}

            {/* ADMIN SUB-VIEW 6: COMMISSION RATES */}
            {adminSubTab === 'commissions' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl shadow-xs">
                <form onSubmit={handleSaveAdminConfig} className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Level 1 (%)
                      </label>
                      <input
                        type="number"
                        value={adminConfigDraft.level1CommissionPercent}
                        onChange={(e) =>
                          setAdminConfigDraft((prev) => ({
                            ...prev,
                            level1CommissionPercent: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Level 2 (%)
                      </label>
                      <input
                        type="number"
                        value={adminConfigDraft.level2CommissionPercent}
                        onChange={(e) =>
                          setAdminConfigDraft((prev) => ({
                            ...prev,
                            level2CommissionPercent: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Level 3 (%)
                      </label>
                      <input
                        type="number"
                        value={adminConfigDraft.level3CommissionPercent}
                        onChange={(e) =>
                          setAdminConfigDraft((prev) => ({
                            ...prev,
                            level3CommissionPercent: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-teal-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Save Commission Rates
                  </button>
                </form>
              </div>
            )}

            {/* ADMIN SUB-VIEW 7: SUPPORT CHAT DESK */}
            {adminSubTab === 'support' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl shadow-xs">
                <div className="space-y-2 max-h-64 overflow-y-auto bg-slate-50 p-4 rounded-xl">
                  {supportMessages.map((msg) => (
                    <div key={msg.id} className="text-xs">
                      <strong>{msg.senderName}:</strong> {msg.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAdminSendSupportReply} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={adminReplyInput}
                    onChange={(e) => setAdminReplyInput(e.target.value)}
                    placeholder="Reply as Admin Support..."
                    className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 items-center h-16 px-1"
      >
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
            activeTab === 'home' ? 'text-teal-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Home</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('vip')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
            activeTab === 'vip' ? 'text-teal-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Crown className="w-5 h-5" />
          <span className="text-[10px] mt-1">VIP</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payout')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
            activeTab === 'payout' ? 'text-teal-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] mt-1">Payout</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
            activeTab === 'team' ? 'text-teal-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-1">Team</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my')}
          className={`flex flex-col items-center justify-center min-h-[44px] cursor-pointer ${
            activeTab === 'my' ? 'text-teal-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] mt-1">My</span>
        </button>
      </nav>

      {/* GLOBAL ZOOMABLE RECEIPT INSPECTION MODAL (FOR ADMINS AND MEMBERS) */}
      {viewingReceiptTx && (
        <ZoomableReceiptModal
          tx={viewingReceiptTx}
          onClose={() => setViewingReceiptTx(null)}
          isAdmin={user.role === 'admin'}
          onApprove={(txId) => handleAdminDepositDecision(txId, 'completed')}
          onReject={(txId) => handleAdminDepositDecision(txId, 'rejected')}
        />
      )}
    </div>
  );
}
