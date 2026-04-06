/**
 * Activity Logging System
 * Tracks all admin actions with comprehensive audit trail
 */

export type ActionType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'SUSPEND' | 'BAN' | 'APPROVE' | 'REJECT' | 'BACKUP' | 'RESTORE' | 'CONFIG' | 'PERMISSION' | 'LOGIN' | 'LOGOUT' | 'FAILED_LOGIN' | 'ALERT_CREATED' | 'ALERT_DISMISSED' | 'SESSION_STARTED' | 'SESSION_ENDED' | 'WEBHOOK_TRIGGERED' | 'BULK_OPERATION_STARTED' | 'BULK_OPERATION_COMPLETED' | 'UNDO_PERFORMED';

export type ResourceType = 'USER' | 'CONTENT' | 'SETTING' | 'BACKUP' | 'PERMISSION' | 'ROLE' | 'SESSION' | 'ALERT' | 'WEBHOOK' | 'BULK_OP' | 'TRANSACTION';

export type LogSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface ActivityLog {
  id: string;
  timestamp: number;
  adminId: string;
  adminEmail: string;
  actionType: ActionType;
  resourceType: ResourceType;
  resourceId: string;
  resourceTitle?: string;
  status: 'SUCCESS' | 'FAILURE';
  severity: LogSeverity;
  details?: string;
  beforeData?: Record<string, any>;
  afterData?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

class ActivityLogger {
  private logs: ActivityLog[] = [];
  private readonly MAX_LOGS_IN_MEMORY = 500;
  private readonly AUTO_SYNC_INTERVAL = 30000; // 30 seconds
  private readonly AUTO_CLEANUP_INTERVAL = 3600000; // 1 hour
  private readonly LOG_RETENTION_DAYS = 30;

  constructor() {
    this.loadFromStorage();
    this.startAutoSync();
    this.startAutoCleanup();
  }

  /**
   * Log an admin action
   */
  log(params: {
    adminId: string;
    adminEmail: string;
    actionType: ActionType;
    resourceType: ResourceType;
    resourceId: string;
    resourceTitle?: string;
    status: 'SUCCESS' | 'FAILURE';
    severity?: LogSeverity;
    details?: string;
    beforeData?: Record<string, any>;
    afterData?: Record<string, any>;
  }): ActivityLog {
    const logEntry: ActivityLog = {
      id: this.generateId(),
      timestamp: Date.now(),
      adminId: params.adminId,
      adminEmail: params.adminEmail,
      actionType: params.actionType,
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      resourceTitle: params.resourceTitle,
      status: params.status,
      severity: params.severity || 'INFO',
      details: params.details,
      beforeData: params.beforeData,
      afterData: params.afterData,
      ipAddress: this.getMockIpAddress(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    };

    this.logs.push(logEntry);

    // Trim if exceeds memory limit
    if (this.logs.length > this.MAX_LOGS_IN_MEMORY) {
      this.logs = this.logs.slice(-this.MAX_LOGS_IN_MEMORY);
    }

    return logEntry;
  }

  /**
   * Get logs with optional filters
   */
  getLogs(filters?: {
    actionType?: ActionType;
    resourceType?: ResourceType;
    adminId?: string;
    severity?: LogSeverity;
    startDate?: number;
    endDate?: number;
    searchQuery?: string;
  }): ActivityLog[] {
    let filtered = [...this.logs];

    if (filters?.actionType) {
      filtered = filtered.filter(log => log.actionType === filters.actionType);
    }

    if (filters?.resourceType) {
      filtered = filtered.filter(log => log.resourceType === filters.resourceType);
    }

    if (filters?.adminId) {
      filtered = filtered.filter(log => log.adminId === filters.adminId);
    }

    if (filters?.severity) {
      filtered = filtered.filter(log => log.severity === filters.severity);
    }

    if (filters?.startDate) {
      filtered = filtered.filter(log => log.timestamp >= filters.startDate!);
    }

    if (filters?.endDate) {
      filtered = filtered.filter(log => log.timestamp <= filters.endDate!);
    }

    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        log =>
          log.adminEmail.toLowerCase().includes(query) ||
          log.resourceTitle?.toLowerCase().includes(query) ||
          log.details?.toLowerCase().includes(query) ||
          log.resourceId.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp descending (newest first)
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Get paginated logs
   */
  getLogsPaginated(
    filters?: Parameters<typeof this.getLogs>[0],
    page: number = 1,
    pageSize: number = 25
  ): { logs: ActivityLog[]; total: number; page: number; pageSize: number; pages: number } {
    const filtered = this.getLogs(filters);
    const total = filtered.length;
    const pages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const logs = filtered.slice(startIndex, endIndex);

    return { logs, total, page, pageSize, pages };
  }

  /**
   * Export logs to CSV format
   */
  exportToCSV(filters?: Parameters<typeof this.getLogs>[0]): string {
    const filtered = this.getLogs(filters);

    const headers = ['Timestamp', 'Admin', 'Action', 'Resource Type', 'Resource ID', 'Status', 'Severity', 'Details'];
    const rows = filtered.map(log => [
      new Date(log.timestamp).toISOString(),
      log.adminEmail,
      log.actionType,
      log.resourceType,
      log.resourceId,
      log.status,
      log.severity,
      log.details || '',
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');

    return csv;
  }

  /**
   * Export logs to JSON format
   */
  exportToJSON(filters?: Parameters<typeof this.getLogs>[0]): string {
    const filtered = this.getLogs(filters);
    return JSON.stringify(
      {
        exportDate: new Date().toISOString(),
        totalLogs: filtered.length,
        logs: filtered,
      },
      null,
      2
    );
  }

  /**
   * Get activity statistics
   */
  getStats(): {
    totalLogs: number;
    logsByActionType: Record<ActionType, number>;
    logsByResourceType: Record<ResourceType, number>;
    logsBySeverity: Record<LogSeverity, number>;
    topAdmins: Array<{ adminEmail: string; count: number }>;
    lastLogTimestamp?: number;
  } {
    const stats = {
      totalLogs: this.logs.length,
      logsByActionType: {} as Record<ActionType, number>,
      logsByResourceType: {} as Record<ResourceType, number>,
      logsBySeverity: {} as Record<LogSeverity, number>,
      topAdmins: [] as Array<{ adminEmail: string; count: number }>,
      lastLogTimestamp: this.logs.length > 0 ? this.logs[this.logs.length - 1].timestamp : undefined,
    };

    const adminCounts: Record<string, number> = {};

    this.logs.forEach(log => {
      // Count by action type
      stats.logsByActionType[log.actionType] = (stats.logsByActionType[log.actionType] || 0) + 1;

      // Count by resource type
      stats.logsByResourceType[log.resourceType] = (stats.logsByResourceType[log.resourceType] || 0) + 1;

      // Count by severity
      stats.logsBySeverity[log.severity] = (stats.logsBySeverity[log.severity] || 0) + 1;

      // Count by admin
      adminCounts[log.adminEmail] = (adminCounts[log.adminEmail] || 0) + 1;
    });

    // Get top 5 admins
    stats.topAdmins = Object.entries(adminCounts)
      .map(([adminEmail, count]) => ({ adminEmail, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return stats;
  }

  /**
   * Clear logs older than retention period
   */
  clearOldLogs(): number {
    const cutoffDate = Date.now() - this.LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    const initialCount = this.logs.length;
    this.logs = this.logs.filter(log => log.timestamp >= cutoffDate);
    const deletedCount = initialCount - this.logs.length;

    if (deletedCount > 0) {
      this.saveToStorage();
    }

    return deletedCount;
  }

  /**
   * Clear all logs (use with caution)
   */
  clearAllLogs(): void {
    this.logs = [];
    this.clearStorage();
  }

  /**
   * Get recent logs
   */
  getRecentLogs(limit: number = 10): ActivityLog[] {
    return this.logs.slice(-limit).reverse();
  }

  /**
   * Get logs by resource
   */
  getLogsByResource(resourceType: ResourceType, resourceId: string): ActivityLog[] {
    return this.logs.filter(log => log.resourceType === resourceType && log.resourceId === resourceId);
  }

  // Private methods

  private generateId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getMockIpAddress(): string {
    // Generate a mock IP address
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('mc:activity_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load logs from storage:', error);
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      // Only save last 500 logs to stay under storage limits
      const toStore = this.logs.slice(-500);
      localStorage.setItem('mc:activity_logs', JSON.stringify(toStore));
    } catch (error) {
      console.warn('Failed to save logs to storage:', error);
    }
  }

  private clearStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem('mc:activity_logs');
    } catch (error) {
      console.warn('Failed to clear logs from storage:', error);
    }
  }

  private startAutoSync(): void {
    if (typeof window === 'undefined') return;

    setInterval(() => {
      this.saveToStorage();
    }, this.AUTO_SYNC_INTERVAL);
  }

  private startAutoCleanup(): void {
    if (typeof window === 'undefined') return;

    setInterval(() => {
      this.clearOldLogs();
    }, this.AUTO_CLEANUP_INTERVAL);
  }
}

// Create singleton instance
export const activityLogger = new ActivityLogger();

// Convenience functions for common logging actions

export function logUserCreated(
  adminId: string,
  adminEmail: string,
  userId: string,
  userData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'CREATE',
    resourceType: 'USER',
    resourceId: userId,
    resourceTitle: userData.email || userData.name,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Created new user: ${userData.email}`,
    afterData: userData,
  });
}

export function logUserUpdated(
  adminId: string,
  adminEmail: string,
  userId: string,
  beforeData: Record<string, any>,
  afterData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'UPDATE',
    resourceType: 'USER',
    resourceId: userId,
    resourceTitle: afterData.email || afterData.name,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Updated user: ${afterData.email}`,
    beforeData,
    afterData,
  });
}

export function logUserDeleted(
  adminId: string,
  adminEmail: string,
  userId: string,
  userData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'DELETE',
    resourceType: 'USER',
    resourceId: userId,
    resourceTitle: userData.email || userData.name,
    status: 'SUCCESS',
    severity: 'WARNING',
    details: `Deleted user: ${userData.email}`,
    beforeData: userData,
  });
}

export function logUserSuspended(
  adminId: string,
  adminEmail: string,
  userId: string,
  userData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'SUSPEND',
    resourceType: 'USER',
    resourceId: userId,
    resourceTitle: userData.email || userData.name,
    status: 'SUCCESS',
    severity: 'WARNING',
    details: `Suspended user: ${userData.email}`,
    beforeData: { status: userData.status },
    afterData: { status: 'SUSPENDED' },
  });
}

