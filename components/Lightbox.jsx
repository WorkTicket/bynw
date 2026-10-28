'use client';
import { useEffect, useRef, useState } from 'react';
export default function Lightbox({ src, caption, children, className = '' }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);
  function close() { dialog.current?.close(); setOpen(false); trigger.current?.focus(); }
  return <><button ref={trigger} className={`preview-button ${className}`} onClick={() => setOpen(true)} aria-label={`Ampliar: ${caption}`}>{children}</button>{open && <dialog ref={dialog} className="lightbox" onCancel={() => setOpen(false)} onClick={e => { if (e.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}><button className="close-lightbox" onClick={close} aria-label="Cerrar imagen">×</button><img src={src} alt={caption} /><p>{caption}</p></dialog>}</>;
}
