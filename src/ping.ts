import { dateTimeStrings } from './datetime';
import { fetchJson } from './fetch';

const PING_URL = 'https://bg1.joelface.com/ping';
const PING_DATE_KEY = 'bg1.ping.date';

export async function ping(): Promise<void> {
  const { date } = dateTimeStrings();
  const pingDate = localStorage.getItem(PING_DATE_KEY);
  if (pingDate === date) return;
  const { status } = await fetchJson(PING_URL, { method: 'POST' });
  if (status === 204) localStorage.setItem(PING_DATE_KEY, date);
}