export function logContentPublished(
  adminId: string,
  adminEmail: string,
  contentId: string,
  contentData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'PUBLISH',
    resourceType: 'CONTENT',
    resourceId: contentId,
    resourceTitle: contentData.title,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Published content: ${contentData.title}`,
    beforeData: { status: contentData.status },
    afterData: { status: 'PUBLISHED' },
  });
}

export function logContentDeleted(
  adminId: string,
  adminEmail: string,
  contentId: string,
  contentData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'DELETE',
    resourceType: 'CONTENT',
    resourceId: contentId,
    resourceTitle: contentData.title,
    status: 'SUCCESS',
    severity: 'WARNING',
    details: `Deleted content: ${contentData.title}`,
    beforeData: contentData,
  });
}

export function logSettingChanged(
  adminId: string,
  adminEmail: string,
  settingName: string,
  beforeValue: any,
  afterValue: any
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'CONFIG',
    resourceType: 'SETTING',
    resourceId: settingName,
    resourceTitle: settingName,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Changed setting: ${settingName}`,
    beforeData: { [settingName]: beforeValue },
    afterData: { [settingName]: afterValue },
  });
}

export function logPermissionChanged(
  adminId: string,
  adminEmail: string,
  userId: string,
  userEmail: string,
  beforeRole: string,
  afterRole: string
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'PERMISSION',
    resourceType: 'PERMISSION',
    resourceId: userId,
    resourceTitle: userEmail,
    status: 'SUCCESS',
    severity: 'WARNING',
    details: `Changed user role from ${beforeRole} to ${afterRole}`,
    beforeData: { role: beforeRole },
    afterData: { role: afterRole },
  });
}

