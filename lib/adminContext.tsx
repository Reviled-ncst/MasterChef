/**
 * Admin Context
 * Manages all admin-specific state (users, content, logs, settings)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Backup,
  Content,
  Permission,
  RolePermissions,
  SystemSettings,
  User,
  Alert,
  AdminSession,
  Webhook,
  BulkOperation,
  ModeratedContent,
  ReportTemplate,
  WidgetLayout,
  UndoTransaction,
} from './mockData';
import {
  generateMockUsers,
  generateMockContent,
  generateMockBackups,
  generateMockSettings,
  generateMockRoles,
  generateMockAlerts,
  generateMockSessions,
  generateMockWebhooks,
  generateMockBulkOperations,
  generateMockModeratedContent,
  generateMockReportTemplates,
  generateDefaultWidgetLayout,
} from './mockData';
import { activityLogger, ActivityLog } from './logging';

export interface AdminContextType {
  // Data
  users: User[];
  content: Content[];
  backups: Backup[];
  settings: SystemSettings;
  roles: RolePermissions[];
  logs: ActivityLog[];
  alerts: Alert[];
  sessions: AdminSession[];
  webhooks: Webhook[];
  bulkOperations: BulkOperation[];
  moderatedContent: ModeratedContent[];
  reportTemplates: ReportTemplate[];
  widgetLayout: WidgetLayout;
  undoTransactions: UndoTransaction[];

  // User Management
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => User;
  updateUser: (userId: string, updates: Partial<User>) => User | null;
  deleteUser: (userId: string) => boolean;
  suspendUser: (userId: string) => User | null;
  banUser: (userId: string) => User | null;
  getUserById: (userId: string) => User | null;

  // Content Management
  addContent: (content: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => Content;
  updateContent: (contentId: string, updates: Partial<Content>) => Content | null;
  deleteContent: (contentId: string) => boolean;
  publishContent: (contentId: string) => Content | null;
  approveContent: (contentId: string) => Content | null;
  getContentById: (contentId: string) => Content | null;

  // Backup Management
  createBackup: () => Backup;
  restoreBackup: (backupId: string) => boolean;
  getBackupById: (backupId: string) => Backup | null;

  // Settings Management
  updateSetting: (setting: Partial<SystemSettings>) => void;

  // Permissions & Roles
  updateRolePermissions: (role: string, permissions: Permission) => void;
  getRolePermissions: (role: string) => Permission | null;
  checkPermission: (role: string, permission: string) => boolean;

  // Logging & Audit
  getAuditLogs: (filters?: any) => ActivityLog[];
  getAuditLogsPaginated: (filters?: any, page?: number, pageSize?: number) => any;
  exportAuditLogs: (format: 'csv' | 'json', filters?: any) => string;
  clearOldLogs: () => number;

  // Monitoring
  getSystemStats: () => {
    totalUsers: number;
    activeUsers: number;
    totalContent: number;
    publishedContent: number;
    databaseSize: string;
  };

  // Alert Management
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => Alert;
  dismissAlert: (alertId: string) => boolean;
  markAlertAsRead: (alertId: string) => boolean;
  getAlerts: (unreadOnly?: boolean) => Alert[];
  clearAlerts: () => void;

  // Session Management
  startSession: (email: string, ipAddress: string, device: string) => AdminSession;
  endSession: (sessionId: string) => boolean;
  killSession: (sessionId: string) => boolean;
  getSessions: (activeOnly?: boolean) => AdminSession[];
  getSessionsByEmail: (email: string) => AdminSession[];

  // Widget Management
  saveWidgetLayout: (layout: WidgetLayout) => void;
  getDefaultLayout: () => WidgetLayout;
  resetWidgetLayout: () => void;

  // Undo Management
  canUndo: () => boolean;
  undoLastAction: () => boolean;
  getUndoHistory: () => UndoTransaction[];
  clearUndoHistory: () => void;
  addToUndoStack: (transaction: Omit<UndoTransaction, 'id' | 'timestamp'>) => void;

  // Webhook Management
  addWebhook: (webhook: Omit<Webhook, 'id' | 'createdAt' | 'failureCount'>) => Webhook;
  removeWebhook: (webhookId: string) => boolean;
  toggleWebhook: (webhookId: string) => Webhook | null;
  getWebhooks: (eventType?: string) => Webhook[];
  getWebhookById: (webhookId: string) => Webhook | null;

  // Bulk Operations Management
  startBulkOperation: (operation: Omit<BulkOperation, 'id' | 'startTime' | 'processedCount' | 'failedCount' | 'progress'>) => BulkOperation;
  updateBulkOperation: (opId: string, updates: Partial<BulkOperation>) => BulkOperation | null;
  getBulkOperation: (opId: string) => BulkOperation | null;
  getBulkOperationHistory: (limit?: number) => BulkOperation[];
  completeBulkOperation: (opId: string) => BulkOperation | null;

  // Moderated Content Management
  addModeratedContent: (content: Omit<ModeratedContent, 'id'>) => ModeratedContent;
  updateModerationStatus: (contentId: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => ModeratedContent | null;
  getModeratedContent: (status?: 'pending' | 'approved' | 'rejected') => ModeratedContent[];
  getModeratedContentById: (id: string) => ModeratedContent | null;

  // Report Management
  getReportTemplates: () => ReportTemplate[];
  getReportTemplateById: (id: string) => ReportTemplate | null;
  generateReport: (templateId: string) => any;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [settings, setSettings] = useState<SystemSettings>(generateMockSettings());
  const [roles, setRoles] = useState<RolePermissions[]>(generateMockRoles());
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [bulkOperations, setBulkOperations] = useState<BulkOperation[]>([]);
  const [moderatedContent, setModeratedContent] = useState<ModeratedContent[]>([]);
  const [reportTemplates, setReportTemplates] = useState<ReportTemplate[]>([]);
  const [widgetLayout, setWidgetLayout] = useState<WidgetLayout>(generateDefaultWidgetLayout());
  const [undoTransactions, setUndoTransactions] = useState<UndoTransaction[]>([]);

  // Initialize data from localStorage or generate mock data
  useEffect(() => {
    const savedState = localStorage.getItem('mc:admin_state');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setUsers(state.users || generateMockUsers());
        setContent(state.content || generateMockContent());
        setBackups(state.backups || generateMockBackups());
        setSettings(state.settings || generateMockSettings());
        setRoles(state.roles || generateMockRoles());
        setAlerts(state.alerts || generateMockAlerts());
        setSessions(state.sessions || generateMockSessions());
        setWebhooks(state.webhooks || generateMockWebhooks());
        setBulkOperations(state.bulkOperations || generateMockBulkOperations());
        setModeratedContent(state.moderatedContent || generateMockModeratedContent());
        setReportTemplates(state.reportTemplates || generateMockReportTemplates());
        setWidgetLayout(state.widgetLayout || generateDefaultWidgetLayout());
      } catch (error) {
        console.warn('Failed to load admin state from storage:', error);
        setUsers(generateMockUsers());
        setContent(generateMockContent());
        setBackups(generateMockBackups());
        setAlerts(generateMockAlerts());
        setSessions(generateMockSessions());
        setWebhooks(generateMockWebhooks());
        setBulkOperations(generateMockBulkOperations());
        setModeratedContent(generateMockModeratedContent());
        setReportTemplates(generateMockReportTemplates());
      }
    } else {
      setUsers(generateMockUsers());
      setContent(generateMockContent());
      setBackups(generateMockBackups());
      setAlerts(generateMockAlerts());
      setSessions(generateMockSessions());
      setWebhooks(generateMockWebhooks());
      setBulkOperations(generateMockBulkOperations());
      setModeratedContent(generateMockModeratedContent());
      setReportTemplates(generateMockReportTemplates());
    }

    // Load logs from logging system
    const allLogs = activityLogger.getLogs();
    setLogs(allLogs);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      users,
      content,
      backups,
      settings,
      roles,
      alerts,
      sessions,
      webhooks,
      bulkOperations,
      moderatedContent,
      reportTemplates,
      widgetLayout,
    };
    try {
      localStorage.setItem('mc:admin_state', JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save admin state to storage:', error);
    }
  }, [users, content, backups, settings, roles, alerts, sessions, webhooks, bulkOperations, moderatedContent, reportTemplates, widgetLayout]);

  // Persist individual collections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mc:admin_alerts', JSON.stringify(alerts));
      localStorage.setItem('mc:admin_sessions', JSON.stringify(sessions));
      localStorage.setItem('mc:admin_webhooks', JSON.stringify(webhooks));
      localStorage.setItem('mc:admin_bulk_ops', JSON.stringify(bulkOperations));
      localStorage.setItem('mc:admin_moderated_content', JSON.stringify(moderatedContent));
      localStorage.setItem('mc:admin_widget_layout', JSON.stringify(widgetLayout));
      localStorage.setItem('mc:admin_undo_stack', JSON.stringify(undoTransactions));
    } catch (error) {
      console.warn('Failed to persist admin collections:', error);
    }
  }, [alerts, sessions, webhooks, bulkOperations, moderatedContent, widgetLayout, undoTransactions]);

  // Sync logs with logging system
  useEffect(() => {
    const allLogs = activityLogger.getLogs();
    setLogs(allLogs);
  }, []);

  // User Management
  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}`,
      createdAt: Date.now(),
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    const updated = users.map(u => (u.id === userId ? { ...u, ...updates } : u));
    setUsers(updated);
    return updated.find(u => u.id === userId) || null;
  };

  const deleteUser = (userId: string) => {
    const initialLength = users.length;
    setUsers(users.filter(u => u.id !== userId));
    return users.length > initialLength - 1;
  };

  const suspendUser = (userId: string) => {
    return updateUser(userId, { status: 'suspended' });
  };

  const banUser = (userId: string) => {
    return updateUser(userId, { status: 'banned' });
  };

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId) || null;
  };

  // Content Management
  const addContent = (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContent: Content = {
      ...contentData,
      id: `content_${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setContent([...content, newContent]);
    return newContent;
  };

  const updateContent = (contentId: string, updates: Partial<Content>) => {
    const updated = content.map(c =>
      c.id === contentId ? { ...c, ...updates, updatedAt: Date.now() } : c
    );
    setContent(updated);
    return updated.find(c => c.id === contentId) || null;
  };

  const deleteContent = (contentId: string) => {
    const initialLength = content.length;
    setContent(content.filter(c => c.id !== contentId));
    return content.length > initialLength - 1;
  };

  const publishContent = (contentId: string) => {
    return updateContent(contentId, {
      status: 'published',
      publishedAt: Date.now(),
    });
  };

  const approveContent = (contentId: string) => {
    return updateContent(contentId, { status: 'pending' });
  };

  const getContentById = (contentId: string) => {
    return content.find(c => c.id === contentId) || null;
  };

  // Backup Management
  const createBackup = () => {
    const newBackup: Backup = {
      id: `backup_${Date.now()}`,
      timestamp: Date.now(),
      size: `${(Math.random() * 0.3 + 2.2).toFixed(1)}GB`,
      type: 'full',
      status: 'success',
      duration: Math.floor(Math.random() * 600 + 300),
    };
    setBackups([...backups, newBackup]);
    return newBackup;
  };

  const restoreBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    return !!backup;
  };

  const getBackupById = (backupId: string) => {
    return backups.find(b => b.id === backupId) || null;
  };

  // Settings Management
  const updateSetting = (newSettings: Partial<SystemSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  // Permissions & Roles
  const updateRolePermissions = (role: string, permissions: Permission) => {
    const updated = roles.map(r =>
      r.role === role ? { ...r, permissions } : r
    );
    setRoles(updated);
  };

  const getRolePermissions = (role: string) => {
    const roleData = roles.find(r => r.role === role);
    return roleData?.permissions || null;
  };

  const checkPermission = (role: string, permission: string): boolean => {
    const roleData = roles.find(r => r.role === role);
    return roleData?.permissions?.[permission] ?? false;
  };

  // Logging & Audit
  const getAuditLogs = (filters?: any) => {
    return activityLogger.getLogs(filters);
  };

  const getAuditLogsPaginated = (filters?: any, page: number = 1, pageSize: number = 25) => {
    return activityLogger.getLogsPaginated(filters, page, pageSize);
  };

  const exportAuditLogs = (format: 'csv' | 'json', filters?: any) => {
    if (format === 'csv') {
      return activityLogger.exportToCSV(filters);
    } else {
      return activityLogger.exportToJSON(filters);
    }
  };

  const clearOldLogs = () => {
    return activityLogger.clearOldLogs();
  };

  // Monitoring
  const getSystemStats = () => {
    const activeUsers = users.filter(u => u.status === 'active').length;
    const publishedContent = content.filter(c => c.status === 'published').length;

    return {
      totalUsers: users.length,
      activeUsers,
      totalContent: content.length,
      publishedContent,
      databaseSize: settings.databaseSize,
    };
  };

  // Alert Management
  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: `alert_${Date.now()}`,
      timestamp: Date.now(),
    };
    setAlerts([newAlert, ...alerts]);
    return newAlert;
  };

  const dismissAlert = (alertId: string) => {
    const initialLength = alerts.length;
    setAlerts(alerts.filter(a => a.id !== alertId));
    return alerts.length > initialLength - 1;
  };

  const markAlertAsRead = (alertId: string) => {
    const updated = alerts.map(a => (a.id === alertId ? { ...a, read: true } : a));
    setAlerts(updated);
    return true;
  };

  const getAlerts = (unreadOnly: boolean = false) => {
    return unreadOnly ? alerts.filter(a => !a.read) : alerts;
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  // Session Management
  const startSession = (email: string, ipAddress: string, device: string) => {
    const newSession: AdminSession = {
      id: `session_${Date.now()}`,
      email,
      ipAddress,
      startTime: Date.now(),
      lastActivity: Date.now(),
      duration: 0,
      device,
      status: 'active',
    };
    setSessions([newSession, ...sessions]);
    return newSession;
  };

  const endSession = (sessionId: string) => {
    const updated = sessions.map(s =>
      s.id === sessionId ? { ...s, status: 'expired' as const } : s
    );
    setSessions(updated);
    return true;
  };

  const killSession = (sessionId: string) => {
    const initialLength = sessions.length;
    setSessions(sessions.filter(s => s.id !== sessionId));
    return sessions.length > initialLength - 1;
  };

  const getSessions = (activeOnly: boolean = false) => {
    return activeOnly ? sessions.filter(s => s.status === 'active') : sessions;
  };

  const getSessionsByEmail = (email: string) => {
    return sessions.filter(s => s.email === email);
  };

  // Widget Management
  const saveWidgetLayout = (layout: WidgetLayout) => {
    setWidgetLayout(layout);
  };

  const getDefaultLayout = () => {
    return generateDefaultWidgetLayout();
  };

  const resetWidgetLayout = () => {
    setWidgetLayout(generateDefaultWidgetLayout());
  };

  // Undo Management
  const canUndo = () => {
    return undoTransactions.length > 0;
  };

  const undoLastAction = () => {
    if (undoTransactions.length === 0) return false;
    const updated = undoTransactions.slice(0, -1);
    setUndoTransactions(updated);
    return true;
  };

  const getUndoHistory = () => {
    return undoTransactions;
  };

  const clearUndoHistory = () => {
    setUndoTransactions([]);
  };

  const addToUndoStack = (transaction: Omit<UndoTransaction, 'id' | 'timestamp'>) => {
    const newTransaction: UndoTransaction = {
      ...transaction,
      id: `undo_${Date.now()}`,
      timestamp: Date.now(),
    };
    setUndoTransactions([...undoTransactions, newTransaction]);
  };

  // Webhook Management
  const addWebhook = (webhook: Omit<Webhook, 'id' | 'createdAt' | 'failureCount'>) => {
    const newWebhook: Webhook = {
      ...webhook,
      id: `webhook_${Date.now()}`,
      createdAt: Date.now(),
      failureCount: 0,
    };
    setWebhooks([newWebhook, ...webhooks]);
    return newWebhook;
  };

  const removeWebhook = (webhookId: string) => {
    const initialLength = webhooks.length;
    setWebhooks(webhooks.filter(w => w.id !== webhookId));
    return webhooks.length > initialLength - 1;
  };

  const toggleWebhook = (webhookId: string) => {
    const updated = webhooks.map(w =>
      w.id === webhookId ? { ...w, active: !w.active } : w
    );
    setWebhooks(updated);
    return updated.find(w => w.id === webhookId) || null;
  };

  const getWebhooks = (eventType?: string) => {
    return eventType ? webhooks.filter(w => w.event === eventType) : webhooks;
  };

  const getWebhookById = (webhookId: string) => {
    return webhooks.find(w => w.id === webhookId) || null;
  };

  // Bulk Operations Management
  const startBulkOperation = (operation: Omit<BulkOperation, 'id' | 'startTime' | 'processedCount' | 'failedCount' | 'progress'>) => {
    const newOp: BulkOperation = {
      ...operation,
      id: `bulk_${Date.now()}`,
      startTime: Date.now(),
      processedCount: 0,
      failedCount: 0,
      progress: 0,
    };
    setBulkOperations([newOp, ...bulkOperations]);
    return newOp;
  };

  const updateBulkOperation = (opId: string, updates: Partial<BulkOperation>) => {
    const updated = bulkOperations.map(op =>
      op.id === opId ? { ...op, ...updates } : op
    );
    setBulkOperations(updated);
    return updated.find(op => op.id === opId) || null;
  };

  const getBulkOperation = (opId: string) => {
    return bulkOperations.find(op => op.id === opId) || null;
  };

  const getBulkOperationHistory = (limit: number = 50) => {
    return bulkOperations.slice(0, limit).sort((a, b) => b.startTime - a.startTime);
  };

  const completeBulkOperation = (opId: string) => {
    return updateBulkOperation(opId, {
      status: 'completed',
      endTime: Date.now(),
      progress: 100,
    });
  };

  // Moderated Content Management
  const addModeratedContent = (content: Omit<ModeratedContent, 'id'>) => {
    const newContent: ModeratedContent = {
      ...content,
      id: `moderated_${Date.now()}`,
    };
    setModeratedContent([newContent, ...moderatedContent]);
    return newContent;
  };

  const updateModerationStatus = (contentId: string, status: 'pending' | 'approved' | 'rejected', notes?: string) => {
    const updated = moderatedContent.map(c =>
      c.id === contentId
        ? {
            ...c,
            status,
            reviewedAt: Date.now(),
            reviewedBy: 'admin@masterchef.com',
            notes: notes || c.notes,
          }
        : c
    );
    setModeratedContent(updated);
    return updated.find(c => c.id === contentId) || null;
  };

  const getModeratedContent = (status?: 'pending' | 'approved' | 'rejected') => {
    return status ? moderatedContent.filter(c => c.status === status) : moderatedContent;
  };

  const getModeratedContentById = (id: string) => {
    return moderatedContent.find(c => c.id === id) || null;
  };

  // Report Management
  const getReportTemplates = () => {
    return reportTemplates;
  };

  const getReportTemplateById = (id: string) => {
    return reportTemplates.find(t => t.id === id) || null;
  };

  const generateReport = (templateId: string) => {
    const template = getReportTemplateById(templateId);
    if (!template) return null;

    return {
      id: `report_${Date.now()}`,
      template,
      generatedAt: Date.now(),
      data: {
        metrics: template.metrics.reduce((acc: any, metric: string) => {
          acc[metric] = Math.floor(Math.random() * 10000);
          return acc;
        }, {}),
      },
    };
  };

  const value: AdminContextType = {
    // Data
    users,
    content,
    backups,
    settings,
    roles,
    logs,
    alerts,
    sessions,
    webhooks,
    bulkOperations,
    moderatedContent,
    reportTemplates,
    widgetLayout,
    undoTransactions,

    // User Management
    addUser,
    updateUser,
    deleteUser,
    suspendUser,
    banUser,
    getUserById,

    // Content Management
    addContent,
    updateContent,
    deleteContent,
    publishContent,
    approveContent,
    getContentById,

    // Backup Management
    createBackup,
    restoreBackup,
    getBackupById,

    // Settings Management
    updateSetting,

    // Permissions & Roles
    updateRolePermissions,
    getRolePermissions,
    checkPermission,

    // Logging & Audit
    getAuditLogs,
    getAuditLogsPaginated,
    exportAuditLogs,
    clearOldLogs,

    // Monitoring
    getSystemStats,

    // Alert Management
    addAlert,
    dismissAlert,
    markAlertAsRead,
    getAlerts,
    clearAlerts,

    // Session Management
    startSession,
    endSession,
    killSession,
    getSessions,
    getSessionsByEmail,

    // Widget Management
    saveWidgetLayout,
    getDefaultLayout,
    resetWidgetLayout,

    // Undo Management
    canUndo,
    undoLastAction,
    getUndoHistory,
    clearUndoHistory,
    addToUndoStack,

    // Webhook Management
    addWebhook,
    removeWebhook,
    toggleWebhook,
    getWebhooks,
    getWebhookById,

    // Bulk Operations Management
    startBulkOperation,
    updateBulkOperation,
    getBulkOperation,
    getBulkOperationHistory,
    completeBulkOperation,

    // Moderated Content Management
    addModeratedContent,
    updateModerationStatus,
    getModeratedContent,
    getModeratedContentById,

    // Report Management
    getReportTemplates,
    getReportTemplateById,
    generateReport,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

/**
 * Hook to access admin context
 */
export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}

/**
 * Hook to check if user has permission
 */
export function useAdminPermission(permission: string): boolean {
  const { roles } = useAdmin();
  // Get current admin's role from auth context
  // This is a simplified check - in production, get from actual user context
  const superAdminRole = roles.find(r => r.role === 'super_admin');
  return superAdminRole?.permissions?.[permission] ?? false;
}
