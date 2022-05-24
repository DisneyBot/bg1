import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import FloatingButton from '@/components/FloatingButton';
import Page from '@/components/Page';

export const DISCLAIMER_ACCEPTED_KEY = 'bg1.disclaimer.accepted';

const theme = { bg: 'bg-red-600' };

export default function useDisclaimer(): h.JSX.Element | null {
  const storage = localStorage;
  const acceptedKey = DISCLAIMER_ACCEPTED_KEY;
  const [accepted, setAccepted] = useState(!!storage.getItem(acceptedKey));

  useEffect(() => {
    if (accepted) storage.setItem(acceptedKey, '1');
  }, [accepted, storage, acceptedKey]);

  return accepted ? null : <Disclaimer onAccept={() => setAccepted(true)} />;
}

function Disclaimer({ onAccept }: { onAccept: () => void }): h.JSX.Element {
  return (
    <Page heading="Warning!" theme={theme}>
      <p>
        Use at your own risk. BG1 is highly experimental, for demonstration
        purposes only, and provided &quot;as is&quot; without warranty of any
        kind. It is in no way endorsed by or associated with the Walt Disney
        Company and could stop working at any time for any reason. To ensure the
        intended experience, always use the official Disney app.
      </p>
      <FloatingButton onClick={onAccept}>Accept</FloatingButton>
    </Page>
  );
}