export function logBackupCreated(
  adminId: string,
  adminEmail: string,
  backupId: string,
  backupData: Record<string, any>
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'BACKUP',
    resourceType: 'BACKUP',
    resourceId: backupId,
    resourceTitle: `Backup ${new Date(backupData.timestamp).toISOString()}`,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Created backup: ${backupData.size}`,
    afterData: backupData,
  });
}

export function logFailedLogin(email: string, reason: string = 'Invalid credentials'): ActivityLog {
  return activityLogger.log({
    adminId: 'UNKNOWN',
    adminEmail: email,
    actionType: 'FAILED_LOGIN',
    resourceType: 'SESSION',
    resourceId: email,
    resourceTitle: email,
    status: 'FAILURE',
    severity: 'WARNING',
    details: reason,
  });
}

export function logAlertCreated(
  adminId: string,
  adminEmail: string,
  alertId: string,
  severity: LogSeverity,
  message: string
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'ALERT_CREATED',
    resourceType: 'ALERT',
    resourceId: alertId,
    resourceTitle: `Alert (${severity})`,
    status: 'SUCCESS',
    severity: severity,
    details: message,
  });
}

export function logSessionEvent(
  adminId: string,
  adminEmail: string,
  sessionId: string,
  eventType: 'SESSION_STARTED' | 'SESSION_ENDED',
  details?: string
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: eventType,
    resourceType: 'SESSION',
    resourceId: sessionId,
    resourceTitle: adminEmail,
    status: 'SUCCESS',
    severity: 'INFO',
    details: details || `Session ${eventType.split('_')[1].toLowerCase()}`,
  });
}

export function logWebhookTriggered(
  adminId: string,
  adminEmail: string,
  webhookId: string,
  event: string,
  success: boolean,
  statusCode?: number
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'WEBHOOK_TRIGGERED',
    resourceType: 'WEBHOOK',
    resourceId: webhookId,
    resourceTitle: `Webhook: ${event}`,
    status: success ? 'SUCCESS' : 'FAILURE',
    severity: success ? 'INFO' : 'WARNING',
    details: `Webhook triggered for event: ${event} (Status: ${statusCode})`,
    afterData: { event, statusCode, success },
  });
}

export function logBulkOperationStarted(
  adminId: string,
  adminEmail: string,
  operationId: string,
  operationType: string,
  targetCount: number
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'BULK_OPERATION_STARTED',
    resourceType: 'BULK_OP',
    resourceId: operationId,
    resourceTitle: operationType,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Started bulk operation: ${operationType} for ${targetCount} items`,
    afterData: { operation: operationType, targetCount },
  });
}

export function logBulkOperationCompleted(
  adminId: string,
  adminEmail: string,
  operationId: string,
  operationType: string,
  successCount: number,
  failureCount: number
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'BULK_OPERATION_COMPLETED',
    resourceType: 'BULK_OP',
    resourceId: operationId,
    resourceTitle: operationType,
    status: failureCount === 0 ? 'SUCCESS' : 'FAILURE',
    severity: failureCount === 0 ? 'INFO' : 'WARNING',
    details: `Bulk operation completed: ${operationType} (${successCount} succeeded, ${failureCount} failed)`,
    afterData: { operation: operationType, successCount, failureCount },
  });
}

export function logUndoAction(
  adminId: string,
  adminEmail: string,
  transactionId: string,
  actionType: string,
  resourceType: string
): ActivityLog {
  return activityLogger.log({
    adminId,
    adminEmail,
    actionType: 'UNDO_PERFORMED',
    resourceType: 'TRANSACTION',
    resourceId: transactionId,
    resourceTitle: `Undo: ${actionType}`,
    status: 'SUCCESS',
    severity: 'INFO',
    details: `Undid action: ${actionType} on ${resourceType}`,
    afterData: { originalAction: actionType, originalResource: resourceType },
  });
}
