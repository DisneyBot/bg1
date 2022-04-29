import { h } from 'preact';

import { displayTime } from '@/datetime';

interface ArrivalTimes {
  start: { time: string };
  end: { time: string };
}

export default function ArrivalTimes({ times }: { times: ArrivalTimes }) {
  return (
    <div className="mt-4 text-lg">
      Arrive by:{' '}
      <span className="ml-0.5 font-semibold">
        <time>{displayTime(times.start.time)}</time> -{' '}
        <time>{displayTime(times.end.time)}</time>
      </span>
    </div>
  );
}