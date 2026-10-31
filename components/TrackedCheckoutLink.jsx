'use client';

export default function TrackedCheckoutLink({ href, value, contentName, className = '', children }) {
  function handleClick() {
    window.fbq?.('track', 'InitiateCheckout', {
      value,
      currency: 'EUR',
      content_name: contentName,
      content_ids: [contentName],
      content_type: 'product',
    });
  }

  return <a className={className} href={href} target="_blank" rel="noopener noreferrer sponsored" onClick={handleClick}>{children}</a>;
}
