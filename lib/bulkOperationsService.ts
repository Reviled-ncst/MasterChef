export type BulkOperationType =
  | 'suspend_users'
  | 'unsuspend_users'
  | 'delete_users'
  | 'change_role'
  | 'delete_content'
  | 'publish_content'
  | 'unpublish_content';

export type BulkOperationStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface BulkOperationResult {
  resourceId: string;
  resourceName: string;
  success: boolean;
  error?: string;
}

export interface BulkOperation {
  id: string;
  type: BulkOperationType;
  status: BulkOperationStatus;
  initiatedBy: string;
  initiatedByEmail: string;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  targets: string[]; // Resource IDs being operated on
  targetCount: number;
  completedCount: number;
  successCount: number;
  failureCount: number;
  results: BulkOperationResult[];
  parameters?: Record<string, any>; // e.g., { newRole: 'moderator' }
}

export class BulkOperationsManager {
  private operations: BulkOperation[] = [];
  private nextId = 1;
  private processingQueue: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mc:admin_bulk_operations');
    if (stored) {
      try {
        this.operations = JSON.parse(stored);
        this.nextId = Math.max(...this.operations.map(op => parseInt(op.id)), 0) + 1;
      } catch {
        this.operations = [];
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('mc:admin_bulk_operations', JSON.stringify(this.operations));
  }

  startBulkOperation(
    type: BulkOperationType,
    adminId: string,
    adminEmail: string,
    targets: string[],
    parameters?: Record<string, any>
  ): BulkOperation {
    const operation: BulkOperation = {
      id: String(this.nextId++),
      type,
      status: 'pending',
      initiatedBy: adminId,
      initiatedByEmail: adminEmail,
      createdAt: Date.now(),
      targets,
      targetCount: targets.length,
      completedCount: 0,
      successCount: 0,
      failureCount: 0,
      results: [],
      parameters,
    };

    this.operations.unshift(operation);
    this.saveToStorage();

    // Auto-start processing immediately
    this.processBulkOperation(operation.id);

    return operation;
  }

  async processBulkOperation(operationId: string) {
    const operation = this.operations.find(op => op.id === operationId);
    if (!operation) {
      throw new Error('Operation not found');
    }

    operation.status = 'processing';
    operation.startedAt = Date.now();
    this.saveToStorage();

    // Process in batches of 5
    const batchSize = 5;
    for (let i = 0; i < operation.targets.length; i += batchSize) {
      const batch = operation.targets.slice(i, i + batchSize);

      for (const targetId of batch) {
        // Simulate processing (80% success rate)
        const success = Math.random() > 0.2;

        const result: BulkOperationResult = {
          resourceId: targetId,
          resourceName: `Resource ${targetId}`,
          success,
          error: success ? undefined : 'Operation failed',
        };

        operation.results.push(result);
        operation.completedCount++;

        if (success) {
          operation.successCount++;
        } else {
          operation.failureCount++;
        }

        this.saveToStorage();

        // Small delay between items
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    operation.status = 'completed';
    operation.completedAt = Date.now();
    this.saveToStorage();
  }

  getBulkOperation(id: string): BulkOperation | undefined {
    return this.operations.find(op => op.id === id);
  }

  getBulkOperations(status?: BulkOperationStatus, limit = 50): BulkOperation[] {
    let ops = [...this.operations];
    if (status) {
      ops = ops.filter(op => op.status === status);
    }
    return ops.slice(0, limit);
  }

  getBulkOperationProgress(id: string): { completed: number; total: number; percentage: number } {
    const operation = this.operations.find(op => op.id === id);
    if (!operation) {
      return { completed: 0, total: 0, percentage: 0 };
    }

    const percentage = Math.round((operation.completedCount / operation.targetCount) * 100);
    return {
      completed: operation.completedCount,
      total: operation.targetCount,
      percentage,
    };
  }

  cancelBulkOperation(id: string): boolean {
    const operation = this.operations.find(op => op.id === id);
    if (operation && operation.status === 'pending') {
      operation.status = 'cancelled';
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getRecentOperations(limit = 20): BulkOperation[] {
    return this.operations.slice(0, limit);
  }

  canRollback(operationId: string): boolean {
    const operation = this.operations.find(op => op.id === operationId);
    if (!operation) return false;

    // Can only rollback completed operations within last 24 hours
    const ageHours = (Date.now() - (operation.completedAt || 0)) / (1000 * 60 * 60);
    return operation.status === 'completed' && ageHours < 24;
  }

  clear() {
    this.operations = [];
    this.saveToStorage();
  }
}

// Singleton instance
export const bulkOperationsManager = new BulkOperationsManager();
