"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

type Popup = {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  dismissible: boolean;
  showOnAll: boolean;
  pagePath: string;
};

const DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function SitePopup() {
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState<Popup | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    // Fetch active popups from API (client-side, doesn't block page render)
    fetch("/api/popups")
      .then((r) => (r.ok ? r.json() : []))
      .then((popups: Popup[]) => {
        if (cancelled || !popups || popups.length === 0) return;

        const active = popups.find((p) => {
          if (!p.isActive) return false;
          if (!p.showOnAll && p.pagePath && p.pagePath !== pathname) {
            return false;
          }
          return true;
        });

        if (!active) return;

        const key = `popup-dismissed-${active.id}`;
        const dismissed = localStorage.getItem(key);
        if (dismissed) {
          if (Date.now() - parseInt(dismissed, 10) < DISMISS_TTL_MS) return;
        }

        setPopup(active);
        const timer = setTimeout(() => setShow(true), 2000);
        return () => clearTimeout(timer);
      })
      .catch(() => {
        // API not available — no popup shown
      });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  function dismiss() {
    if (!popup) return;
    if (popup.dismissible) {
      try {
        localStorage.setItem(`popup-dismissed-${popup.id}`, Date.now().toString());
      } catch {
        // localStorage unavailable — ignore
      }
    }
    setShow(false);
  }

  if (!show || !popup) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        className="relative bg-card rounded-2xl overflow-hidden shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {popup.dismissible && (
          <button
            onClick={dismiss}
            aria-label="Close popup"
            className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-ink/60 backdrop-blur text-cream flex items-center justify-center hover:bg-ink/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {popup.image && (
          <div className="aspect-[16/9] overflow-hidden bg-secondary">
            <img
              src={popup.image}
              alt={popup.title || "Promotional popup"}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 id="popup-title" className="font-display text-xl font-bold text-ink">
            {popup.title}
          </h3>
          {popup.description && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {popup.description}
            </p>
          )}
          <div className="mt-4 flex gap-2">
            {popup.buttonText && popup.buttonLink && (
              <a
                href={popup.buttonLink}
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-full bg-brand hover:bg-brand/90 text-brand-foreground px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                {popup.buttonText}
              </a>
            )}
            {popup.dismissible && (
              <button
                onClick={dismiss}
                className="text-sm font-medium text-muted-foreground hover:text-ink px-3 py-2.5"
              >
                Maybe later
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
