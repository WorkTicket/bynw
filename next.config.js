/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/gift/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Patron-Guerreras-KPOP-Manos-Creativas-Bynmw.pdf"',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
