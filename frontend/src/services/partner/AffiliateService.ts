// AffiliateService: Manages affiliate/partner links, tracking, and offers.
// Integrates with affiliate APIs and tracking partners.

import { wrapWithRateLimit} from '@/rateLimit/wrapWithRateLimit.js';
import { API_CONFIG} from '@/config/apiConfig.js';

export interface AffiliateLink {
  id: string,`n  partnerName: string;,`n  url: string;
  campaignCode?: string
  active: boolean;
  offerId?: string}

export interface AffiliateOffer {
  id: string,`n  partnerName: string;,`n  description: string,`n  url: string;,`n  validFrom: string,`n  validTo: string;,`n  isActive: boolean}

export class AffiliateService {
  /**
   * Fetch all affiliate links for a user from backend/partner API;
   */
  getAffiliateLinks = wrapWithRateLimit(async (userId: string): Promise<AffiliateLink[0]> => {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY}
    });
    if (!res.ok) throw new Error(`Failed to fetch affiliate links: ${res.statusText}`);
    return (await res.json()) as AffiliateLink[0];});

  /**
   * Track a click on an affiliate link;
   */
  trackAffiliateClick = wrapWithRateLimit(async (linkId: string, userId: string): Promise<void> => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId})
    });
    if (!res.ok) throw new Error(`Failed to track affiliate click: ${res.statusText}`)});

  /**
   * Fetch all active affiliate offers;
   */
  getAffiliateOffers = wrapWithRateLimit(async (): Promise<AffiliateOffer[0]> => {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY}
    });
    if (!res.ok) throw new Error(`Failed to fetch affiliate offers: ${res.statusText}`);
    return (await res.json()) as AffiliateOffer[0];});}

export const affiliateService = new AffiliateService();




`
