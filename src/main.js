import "core-js/stable"; // polyfill
import "regenerator-runtime/runtime";

import "./typescript";
const message = "Hello Webpack";
console.log("message", message);
const foo = () => {
  console.log("includes".includes("i"));
};
foo();
