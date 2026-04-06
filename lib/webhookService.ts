export type WebhookEvent =
  | 'user_created'
  | 'user_deleted'
  | 'user_suspended'
  | 'content_published'
  | 'content_deleted'
  | 'content_moderated'
  | 'permission_changed'
  | 'backup_completed'
  | 'backup_failed'
  | 'alert_triggered';

export interface Webhook {
  id: string;
  event: WebhookEvent;
  url: string;
  secret: string;
  active: boolean;
  lastTriggered?: number;
  lastStatus?: 'success' | 'failed';
  failureCount: number;
  createdAt: number;
}

export interface WebhookTrigger {
  id: string;
  webhookId: string;
  timestamp: number;
  event: WebhookEvent;
  status: 'success' | 'failed';
  statusCode?: number;
  duration: number;
  payload: Record<string, any>;
  response?: string;
  error?: string;
}

export class WebhookManager {
  private webhooks: Webhook[] = [];
  private triggers: WebhookTrigger[] = [];
  private nextWebhookId = 1;
  private nextTriggerId = 1;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const webhooks = localStorage.getItem('mc:admin_webhooks');
    const triggers = localStorage.getItem('mc:admin_webhook_triggers');

    if (webhooks) {
      try {
        this.webhooks = JSON.parse(webhooks);
        this.nextWebhookId = Math.max(...this.webhooks.map(w => parseInt(w.id)), 0) + 1;
      } catch {
        this.webhooks = [];
      }
    }

    if (triggers) {
      try {
        this.triggers = JSON.parse(triggers);
        this.nextTriggerId = Math.max(...this.triggers.map(t => parseInt(t.id)), 0) + 1;
      } catch {
        this.triggers = [];
      }
    }
  }

  private saveWebhooks() {
    localStorage.setItem('mc:admin_webhooks', JSON.stringify(this.webhooks));
  }

  private saveTriggers() {
    localStorage.setItem('mc:admin_webhook_triggers', JSON.stringify(this.triggers));
  }

  private generateSecret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }

  addWebhook(event: WebhookEvent, url: string): Webhook {
    const webhook: Webhook = {
      id: String(this.nextWebhookId++),
      event,
      url,
      secret: this.generateSecret(),
      active: true,
      failureCount: 0,
      createdAt: Date.now(),
    };
    this.webhooks.push(webhook);
    this.saveWebhooks();
    return webhook;
  }

  removeWebhook(id: string): boolean {
    const index = this.webhooks.findIndex(w => w.id === id);
    if (index > -1) {
      this.webhooks.splice(index, 1);
      this.saveWebhooks();
      return true;
    }
    return false;
  }

  getWebhooks(event?: WebhookEvent): Webhook[] {
    if (event) {
      return this.webhooks.filter(w => w.event === event && w.active);
    }
    return this.webhooks;
  }

  getWebhook(id: string): Webhook | undefined {
    return this.webhooks.find(w => w.id === id);
  }

  toggleWebhook(id: string): Webhook | undefined {
    const webhook = this.webhooks.find(w => w.id === id);
    if (webhook) {
      webhook.active = !webhook.active;
      this.saveWebhooks();
    }
    return webhook;
  }

  async triggerWebhook(
    webhookId: string,
    event: WebhookEvent,
    payload: Record<string, any>
  ): Promise<WebhookTrigger> {
    const webhook = this.getWebhook(webhookId);
    if (!webhook) {
      throw new Error('Webhook not found');
    }

    const startTime = Date.now();
    const trigger: WebhookTrigger = {
      id: String(this.nextTriggerId++),
      webhookId,
      timestamp: startTime,
      event,
      status: 'failed',
      duration: 0,
      payload,
      error: 'Not triggered',
    };

    // Simulate webhook call
    try {
      // Mock delay (100-500ms)
      await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 100));

      // 80% success rate
      const success = Math.random() > 0.2;

      trigger.duration = Date.now() - startTime;
      trigger.status = success ? 'success' : 'failed';
      trigger.statusCode = success ? 200 : 500;
      trigger.response = success
        ? JSON.stringify({ success: true, id: payload.id })
        : JSON.stringify({ error: 'Internal Server Error' });

      if (success) {
        webhook.lastTriggered = Date.now();
        webhook.lastStatus = 'success';
        webhook.failureCount = 0;
      } else {
        webhook.failureCount++;
        webhook.lastStatus = 'failed';
        trigger.error = 'Server returned 500 error';

        // Auto-disable after 5 failures
        if (webhook.failureCount >= 5) {
          webhook.active = false;
        }
      }
    } catch (error) {
      trigger.duration = Date.now() - startTime;
      trigger.status = 'failed';
      trigger.error = error instanceof Error ? error.message : 'Unknown error';
      webhook.failureCount++;
      webhook.lastStatus = 'failed';
    }

    this.triggers.unshift(trigger);
    // Keep only last 200 triggers
    if (this.triggers.length > 200) {
      this.triggers = this.triggers.slice(0, 200);
    }

    this.saveWebhooks();
    this.saveTriggers();

    return trigger;
  }

  getWebhookTriggers(webhookId?: string, limit = 50): WebhookTrigger[] {
    let triggers = [...this.triggers];
    if (webhookId) {
      triggers = triggers.filter(t => t.webhookId === webhookId);
    }
    return triggers.slice(0, limit);
  }

  getRecentTriggers(limit = 10): WebhookTrigger[] {
    return this.triggers.slice(0, limit);
  }

  clearOldTriggers(olderThanHours = 24) {
    const cutoffTime = Date.now() - olderThanHours * 60 * 60 * 1000;
    this.triggers = this.triggers.filter(t => t.timestamp > cutoffTime);
    this.saveTriggers();
  }

  clear() {
    this.webhooks = [];
    this.triggers = [];
    this.saveWebhooks();
    this.saveTriggers();
  }
}

// Singleton instance
export const webhookManager = new WebhookManager();
