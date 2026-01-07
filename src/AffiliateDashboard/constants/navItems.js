import {
  LayoutDashboard,
  User,
  ChartColumn,
  Link2,
  CreditCard,
  Image,
  Send,
  CircleQuestionMark,
  FileText,
  Users
} from 'lucide-react';

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', link: '/affiliate/dashboard', active: false },
  { icon: User, label: 'Profile', link: '/affiliate/profile', active: false },
  { icon: ChartColumn, label: 'Statistics', link: '/affiliate/statistics', active: false },
  { icon: Link2, label: 'Links', link: '/affiliate/links', active: false },
  { icon: Link2, label: 'Analytics', link: '/affiliate/analytics', active: false },
  { icon: CreditCard, label: 'Payments', link: '/affiliate/payments', active: false },
  { icon: Image, label: 'Promo Materials', link: '/affiliate/promo', active: false },
  { icon: Send, label: 'Telegram Bot', link: '/affiliate/telegram', active: false },
  { icon: CircleQuestionMark, label: 'Support', link: '/affiliate/support', active: false },
  { icon: FileText, label: 'Affiliate Programs', link: '/affiliate/programs', active: false },
  { icon: Users, label: 'Sub Affiliate', link: '/affiliate/sub-affiliate', active: false },
];

