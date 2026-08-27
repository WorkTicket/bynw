/**
 * Runs before React so Next.js never soft-navigates (click or back/forward).
 * Soft routing was crashing iPhone, Android, and in-app browsers on this shop.
 */
export const HARD_NAVIGATION_BOOT_SCRIPT = `(function(){var o=location.origin;function sameOrigin(h){try{return new URL(h,o).origin===o}catch(e){return false}}function hardNav(a,h){if(!h||h.charAt(0)==='#')return false;if(/^(mailto:|tel:|javascript:)/i.test(h))return false;if(a.target&&a.target!=='_self')return false;if(a.hasAttribute('download'))return false;return sameOrigin(h)}document.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;var a=t.closest('a[href]');if(!a)return;var h=a.getAttribute('href');if(!hardNav(a,h))return;e.preventDefault();e.stopImmediatePropagation();location.assign(h)},true);window.addEventListener('popstate',function(){location.reload()});window.addEventListener('pageshow',function(e){if(e.persisted)location.reload()})})();`
