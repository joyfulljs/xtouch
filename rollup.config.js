import banner from 'rollup-plugin-banner';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const BannerStr =
  `<%= pkg.name %> v<%= pkg.version %>
(c) 2014-${new Date().getFullYear()} by <%= pkg.author %>
Released under the MIT License.`

export default [{
  input: 'dist/index.js',
  output: [{
    file: 'dist/xtouch.min.js',
    format: 'umd',
    name: 'XTouch',
    plugins: [
      terser({
        output: {
          comments: function (node, comment) {
            const { value, type } = comment;
            if (type == "comment2") {
              return /license/i.test(value);
            }
          }
        }
      }),
      banner(BannerStr)
    ]
  }, {
    file: pkg.main,
    format: 'cjs'
  }]
}];
