/**
 * Mock Data Generator
 * Generates realistic test data for all admin features
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'gamer';
  status: 'active' | 'suspended' | 'banned';
  joinDate: string;
  lastLogin: string;
  createdAt: number;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'recipe' | 'news' | 'announcement' | 'event';
  status: 'draft' | 'pending' | 'published';
  author: string;
  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
  itemCount?: number;
  views?: number;
}

export interface Backup {
  id: string;
  timestamp: number;
  size: string;
  type: 'full' | 'incremental';
  status: 'success' | 'failed' | 'pending';
  duration: number;
}

export interface SystemSettings {
  appName: string;
  description: string;
  maintenanceMode: boolean;
  features: {
    leaderboards: boolean;
    tournaments: boolean;
    social: boolean;
    premiumFeatures: boolean;
  };
  apiUrl: string;
  apiTimeout: number;
  rateLimit: number;
  emailFrom: string;
  databaseSize: string;
}

export interface Permission {
  [key: string]: boolean;
}

export interface RolePermissions {
  role: 'super_admin' | 'content_moderator' | 'user_manager' | 'analyst';
  permissions: Permission;
  userCount: number;
}

const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'James', 'Emma', 'Robert', 'Lisa', 'William', 'Jennifer',
  'David', 'Maria', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Daniel', 'Karen', 'Nancy'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const cuisines = ['Italian', 'French', 'Asian', 'Mexican', 'Mediterranean', 'American', 'Indian', 'Thai', 'Japanese', 'Spanish'];

const newsTopics = [
  'New Recipe Update',
  'Tournament Announcement',
  'Spring Cooking Challenge',
  'Community Spotlight',
  'Feature Release',
  'Holiday Special',
  'User Tips & Tricks',
  'Chef Interview',
  'Cooking Trends',
  'Seasonal Ingredients',
];

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
}

function daysAgo(days: number): number {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

function timeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

export function generateMockUsers(count: number = 25): User[] {
  const hardcodedUsers: User[] = [
    {
      id: '1',
      name: 'Chef Player',
      email: 'gamer@masterchef.com',
      role: 'gamer',
      status: 'active',
      joinDate: formatDate(daysAgo(60)),
      lastLogin: formatDate(daysAgo(0)),
      createdAt: daysAgo(60),
    },
    {
      id: '2',
      name: 'Admin Chef',
      email: 'admin@masterchef.com',
      role: 'admin',
      status: 'active',
      joinDate: formatDate(daysAgo(120)),
      lastLogin: formatDate(daysAgo(0)),
      createdAt: daysAgo(120),
    },
  ];

  const generatedUsers: User[] = [];
  for (let i = 0; i < count - 2; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const email = generateEmail(firstName, lastName);
    const status = randomItem(['active', 'suspended', 'banned'] as const);
    const joinDate = daysAgo(randomInt(5, 365));
    const lastLogin = status === 'active' ? daysAgo(randomInt(0, 30)) : daysAgo(randomInt(30, 365));

    generatedUsers.push({
      id: `user_${i + 3}`,
      name: `${firstName} ${lastName}`,
      email,
      role: randomItem(['gamer', 'gamer', 'moderator'] as const),
      status,
      joinDate: formatDate(joinDate),
      lastLogin: formatDate(lastLogin),
      createdAt: joinDate,
    });
  }

  return [...hardcodedUsers, ...generatedUsers];
}

export function generateMockContent(count: number = 15): Content[] {
  const hardcodedContent: Content[] = [
    {
      id: 'recipe_1',
      title: 'Recipes Database',
      description: 'Complete collection of recipes',
      type: 'recipe',
      status: 'published',
      author: 'Admin Chef',
      createdAt: daysAgo(90),
      updatedAt: daysAgo(2),
      publishedAt: daysAgo(90),
      itemCount: 847,
      views: 125000,
    },
    {
      id: 'event_1',
      title: 'Game Events',
      description: 'Current and upcoming events',
      type: 'event',
      status: 'published',
      author: 'Admin Chef',
      createdAt: daysAgo(30),
      updatedAt: daysAgo(1),
      publishedAt: daysAgo(30),
      itemCount: 23,
      views: 8500,
    },
    {
      id: 'announce_1',
      title: 'Leaderboards',
      description: 'Current rankings and scores',
      type: 'announcement',
      status: 'published',
      author: 'Admin Chef',
      createdAt: daysAgo(60),
      updatedAt: daysAgo(0),
      publishedAt: daysAgo(60),
      itemCount: 1,
      views: 45000,
    },
    {
      id: 'news_1',
      title: 'News Articles',
      description: 'Latest news and updates',
      type: 'news',
      status: 'draft',
      author: 'Admin Chef',
      createdAt: daysAgo(1),
      updatedAt: daysAgo(0),
      views: 0,
    },
    {
      id: 'announce_2',
      title: 'Announcements',
      description: 'Important announcements',
      type: 'announcement',
      status: 'published',
      author: 'Admin Chef',
      createdAt: daysAgo(15),
      updatedAt: daysAgo(1),
      publishedAt: daysAgo(15),
      itemCount: 5,
      views: 12000,
    },
  ];

  const generatedContent: Content[] = [];
  for (let i = 0; i < count - 5; i++) {
    const contentType = randomItem(['recipe', 'news', 'announcement'] as const);
    const title = contentType === 'recipe'
      ? `${randomItem(cuisines)} ${randomItem(['Salad', 'Pasta', 'Soup', 'Dessert', 'Main Course'])}`
      : randomItem(newsTopics);

    const createdAt = daysAgo(randomInt(1, 90));
    const status = randomItem(['draft', 'pending', 'published'] as const);
    const updatedAt = daysAgo(randomInt(0, 30));

    generatedContent.push({
      id: `content_${i + 6}`,
      title,
      description: `Description for ${title}`,
      type: contentType,
      status,
      author: randomItem(['Admin Chef', 'Content Mod', 'Chef User'] as const),
      createdAt,
      updatedAt,
      publishedAt: status === 'published' ? createdAt : undefined,
      itemCount: contentType === 'recipe' ? randomInt(1, 50) : undefined,
      views: status === 'published' ? randomInt(100, 50000) : 0,
    });
  }

  return [...hardcodedContent, ...generatedContent];
}

export function generateMockLogs(count: number = 150) {
  // These will be generated by the logging system
  // This function is a placeholder for initial log data
  return [];
}

export function generateMockBackups(count: number = 8): Backup[] {
  const backups: Backup[] = [];
  for (let i = 0; i < count; i++) {
    const timestamp = daysAgo(i * 3);
    backups.push({
      id: `backup_${i + 1}`,
      timestamp,
      size: `${2.2 + (Math.random() * 0.3)}GB`,
      type: i % 2 === 0 ? 'full' : 'incremental',
      status: 'success',
      duration: randomInt(300, 900),
    });
  }
  return backups.reverse();
}

export function generateMockSettings(): SystemSettings {
  return {
    appName: 'Master Chef Gaming Platform',
    description: 'Culinary-themed gaming platform for cooking enthusiasts',
    maintenanceMode: false,
    features: {
      leaderboards: true,
      tournaments: false,
      social: true,
      premiumFeatures: false,
    },
    apiUrl: 'https://api.masterchef.com',
    apiTimeout: 30000,
    rateLimit: 1000,
    emailFrom: 'noreply@masterchef.com',
    databaseSize: '2.4 GB',
  };
}

export function generateMockRoles(): RolePermissions[] {
  return [
    {
      role: 'super_admin',
      userCount: 1,
      permissions: {
        'users.create': true,
        'users.read': true,
        'users.update': true,
        'users.delete': true,
        'users.suspend': true,
        'users.ban': true,
        'content.create': true,
        'content.read': true,
        'content.update': true,
        'content.delete': true,
        'content.publish': true,
        'content.approve': true,
        'logs.read': true,
        'logs.export': true,
        'logs.delete': true,
        'settings.read': true,
        'settings.update': true,
        'backup.create': true,
        'backup.restore': true,
        'permissions.manage': true,
        'reports.generate': true,
        'reports.export': true,
      },
    },
    {
      role: 'content_moderator',
      userCount: 2,
      permissions: {
        'users.create': false,
        'users.read': true,
        'users.update': false,
        'users.delete': false,
        'users.suspend': false,
        'users.ban': false,
        'content.create': true,
        'content.read': true,
        'content.update': true,
        'content.delete': true,
        'content.publish': true,
        'content.approve': true,
        'logs.read': true,
        'logs.export': false,
        'logs.delete': false,
        'settings.read': false,
        'settings.update': false,
        'backup.create': false,
        'backup.restore': false,
        'permissions.manage': false,
        'reports.generate': false,
        'reports.export': false,
      },
    },
    {
      role: 'user_manager',
      userCount: 1,
      permissions: {
        'users.create': true,
        'users.read': true,
        'users.update': true,
        'users.delete': true,
        'users.suspend': true,
        'users.ban': true,
        'content.create': false,
        'content.read': true,
        'content.update': false,
        'content.delete': false,
        'content.publish': false,
        'content.approve': false,
        'logs.read': true,
        'logs.export': false,
        'logs.delete': false,
        'settings.read': false,
        'settings.update': false,
        'backup.create': false,
        'backup.restore': false,
        'permissions.manage': false,
        'reports.generate': false,
        'reports.export': false,
      },
    },
    {
      role: 'analyst',
      userCount: 1,
      permissions: {
        'users.create': false,
        'users.read': true,
        'users.update': false,
        'users.delete': false,
        'users.suspend': false,
        'users.ban': false,
        'content.create': false,
        'content.read': true,
        'content.update': false,
        'content.delete': false,
        'content.publish': false,
        'content.approve': false,
        'logs.read': true,
        'logs.export': true,
        'logs.delete': false,
        'settings.read': false,
        'settings.update': false,
        'backup.create': false,
        'backup.restore': false,
        'permissions.manage': false,
        'reports.generate': true,
        'reports.export': true,
      },
    },
  ];
}

export function generateMockPermissions(): RolePermissions[] {
  return generateMockRoles();
}

// Alert system
export interface Alert {
  id: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: string;
}

// Session management
export interface AdminSession {
  id: string;
  email: string;
  ipAddress: string;
  startTime: number;
  lastActivity: number;
  duration: number;
  device: string;
  status: 'active' | 'idle' | 'expired';
}

// Webhook system
export interface Webhook {
  id: string;
  event: 'user_created' | 'content_published' | 'permission_changed' | 'user_banned' | 'backup_completed';
  url: string;
  active: boolean;
  createdAt: number;
  lastTriggered?: number;
  failureCount: number;
}

// Bulk operations
export interface BulkOperation {
  id: string;
  type: 'user_export' | 'user_ban' | 'content_delete' | 'content_publish' | 'permission_update';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  itemCount: number;
  processedCount: number;
  failedCount: number;
  startTime: number;
  endTime?: number;
  createdBy: string;
  progress: number;
}

// Moderated content
export interface ModeratedContent {
  id: string;
  contentId: string;
  title: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: number;
  reviewedAt?: number;
  reviewedBy?: string;
  notes: string;
}

// Report template
export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'User Activity' | 'Content Performance' | 'Security' | 'Financial';
  metrics: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
}

// Widget layout for dashboard
export interface WidgetLayout {
  [key: string]: {
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  };
}

// ==================== PLAYER GAME DATA INTERFACES ====================

export interface PlayerProfile {
  id: string;
  name: string;
  level: number;
  exp: number;
  nextLevelExp: number;
  totalPlaytime: number;
  joinDate: string;
  rank: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  avatar: string;
}

export interface Wallet {
  coins: number;
  gems: number;
  premiumCurrency: number;
  lastTopUp: number;
  totalSpent: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'equipment' | 'ingredient' | 'cosmetic';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  effect: string;
  equipped?: boolean;
  equippedSlot?: string;
  thumbnail: string;
}

export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  rewardCoins: number;
  rewardExp: number;
  endsAt: number;
  completed: boolean;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  tier: 'common' | 'uncommon' | 'rare';
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'cosmetic' | 'equipment' | 'pass' | 'currency';
  price: number;
  currency: 'coins' | 'gems' | 'premium';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  thumbnail: string;
  onSale?: boolean;
  salePrice?: number;
}

export interface Friend {
  id: string;
  name: string;
  level: number;
  lastSeen: number;
  online: boolean;
  status: string;
  avatar: string;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  entryFee: number;
  maxPlayers: number;
  currentPlayers: number;
  prizes: { position: number; amount: number }[];
  featured: boolean;
}

export interface BattlePass {
  season: number;
  level: number;
  progress: number;
  maxLevel: number;
  premium: boolean;
  expiresAt: number;
  rewards: { level: number; reward: string }[];
}

export interface Notification {
  id: string;
  type: 'friend_request' | 'tournament_invite' | 'achievement' | 'new_content' | 'system';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  action?: { label: string; link: string };
}

// Undo transaction
export interface UndoTransaction {
  id: string;
  action: string;
  timestamp: number;
  previousState: any;
  newState: any;
  description: string;
}

const alertMessages = [
  'Database backup completed successfully',
  'High memory usage detected',
  'New user registration surge',
  'Content moderation queue growing',
  'API response time degradation',
  'Failed login attempts detected',
  'SSL certificate renewal pending',
  'Webhook delivery failure',
  'Storage quota approaching limit',
  'Scheduled maintenance upcoming',
];

const moderationReasons = [
  'Inappropriate content',
  'Spam detected',
  'Duplicate submission',
  'Policy violation',
  'Copyright concern',
  'Adult content',
  'Offensive language',
  'Misinformation',
];

const bulkOperationTypes: Array<'user_export' | 'user_ban' | 'content_delete' | 'content_publish' | 'permission_update'> = ['user_export', 'user_ban', 'content_delete', 'content_publish', 'permission_update'];
const deviceTypes = ['Chrome', 'Firefox', 'Safari', 'Mobile', 'Tablet', 'Linux'];

export function generateMockAlerts(count: number = 15): Alert[] {
  const alerts: Alert[] = [];
  const levels: Array<'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'> = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];

  for (let i = 0; i < count; i++) {
    const timestamp = daysAgo(randomInt(0, 7));
    alerts.push({
      id: `alert_${i + 1}`,
      level: randomItem(levels),
      title: randomItem(alertMessages),
      message: `This is a detailed message about: ${randomItem(alertMessages)}`,
      timestamp,
      read: Math.random() > 0.4,
      action: Math.random() > 0.6 ? 'Review' : undefined,
    });
  }

  return alerts.sort((a, b) => b.timestamp - a.timestamp);
}

export function generateMockSessions(count: number = 8): AdminSession[] {
  const sessions: AdminSession[] = [];
  const admins = ['admin@masterchef.com', 'moderator@masterchef.com', 'analyst@masterchef.com'];

  for (let i = 0; i < count; i++) {
    const startTime = daysAgo(randomInt(0, 30));
    const lastActivity = daysAgo(randomInt(0, 5));
    const duration = Math.floor((lastActivity - startTime) / 1000 / 60); // minutes

    sessions.push({
      id: `session_${i + 1}`,
      email: randomItem(admins),
      ipAddress: `192.168.${randomInt(1, 255)}.${randomInt(1, 255)}`,
      startTime,
      lastActivity,
      duration: Math.max(1, duration),
      device: randomItem(deviceTypes),
      status: lastActivity > daysAgo(1) ? 'active' : (lastActivity > daysAgo(7) ? 'idle' : 'expired'),
    });
  }

  return sessions.sort((a, b) => b.startTime - a.startTime);
}

export function generateMockWebhooks(count: number = 6): Webhook[] {
  const webhooks: Webhook[] = [];
  const eventTypes: Array<'user_created' | 'content_published' | 'permission_changed' | 'user_banned' | 'backup_completed'> =
    ['user_created', 'content_published', 'permission_changed', 'user_banned', 'backup_completed'];

  for (let i = 0; i < count; i++) {
    const createdAt = daysAgo(randomInt(0, 60));
    webhooks.push({
      id: `webhook_${i + 1}`,
      event: randomItem(eventTypes),
      url: `https://api.example.com/webhooks/${eventTypes[i % eventTypes.length]}`,
      active: Math.random() > 0.2,
      createdAt,
      lastTriggered: Math.random() > 0.3 ? daysAgo(randomInt(0, 5)) : undefined,
      failureCount: randomInt(0, 5),
    });
  }

  return webhooks;
}

export function generateMockBulkOperations(count: number = 12): BulkOperation[] {
  const operations: BulkOperation[] = [];

  for (let i = 0; i < count; i++) {
    const startTime = daysAgo(randomInt(0, 30));
    const status = randomItem(['pending', 'processing', 'completed', 'failed'] as const);
    const itemCount = randomInt(10, 500);
    const processedCount = status === 'pending' ? 0 : randomInt(0, itemCount);
    const failedCount = status === 'failed' ? randomInt(1, Math.min(5, processedCount)) : 0;
    const progress = status === 'pending' ? 0 : Math.floor((processedCount / itemCount) * 100);

    operations.push({
      id: `bulk_${i + 1}`,
      type: randomItem(bulkOperationTypes),
      status,
      itemCount,
      processedCount,
      failedCount,
      startTime,
      endTime: status === 'completed' || status === 'failed' ? daysAgo(randomInt(0, 15)) : undefined,
      createdBy: randomItem(['admin@masterchef.com', 'moderator@masterchef.com']),
      progress,
    });
  }

  return operations.sort((a, b) => b.startTime - a.startTime);
}

export function generateMockModeratedContent(count: number = 20): ModeratedContent[] {
  const contents: ModeratedContent[] = [];

  for (let i = 0; i < count; i++) {
    const submittedAt = daysAgo(randomInt(0, 30));
    const status = randomItem(['pending', 'approved', 'rejected'] as const);

    contents.push({
      id: `moderated_${i + 1}`,
      contentId: `content_${randomInt(1, 100)}`,
      title: randomItem(newsTopics),
      reason: randomItem(moderationReasons),
      status,
      submittedAt,
      reviewedAt: status !== 'pending' ? daysAgo(randomInt(0, 10)) : undefined,
      reviewedBy: status !== 'pending' ? randomItem(['admin@masterchef.com', 'moderator@masterchef.com']) : undefined,
      notes: status === 'rejected' ? 'Content violates community guidelines' : (status === 'approved' ? 'Content approved after review' : ''),
    });
  }

  return contents.sort((a, b) => b.submittedAt - a.submittedAt);
}

export function generateMockReportTemplates(): ReportTemplate[] {
  return [
    {
      id: 'template_1',
      name: 'Daily User Activity Report',
      description: 'Summary of user registrations, logins, and activity levels',
      category: 'User Activity',
      metrics: ['new_users', 'active_users', 'avg_session_duration', 'churn_rate'],
      frequency: 'daily',
    },
    {
      id: 'template_2',
      name: 'Weekly Content Performance',
      description: 'Content views, engagement, and publishing metrics',
      category: 'Content Performance',
      metrics: ['published_content', 'total_views', 'avg_engagement', 'trending_content'],
      frequency: 'weekly',
    },
    {
      id: 'template_3',
      name: 'Security Audit Report',
      description: 'Failed logins, suspicious activities, and security events',
      category: 'Security',
      metrics: ['failed_logins', 'suspicious_ips', 'banned_users', 'security_incidents'],
      frequency: 'daily',
    },
    {
      id: 'template_4',
      name: 'Monthly Financial Report',
      description: 'Revenue, transactions, and premium feature adoption',
      category: 'Financial',
      metrics: ['revenue', 'transactions', 'premium_users', 'subscription_rate'],
      frequency: 'monthly',
    },
    {
      id: 'template_5',
      name: 'Content Moderation Summary',
      description: 'Moderation queue, approvals, and rejections',
      category: 'Content Performance',
      metrics: ['pending_items', 'approved_count', 'rejected_count', 'avg_review_time'],
      frequency: 'daily',
    },
  ];
}

export function generateDefaultWidgetLayout(): WidgetLayout {
  return {
    dashboard_users: { x: 0, y: 0, width: 2, height: 2, visible: true },
    dashboard_content: { x: 2, y: 0, width: 2, height: 2, visible: true },
    dashboard_activity: { x: 4, y: 0, width: 2, height: 2, visible: true },
    dashboard_alerts: { x: 0, y: 2, width: 3, height: 2, visible: true },
    dashboard_sessions: { x: 3, y: 2, width: 3, height: 2, visible: true },
    dashboard_webhooks: { x: 0, y: 4, width: 2, height: 2, visible: true },
    dashboard_backups: { x: 2, y: 4, width: 2, height: 2, visible: true },
    dashboard_performance: { x: 4, y: 4, width: 2, height: 2, visible: true },
  };
}

// ==================== PLAYER GAME DATA GENERATORS ====================

export function generatePlayerProfile(currentUser?: any): PlayerProfile {
  return {
    id: currentUser?.id || '1',
    name: currentUser?.name || 'Master Chef',
    level: randomInt(5, 45),
    exp: randomInt(0, 5000),
    nextLevelExp: 5000,
    totalPlaytime: randomInt(100, 5000),
    joinDate: formatDate(daysAgo(randomInt(30, 600))),
    rank: randomInt(1, 10000),
    tier: randomItem(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'player'}`,
  };
}

export function generatePlayerWallet(): Wallet {
  return {
    coins: randomInt(1000, 50000),
    gems: randomInt(10, 500),
    premiumCurrency: randomInt(0, 300),
    lastTopUp: daysAgo(randomInt(1, 30)),
    totalSpent: randomInt(0, 10000),
  };
}

export function generatePlayerInventory(count: number = 15): InventoryItem[] {
  const items = [
    'Chef\'s Knife', 'Copper Pot', 'Silicone Spatula', 'Mixing Bowl', 'Measuring Cup',
    'Whisk', 'Cutting Board', 'Cast Iron Pan', 'Baking Sheet', 'Apron',
    'Golden Spatula', 'Crystal Spoon', 'Diamond Ring', 'Golden Egg', 'Legendary Knife',
  ];

  const rarities: Array<'common' | 'rare' | 'epic' | 'legendary'> = ['common', 'rare', 'epic', 'legendary'];
  const inventory: InventoryItem[] = [];

  for (let i = 0; i < count; i++) {
    const name = randomItem(items);
    const rarity = i < 10 ? 'common' : i < 13 ? 'rare' : i < 14 ? 'epic' : 'legendary';
    inventory.push({
      id: `item_${i + 1}`,
      name,
      type: randomItem(['equipment', 'ingredient', 'cosmetic']),
      rarity,
      quantity: randomInt(1, 10),
      effect: `+${randomInt(5, 50)}% Cooking Speed`,
      equipped: i < 3,
      equippedSlot: i < 3 ? ['Weapon', 'Armor', 'Accessory'][i] : undefined,
      thumbnail: `https://via.placeholder.com/100/${rarity === 'legendary' ? 'FFD700' : rarity === 'epic' ? '9933FF' : rarity === 'rare' ? '3366FF' : 'CCCCCC'}`,
    });
  }

  return inventory;
}

export function generateDailyChallenges(): DailyChallenge[] {
  const challenges = [
    { name: 'Cook 5 Recipes', description: 'Complete 5 recipe challenges', reward: 500 },
    { name: 'Win 3 Multiplayer', description: 'Win 3 multiplayer battles', reward: 750 },
    { name: 'Collect Ingredients', description: 'Gather 50 unique ingredients', reward: 600 },
    { name: 'Speed Cook', description: 'Complete a recipe in under 2 minutes', reward: 400 },
    { name: 'Perfect Dishes', description: 'Perfect 10 dishes in a row', reward: 1000 },
  ];

  return challenges.map((challenge, idx) => ({
    id: `daily_${idx + 1}`,
    name: challenge.name,
    description: challenge.description,
    icon: ['🍳', '🏆', '🥘', '⚡', '⭐'][idx],
    progress: randomInt(0, 100),
    target: 100,
    rewardCoins: challenge.reward,
    rewardExp: randomInt(50, 200),
    endsAt: Date.now() + 24 * 60 * 60 * 1000,
    completed: Math.random() > 0.6,
  }));
}

export function generateMissions(): Mission[] {
  const missions = [];
  for (let i = 0; i < 10; i++) {
    missions.push({
      id: `mission_${i + 1}`,
      name: `Seasonal Mission ${i + 1}`,
      description: `Complete ${randomInt(5, 50)} tasks`,
      progress: randomInt(0, 100),
      target: 100,
      reward: randomInt(500, 3000),
      tier: randomItem(['common', 'uncommon', 'rare']),
    });
  }
  return missions;
}

export function generateShopItems(): ShopItem[] {
  const items = [
    { name: 'Gold Knife Set', rarity: 'epic' as const, price: 5000 },
    { name: 'Diamond Apron', rarity: 'legendary' as const, price: 10000 },
    { name: 'Flame Spatula', rarity: 'rare' as const, price: 2000 },
    { name: 'Crystal Pot', rarity: 'epic' as const, price: 3500 },
    { name: 'Emerald Bowl', rarity: 'rare' as const, price: 1500 },
    { name: 'Seasonal Battle Pass', rarity: 'epic' as const, price: 1000 },
    { name: '1000 Premium Gems', rarity: 'legendary' as const, price: 4999 },
    { name: 'Chef Logo Cosmetic', rarity: 'common' as const, price: 200 },
  ];

  return items.map((item, idx) => ({
    id: `shop_${idx + 1}`,
    name: item.name,
    description: `Exclusive ${item.rarity} item`,
    type: item.name.includes('Pass') ? 'pass' : item.name.includes('Gems') ? 'currency' : item.name.includes('Cosmetic') ? 'cosmetic' : 'equipment',
    price: item.price,
    currency: randomItem(['coins', 'gems', 'premium']),
    rarity: item.rarity,
    thumbnail: `https://via.placeholder.com/200/${item.rarity === 'legendary' ? 'FFD700' : item.rarity === 'epic' ? '9933FF' : '3366FF'}`,
    onSale: Math.random() > 0.7,
    salePrice: Math.random() > 0.7 ? Math.floor(item.price * 0.7) : undefined,
  }));
}

export function generateFriends(): Friend[] {
  const statuses = ['In Game', 'In Lobby', 'Menu', 'Away'];
  const friends = [];

  for (let i = 0; i < 12; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    friends.push({
      id: `friend_${i + 1}`,
      name: `${firstName} ${lastName}`,
      level: randomInt(1, 50),
      lastSeen: daysAgo(randomInt(0, 30)),
      online: Math.random() > 0.5,
      status: randomItem(statuses),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    });
  }

  return friends;
}

export function generateTournaments(): Tournament[] {
  return [
    {
      id: 'tournament_1',
      name: 'Spring Championship 2024',
      startDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 9 * 24 * 60 * 60 * 1000,
      entryFee: 500,
      maxPlayers: 256,
      currentPlayers: 189,
      prizes: [
        { position: 1, amount: 50000 },
        { position: 2, amount: 30000 },
        { position: 3, amount: 20000 },
      ],
      featured: true,
    },
    {
      id: 'tournament_2',
      name: 'Weekly Speed Cook',
      startDate: Date.now() + 6 * 60 * 60 * 1000,
      endDate: Date.now() + 6 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000,
      entryFee: 100,
      maxPlayers: 64,
      currentPlayers: 52,
      prizes: [
        { position: 1, amount: 5000 },
        { position: 2, amount: 3000 },
        { position: 3, amount: 2000 },
      ],
      featured: false,
    },
    {
      id: 'tournament_3',
      name: 'Legendary Dishes',
      startDate: Date.now() - 2 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
      entryFee: 0,
      maxPlayers: 128,
      currentPlayers: 98,
      prizes: [
        { position: 1, amount: 10000 },
        { position: 2, amount: 6000 },
        { position: 3, amount: 4000 },
      ],
      featured: false,
    },
  ];
}

export function generateBattlePass(): BattlePass {
  return {
    season: 12,
    level: randomInt(1, 100),
    progress: randomInt(0, 100),
    maxLevel: 100,
    premium: Math.random() > 0.5,
    expiresAt: Date.now() + 45 * 24 * 60 * 60 * 1000,
    rewards: [
      { level: 1, reward: '500 Coins' },
      { level: 10, reward: 'Golden Knife' },
      { level: 25, reward: 'Epic Cosmetic' },
      { level: 50, reward: 'Legendary Item' },
      { level: 100, reward: 'Ultimate Reward' },
    ],
  };
}

export function generateNotifications(): Notification[] {
  return [
    {
      id: 'notif_1',
      type: 'achievement',
      title: 'Congratulations!',
      message: 'You earned the "Speed Master" achievement!',
      timestamp: Date.now() - 60 * 60 * 1000,
      read: false,
    },
    {
      id: 'notif_2',
      type: 'tournament_invite',
      title: 'Tournament Invite',
      message: 'Your friend invited you to "Weekly Speed Cook"',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      read: false,
      action: { label: 'Join Now', link: '/tournaments/weekly' },
    },
    {
      id: 'notif_3',
      type: 'friend_request',
      title: 'Friend Request',
      message: 'Sarah Johnson sent you a friend request',
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
      read: true,
      action: { label: 'Accept', link: '/friends' },
    },
    {
      id: 'notif_4',
      type: 'new_content',
      title: 'New Recipe Available',
      message: 'Check out the new "Gourmet Pasta" recipe!',
      timestamp: Date.now() - 8 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: 'notif_5',
      type: 'system',
      title: 'Daily Reward',
      message: 'You claimed your daily login bonus! +100 Coins',
      timestamp: Date.now() - 12 * 60 * 60 * 1000,
      read: true,
    },
  ];
}

// ==============================================

export function generateAllMockData() {
  return {
    users: generateMockUsers(),
    content: generateMockContent(),
    backups: generateMockBackups(),
    settings: generateMockSettings(),
    roles: generateMockRoles(),
    permissions: generateMockPermissions(),
    alerts: generateMockAlerts(),
    sessions: generateMockSessions(),
    webhooks: generateMockWebhooks(),
    bulkOperations: generateMockBulkOperations(),
    moderatedContent: generateMockModeratedContent(),
    reportTemplates: generateMockReportTemplates(),
    widgetLayout: generateDefaultWidgetLayout(),
  };
}
