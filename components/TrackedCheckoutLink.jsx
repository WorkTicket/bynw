'use client';

import { trackMetaEvent } from './MetaPixel';

export default function TrackedCheckoutLink({ href, value, contentId, contentName, className = '', children }) {
  function handleClick() {
    trackMetaEvent('InitiateCheckout', {
      value,
      currency: 'EUR',
      content_name: contentName,
      content_ids: [contentId || contentName],
      content_type: 'product',
    });
  }

  return <a className={className} href={href} rel="noopener noreferrer" onClick={handleClick}>{children}</a>;
}
