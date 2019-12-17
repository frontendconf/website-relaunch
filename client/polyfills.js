import "intersection-observer";
import "mdn-polyfills/NodeList.prototype.forEach";
import "formdata-polyfill";

// Some necessary polyfills are not yet picked up by babel's preset-env
// We need to fine-tune the babel config at some point
import "mdn-polyfills/Array.prototype.includes";
import "mdn-polyfills/Object.assign";
