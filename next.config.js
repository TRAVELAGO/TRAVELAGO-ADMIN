const path = require('path')

module.exports = {
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  reactStrictMode: false,
  transpilePackages: ['@mui/x-charts'],
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
