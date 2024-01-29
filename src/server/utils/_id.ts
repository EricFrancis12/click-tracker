import type { TClick_id } from '../../client/src/lib/types';

export function generateNewClick_id(): TClick_id {
    return `${crypto.randomUUID()}_CL`;
}
