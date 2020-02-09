const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "防疫物资捐赠分发",
    meta: [
      { charset: "utf-8" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    script: [
      {
        src: process.env.NODE_ENV === "development" ? "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js" : "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  env: {},
  router: {
    mode: "hash",
    middleware: ["redirect"]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vant", "~/plugins/i18n"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build"],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: "/nuxt/",
    extend(config, ctx) {
      config.externals = {
        vue: "Vue"
      };
      if (!ctx.isDev) {
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            },
            sourceMap: false,
            cache: true,
            parallel: true
          })
        );
      }
      return config;
    }
  }
};
