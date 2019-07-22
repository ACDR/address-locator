/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const STYLELINT_PLUGIN = require('stylelint-bare-webpack-plugin');

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~static': path.resolve(__dirname, './static'),
      },
      modules: [
        path.resolve(__dirname, './src'),
        'node_modules',
      ],
    },
    plugins: [
      new STYLELINT_PLUGIN({
        configFile: '.stylelintrc',
        context: './src',
        syntax: 'scss',
      }),
    ],
  });
};
