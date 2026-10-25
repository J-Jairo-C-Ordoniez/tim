const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://tim-azure.vercel.app");

export const siteUrl = new URL(configuredSiteUrl);

export const siteMetadata = {
  name: "TIM",
  title: "TIM",
  description:
    "An independent interactive tribute to Tim Bergling (Avicii), exploring his creative process, community, and enduring musical legacy.",
  creator: "J Jairo C Ordoñez",
  locale: "en_US",
} as const;
