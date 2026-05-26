import * as Toast from '@radix-ui/react-toast';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { site } from '../data/siteContent';

export default function CopyEmailButton() {
  const [open, setOpen] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email);
    setOpen(true);
  };

  return (
    <Toast.Provider swipeDirection="right">
      <button className="button button-secondary" type="button" onClick={copyEmail}>
        <CopyIcon />
        Copy email
      </button>
      <Toast.Root className="toast-root" open={open} onOpenChange={setOpen} duration={2200}>
        <Toast.Title className="toast-title">
          <CheckIcon /> Email copied
        </Toast.Title>
        <Toast.Description className="toast-description">{site.email}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  );
}