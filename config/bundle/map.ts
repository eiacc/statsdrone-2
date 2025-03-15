// The directory & file structure of your development and static directory
import type { Directory } from "./type";

const map: Directory = {
  dev       : {
    index       : "src/index.html",
    pub         : "src/pub",
    pages       : "src/pages",
    javascript  : {
      ext : "js",
      path: "src/assets/scripts"
    },
    styles      : {
      ext : "css",
      path: "src/assets/styles"
    },
  },
  output    : {
    dirname   : "static",
    html      : "index.html",
    css       : "styles.min.css",
    js        : "script.min.js",
    pub       : "pub",
    pages     : "pages",
  }
}

export default map;