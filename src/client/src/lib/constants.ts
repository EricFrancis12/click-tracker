import { makeDate } from '../utils/timeframe-utils';
import type { TTimeframeName } from './types';

export const MAX_REPORT_CHAIN_LENGTH = 3;

export const MAX_NUM_CUSTOM_TOKENS = 15;

export const EARLIEST_TIMESTAMP_ALLOWED = makeDate(2023, 0, 1, 0, 0, 0, 0).getTime();
export const DEFAULT_TIMEFRAME_NAME: TTimeframeName = 'Last 30 Days';
