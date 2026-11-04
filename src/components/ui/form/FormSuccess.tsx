import { Check } from 'lucide-react';
import { buttonClass } from '@/components/ui/button';

/** Shown after a form is submitted. */
export default function FormSuccess({
  title = 'Thank You!',
  message = 'We will get back to you soon.',
  resetLabel = 'Send another message',
  onReset,
}: {
  title?: string;
  message?: string;
  resetLabel?: string;
  onReset: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-10 text-center" role="status">
      <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-2xl text-success">
        <Check aria-hidden className="size-7" />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-prime-dark">{title}</h2>
      <p className="mt-2 text-text-muted">{message}</p>
      <button type="button" onClick={onReset} className={buttonClass('primary', 'md', 'mt-8')}>
        {resetLabel}
      </button>
    </div>
  );
}
