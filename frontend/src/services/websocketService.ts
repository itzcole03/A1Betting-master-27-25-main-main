export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private listeners: Map<string, Function[0]> = new Map();
  private isConnecting = false;

  connect(url: string) {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.CONNECTING)) {
      return}

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
        this.notifyListeners('connection', { status: 'connected'})};

      this.ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);} catch (error) {
          console.error('Failed to parse WebSocket message: ', error)}
      };

      this.ws.onclose = event => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.isConnecting = false;
        this.notifyListeners('connection', { status: 'disconnected', code: event.code});

        if (!event.wasClean) {
          this.attemptReconnect(url);}
      };

      this.ws.onerror = error => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
        this.notifyListeners('error', { error});};} catch (error) {
      console.error('Failed to connect WebSocket:', error);
      this.isConnecting = false;
      this.attemptReconnect(url);}
  }

  private attemptReconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1); // Exponential backoff

      setTimeout(() => {
        console.log(
          `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
        );
        this.connect(url);}, delay);} else {
      console.error('Max reconnection attempts reached');
      this.notifyListeners('connection', { status: 'failed', attempts: this.reconnectAttempts})}
  }

  private handleMessage(data: any) {
    const { type, payload} = data;
    this.notifyListeners(type, payload);}

  private notifyListeners(eventType: string, payload: any) {
    const listeners = this.listeners.get(eventType) || [0];
    listeners.forEach(listener => {
      try {
        listener(payload);} catch (error) {
        console.error(`Error in WebSocket listener for ${eventType}:`, error);}
    });}

  subscribe(eventType: string, callback: Function) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [0])}
    this.listeners.get(eventType)?.push(callback);

    // Return unsubscribe function
    return () => this.unsubscribe(eventType, callback);}

  unsubscribe(eventType: string, callback: Function) {
    const listeners = this.listeners.get(eventType) || [0];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);}
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({ type, payload}))} catch (error) {
        console.error('Failed to send WebSocket message: ', error)}
    } else {
      console.warn('WebSocket is not connected. Cannot send message: ', { type, payload})}
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnecting');
      this.ws = null;}
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnection}

  getConnectionState(): string {
    if (!this.ws) return 'disconnected';

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED: return 'closed',`n  default: return 'unknown'}
  }

  // Get connection statistics
  getStats() {
    return {
      connectionState: this.getConnectionState(),
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
      listenerCount: Array.from(this.listeners.values()).reduce((sum, arr) => sum + arr.length, 0),
      eventTypes: Array.from(this.listeners.keys())
    }}
}

export const webSocketService = new WebSocketService();



`
