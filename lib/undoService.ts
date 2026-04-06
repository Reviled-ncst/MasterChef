export interface Transaction {
  id: string;
  adminId: string;
  adminEmail: string;
  timestamp: number;
  actionType: string;
  resourceType: string;
  resourceId: string;
  description: string;
  beforeData: Record<string, any>;
  afterData: Record<string, any>;
}

export class UndoManager {
  private stack: Transaction[] = [];
  private nextId = 1;
  private maxStackSize = 50;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mc:admin_undo_stack');
    if (stored) {
      try {
        this.stack = JSON.parse(stored);
        this.nextId = Math.max(...this.stack.map(t => parseInt(t.id)), 0) + 1;
      } catch {
        this.stack = [];
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('mc:admin_undo_stack', JSON.stringify(this.stack));
  }

  recordTransaction(
    adminId: string,
    adminEmail: string,
    actionType: string,
    resourceType: string,
    resourceId: string,
    description: string,
    beforeData: Record<string, any>,
    afterData: Record<string, any>
  ): Transaction {
    const transaction: Transaction = {
      id: String(this.nextId++),
      adminId,
      adminEmail,
      timestamp: Date.now(),
      actionType,
      resourceType,
      resourceId,
      description,
      beforeData,
      afterData,
    };

    this.stack.unshift(transaction);

    // Keep only the most recent transactions
    if (this.stack.length > this.maxStackSize) {
      this.stack = this.stack.slice(0, this.maxStackSize);
    }

    this.saveToStorage();
    return transaction;
  }

  canUndo(): boolean {
    return this.stack.length > 0;
  }

  getLastTransaction(): Transaction | undefined {
    return this.stack[0];
  }

  undoLastTransaction(): Transaction | undefined {
    const transaction = this.stack.shift();
    if (transaction) {
      this.saveToStorage();
    }
    return transaction;
  }

  getUndoHistory(limit = 10): Transaction[] {
    return this.stack.slice(0, limit);
  }

  getTransactionByIndex(index: number): Transaction | undefined {
    return this.stack[index];
  }

  clearOldTransactions(olderThanHours = 24) {
    const cutoffTime = Date.now() - olderThanHours * 60 * 60 * 1000;
    this.stack = this.stack.filter(t => t.timestamp > cutoffTime);
    this.saveToStorage();
  }

  getStackSize(): number {
    return this.stack.length;
  }

  clear() {
    this.stack = [];
    this.saveToStorage();
  }

  // Get formatted description of what can be undone
  getUndoDescription(): string {
    if (this.stack.length === 0) {
      return 'Nothing to undo';
    }
    const last = this.stack[0];
    return `Undo: ${last.description}`;
  }
}

// Singleton instance
export const undoManager = new UndoManager();
