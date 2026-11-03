// Appends UTM tracking params to external links so outbound traffic from this
// site shows up as attributable referrals in the destination's analytics.
// - Leaves non-http links (mailto:, #anchors) untouched.
// - Won't overwrite UTM params a URL already carries.

const UTM_SOURCE = "tonyjohn.com";
const UTM_MEDIUM = "referral";

export function withUtm(url, campaign) {
  if (!url || !/^https?:\/\//i.test(url)) return url;
  try {
    const u = new URL(url);
    if (!u.searchParams.has("utm_source")) u.searchParams.set("utm_source", UTM_SOURCE);
    if (!u.searchParams.has("utm_medium")) u.searchParams.set("utm_medium", UTM_MEDIUM);
    if (campaign && !u.searchParams.has("utm_campaign")) {
      u.searchParams.set("utm_campaign", campaign);
    }
    return u.toString();
  } catch {
    return url;
  }
}
