(function(modules){
function require(id) {
  const mod = modules[id];
  if (typeof mod === 'undefined') {
    throw new Error('Attempted to import module that does not exist. Ensure peer dependencies are correctly imported.');
  }
  const [fn, mapping] = mod;
  function localRequire(name) {
    return require(mapping[name])
  }
  const module = { exports: {} }
  fn(localRequire, module, module.exports);

  return module.exports;
}
require(0);
})({0: [
function(require, module, exports) {
  "use strict";

var _localMdxFile = _interopRequireDefault(require("./local-mdx-file.mdx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_localMdxFile.default);
},
{"./local-mdx-file.mdx":1}
],1: [
function(require, module, exports) {
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MDXContent;

var _react = _interopRequireDefault(require("react"));

var _tag = require("@mdx-js/tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* @jsx mdx */
var makeShortcode = function makeShortcode(name) {
  return function MDXDefaultShortcode(props) {
    console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope");
    return mdx("div", props);
  };
};

var layoutProps = {};
var MDXLayout = "wrapper";

function MDXContent(_ref) {
  var components = _ref.components,
      props = _objectWithoutProperties(_ref, ["components"]);

  return mdx(MDXLayout, _extends({}, layoutProps, props, {
    components: components,
    mdxType: "MDXLayout"
  }), mdx("h1", null, "MDX Content"), mdx("p", null, "Cool!"), mdx("p", null, mdx("del", {
    parentName: "p"
  }, "strikethrough")), mdx("pre", null, mdx("code", _extends({
    parentName: "pre"
  }, {
    "className": "language-jsx"
  }), "<code>\n  snippets too!\n</code>\n")));
}

;
MDXContent.isMDXComponent = true;
},
{}
],})
  