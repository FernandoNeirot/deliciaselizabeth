/**
 * Review Service — placeholder con localStorage (SSR-safe).
 *
 * Para migrar a Next.js + API:
 *   - Reemplazá cada función por fetch() a /api/reviews y /api/delivery-links
 *   - O usá server actions en el App Router
 */

import type { Review, DeliveryLink } from "@/types/review";
import { safeGet, safeSet, safeOrigin } from "@/lib/storage";

const REVIEWS_KEY = "delicias_reviews";
const LINKS_KEY = "delicias_delivery_links";

// --- Delivery Links ---

export function createDeliveryLink(productId: string, clientName: string): DeliveryLink {
  const links = getDeliveryLinks();
  const newLink: DeliveryLink = {
    id: crypto.randomUUID(),
    productId,
    clientName,
    createdAt: new Date().toISOString(),
    used: false,
  };
  links.push(newLink);
  safeSet(LINKS_KEY, links);
  return newLink;
}

export function getDeliveryLinks(): DeliveryLink[] {
  return safeGet<DeliveryLink[]>(LINKS_KEY, []);
}

export function getDeliveryLink(id: string): DeliveryLink | undefined {
  return getDeliveryLinks().find((l) => l.id === id);
}

export function markLinkAsUsed(id: string): void {
  const links = getDeliveryLinks().map((l) =>
    l.id === id ? { ...l, used: true } : l,
  );
  safeSet(LINKS_KEY, links);
}

// --- Reviews ---

export function submitReview(
  deliveryId: string,
  productId: string,
  clientName: string,
  rating: number,
  comment: string,
): Review {
  const reviews = getReviews();
  const newReview: Review = {
    id: crypto.randomUUID(),
    deliveryId,
    productId,
    clientName,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  safeSet(REVIEWS_KEY, reviews);
  markLinkAsUsed(deliveryId);
  return newReview;
}

export function getReviews(): Review[] {
  return safeGet<Review[]>(REVIEWS_KEY, []);
}

export function getReviewsByProduct(productId: string): Review[] {
  return getReviews().filter((r) => r.productId === productId);
}

export function getAverageRating(): number {
  const reviews = getReviews();
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

/**
 * Genera la URL completa para enviar a la clienta.
 * En Next.js: leé NEXT_PUBLIC_SITE_URL en lugar de window.location.origin.
 */
export function generateReviewUrl(deliveryLinkId: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || safeOrigin();
  return `${base}/valorar/${deliveryLinkId}`;
}
