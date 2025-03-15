export type Output = {
  dirname : string;
  html    : string;
  css     : string;
  js      : string;
  pub     : string;
  pages   : string;
}

type Files = {
  ext : Extension;
  path: string;
}

export type DevelopmentEnv = {
  index       : string;
  pub         : string;
  pages       : string;
  javascript  : Files;
  styles      : Files;
}

export type Extension = "css" | "js"

export type Directory = {
  dev     : DevelopmentEnv;
  output  : Output;
}

export type Optimize = (extension: Extension, from: string, destination: string) => Promise<void>;