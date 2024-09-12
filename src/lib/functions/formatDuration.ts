export default (duration: number, style: 'time' | 'string' = 'time'): string => {
  const hrs = Math.floor(duration / 3600000);
  duration %= 3600000;
  const mins = Math.floor(duration / 60000);
  duration %= 60000;
  const secs = Math.floor(duration / 1000);
  const ms = duration % 1000;

  let finalString = '';

  // do hours
  if (hrs > 0) {
    finalString += style === 'time' ? `${hrs.toString().padStart(2, '0')}:` : `${hrs}h `;
  }

  // do minutes
  if (mins > 0 || style === 'time') {
    finalString += style === 'time' ? `${mins.toString().padStart(2, '0')}:` : `${mins}m `;
  }

  finalString += style === 'time' ? `${secs.toString().padStart(2, '0')}` : `${secs}s `;
  finalString += style === 'time' ? `${ms.toString().padStart(3, '0')}` : `${ms}ms `;

  return finalString;
};
