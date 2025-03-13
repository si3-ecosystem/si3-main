/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.si3.space",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/undefined",
          "/*/undefined",
          "/404",
          "/500",
          "/blog/hashtags/*",
        ],
      },
    ],
  },
  transform: async (config, path) => {
    return {
      loc: `${config.siteUrl}${path}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    };
  },
};
