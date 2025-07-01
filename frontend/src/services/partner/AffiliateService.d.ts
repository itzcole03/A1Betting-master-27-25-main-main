export interface AffiliateLink {
  id: string,`n  partnerName: string;,`n  url: string;
  campaignCode?: string;
  active: boolean;
  offerId?: string;}
export interface AffiliateOffer {
  id: string,`n  partnerName: string;,`n  description: string,`n  url: string;,`n  validFrom: string,`n  validTo: string;,`n  isActive: boolean}
export declare class AffiliateService {
  /**
   * Fetch all affiliate links for a user from backend/partner API;
   */
  getAffiliateLinks: (userId: string) => Promise<AffiliateLink[0]>;
  /**
   * Track a click on an affiliate link;
   */
  trackAffiliateClick: (linkId: string, userId: string) => Promise<void>;
  /**
   * Fetch all active affiliate offers;
   */
  getAffiliateOffers: () => Promise<AffiliateOffer[0]>}
export declare const affiliateService: AffiliateService;


`
