export interface AdminSession {
  id: string;
  adminId: string;
  adminEmail: string;
  adminRole: string;
  startTime: number;
  lastActivity: number;
  ipAddress: string;
  userAgent: string;
  status: 'active' | 'idle' | 'ended';
}

export class SessionManager {
  private sessions: AdminSession[] = [];
  private nextId = 1;
  private timeoutMinutes = 30;

  constructor() {
    this.loadFromStorage();
    this.startTimeoutCheck();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mc:admin_sessions');
    if (stored) {
      try {
        this.sessions = JSON.parse(stored);
        this.nextId = Math.max(...this.sessions.map(s => parseInt(s.id)), 0) + 1;
      } catch {
        this.sessions = [];
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('mc:admin_sessions', JSON.stringify(this.sessions));
  }

  private startTimeoutCheck() {
    setInterval(() => {
      this.enforceTimeout(this.timeoutMinutes);
    }, 60000); // Check every minute
  }

  createSession(adminId: string, adminEmail: string, adminRole: string): AdminSession {
    const session: AdminSession = {
      id: String(this.nextId++),
      adminId,
      adminEmail,
      adminRole,
      startTime: Date.now(),
      lastActivity: Date.now(),
      ipAddress: this.generateMockIP(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      status: 'active',
    };
    this.sessions.push(session);
    this.saveToStorage();
    return session;
  }

  updateActivity(sessionId: string) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (session) {
      session.lastActivity = Date.now();
      session.status = 'active';
      this.saveToStorage();
    }
  }

  endSession(sessionId: string) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (session) {
      session.status = 'ended';
      this.saveToStorage();
    }
  }

  killSession(sessionId: string) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (session) {
      session.status = 'ended';
      this.saveToStorage();
    }
  }

  getSessions(includeEnded = false): AdminSession[] {
    return this.sessions.filter(s => includeEnded || s.status !== 'ended');
  }

  getSession(sessionId: string): AdminSession | undefined {
    return this.sessions.find(s => s.id === sessionId);
  }

  getSessionDuration(sessionId: string): number {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return 0;
    return Math.floor((Date.now() - session.startTime) / 1000); // seconds
  }

  getSessionDurationFormatted(sessionId: string): string {
    const seconds = this.getSessionDuration(sessionId);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  enforceTimeout(timeoutMinutes: number) {
    const cutoffTime = Date.now() - timeoutMinutes * 60 * 1000;
    this.sessions.forEach(session => {
      if (session.status === 'active' && session.lastActivity < cutoffTime) {
        session.status = 'idle';
      }
    });
    this.saveToStorage();
  }

  setTimeoutMinutes(minutes: number) {
    this.timeoutMinutes = minutes;
  }

  getSessionHistory(limit = 50): AdminSession[] {
    return this.sessions.slice(-limit).reverse();
  }

  private generateMockIP(): string {
    const parts = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
    return parts.join('.');
  }

  clear() {
    this.sessions = [];
    this.saveToStorage();
  }
}

// Singleton instance
export const sessionManager = new SessionManager();
