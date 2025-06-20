// import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // if (!isServer) {
      //   config.plugins.push(
      //     new webpack.IgnorePlugin({
      //       resourceRegExp: /some-warning-or-error/, // Adjust this to target specific warnings
      //     })
      //   );
      // }

        config.module.rules.push({
          test: /\.node/,
          use: "raw-loader",
        });
    return config;
      },
      experimental: {
        // …
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
      },
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '192.168.0.11',
            port: '4000',
            // hostname: '10.10.73.49',
            // port: '8000',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: '192.168.55.140',
            port: '4000',
            // hostname: '10.10.73.49',
            // port: '8000',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'kitap.edu',
            port: '4000',
            // hostname: '10.10.73.49',
            // port: '8000',
            pathname: '/**',
          },
        ],
      },
};
export default  nextConfig;
