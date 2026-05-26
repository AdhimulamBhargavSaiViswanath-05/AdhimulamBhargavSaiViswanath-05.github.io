import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, DownloadIcon, FileTextIcon } from '@radix-ui/react-icons';
import { site } from '../data/siteContent';

export default function ResumeDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="button button-primary">
        <FileTextIcon />
        View resume
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="resume-dialog">
          <div className="dialog-header">
            <div>
              <Dialog.Title>Resume preview</Dialog.Title>
              <Dialog.Description>Open the current resume or download the PDF.</Dialog.Description>
            </div>
            <div className="dialog-actions">
              <a className="icon-button" href={site.resume} download aria-label="Download resume">
                <DownloadIcon />
              </a>
              <Dialog.Close className="icon-button" aria-label="Close resume preview">
                <Cross2Icon />
              </Dialog.Close>
            </div>
          </div>
          <iframe className="resume-frame" src={site.resume} title="Resume preview" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}