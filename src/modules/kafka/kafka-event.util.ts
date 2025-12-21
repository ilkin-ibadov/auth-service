import { randomUUID } from 'crypto';

export function kafkaEvent<T>(type: string, payload: T) {
    return {
        eventId: randomUUID(),
        type,
        occurredAt: new Date().toISOString(),
        payload,
    };
}
