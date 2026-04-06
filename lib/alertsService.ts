export type AlertSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  actionType?: string;
  resourceType?: string;
  resourceId?: string;
  timestamp: number;
  read: boolean;
}

export class AlertsManager {
  private alerts: Alert[] = [];
  private subscribers: Array<(alerts: Alert[]) => void> = [];
  private nextId = 1;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mc:admin_alerts');
    if (stored) {
      try {
        this.alerts = JSON.parse(stored);
        this.nextId = Math.max(...this.alerts.map(a => parseInt(a.id)), 0) + 1;
      } catch {
        this.alerts = [];
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('mc:admin_alerts', JSON.stringify(this.alerts));
  }

  private notifySubscribers() {
    this.subscribers.forEach(cb => cb(this.getActiveAlerts()));
  }

  createAlert(
    severity: AlertSeverity,
    message: string,
    actionType?: string,
    resourceType?: string,
    resourceId?: string
  ): Alert {
    const alert: Alert = {
      id: String(this.nextId++),
      severity,
      message,
      actionType,
      resourceType,
      resourceId,
      timestamp: Date.now(),
      read: false,
    };
    this.alerts.unshift(alert);
    this.saveToStorage();
    this.notifySubscribers();

    // Auto-dismiss INFO alerts after 5 seconds
    if (severity === 'INFO') {
      setTimeout(() => this.dismissAlert(alert.id), 5000);
    }

    return alert;
  }

  dismissAlert(id: string) {
    this.alerts = this.alerts.filter(a => a.id !== id);
    this.saveToStorage();
    this.notifySubscribers();
  }

  getActiveAlerts(limit = 5): Alert[] {
    return this.alerts.slice(0, limit);
  }

  getAlertHistory(severity?: AlertSeverity, limit = 50): Alert[] {
    let filtered = [...this.alerts];
    if (severity) {
      filtered = filtered.filter(a => a.severity === severity);
    }
    return filtered.slice(0, limit);
  }

  getUnreadCount(): number {
    return this.alerts.filter(a => !a.read).length;
  }

  markAsRead(id: string) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.read = true;
      this.saveToStorage();
    }
  }

  clearOldAlerts(olderThanHours = 24) {
    const cutoffTime = Date.now() - olderThanHours * 60 * 60 * 1000;
    this.alerts = this.alerts.filter(a => a.timestamp > cutoffTime);
    this.saveToStorage();
    this.notifySubscribers();
  }

  subscribe(callback: (alerts: Alert[]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  clear() {
    this.alerts = [];
    this.saveToStorage();
    this.notifySubscribers();
  }
}

// Singleton instance
export const alertsManager = new AlertsManager();
