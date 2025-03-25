import { readdir, mkdir, readFile, writeFile, rm, copyFile, stat } from "fs/promises";
import path from "path";
import fs from "fs";
import { transform } from "esbuild";
import type { Directory, Extension } from "./type";
import map from "./map";

class Bundle {
  dev; output;

  constructor(map: Directory) {
    const { dev, output } = map
    this.dev          = dev;
    this.output       = output;

    this.#optimize.bind(this)
  }

  async init() {
    try {
      await this.#generate_dist()
      await this.#optimize(this.dev.styles.ext, this.dev.styles.path, path.join(this.output.dirname, this.output.css))
      await this.#optimize(this.dev.javascript.ext, this.dev.javascript.path, path.join(this.output.dirname, this.output.js))
      await this.copy_index_html(this.dev.index, this.output.dirname)
      await this.copy_directory(this.dev.pub, path.join(this.output.dirname, this.output.pub))
      await this.copy_directory(this.dev.pages, path.join(this.output.dirname, this.output.pages))
    } catch (error) {
      console.error('❌ Build failed:', error)
    }
  }

  /**
   * Removes and replenish an empty directory for compiled code.
   */
  async #generate_dist() {
    if (fs.existsSync(this.output.dirname)) {
      await rm(this.output.dirname, { recursive: true, force: true });
    }

    await mkdir(this.output.dirname, { recursive: true });
  }

  /**
   * 
   * @param extension - only supports enum of css & js atm.
   * @param from - which directory we are getting our files.
   * @param destination - which directory we are going to send out our final result.
   * @returns
   */
  async #optimize(extension: Extension, from: string, destination: string): Promise<void> {
    try {
      // compress
      const compressed = await this.compress(extension, from)

      // Minify with esbuild
      const minified = await transform(compressed, { loader: extension, minify: true });
      await writeFile(destination, minified.code, "utf-8");
      console.log(`✅ ${extension.toUpperCase()} Minified & Combined into: ${destination}`);
    } catch (error) {
      console.log('optimize method bundling err: ', error)
    }
  }

  async compress(extension: Extension, from: string): Promise<string> {
    let compress  : string    = '';
    const stack   : string[]  = [from];

    while(stack.length > 0) {
      const folder = stack.pop()!;
      try {
        const entries = await readdir(folder, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(folder, entry.name);

          if (entry.isDirectory()) {
            stack.push(fullPath); // Push directory for further exploration
          } else if (entry.isFile() && entry.name.endsWith(`.${extension}`)) {
            console.log(entry.name)
            const extractCode: string = await readFile(fullPath, 'utf-8');
            compress += `${extractCode}\n`
          }
        }
      } catch (error) {
        console.log('compress method err: ', error)
      }
    }

    return compress
  }

  // TODO: refactor
  async copy_index_html(file: string, destination: string) {
    try {
      if (fs.existsSync(file)) {
        await copyFile(file, path.join(destination, this.output.html));
        console.log(`📄 Copied ${file} to ${destination}`);
      } else {
        console.warn(`⚠️ ${file} not found.`);
      }
    } catch (error) {
      console.error("⚠️ Error copying index.html:", error);
    }
  }

  // TODO: refactor
  async copy_directory(src: string, dest: string) {
    try {
      // Ensure public directory exists
      if (!fs.existsSync(src)) {
        console.warn(`⚠️ ${src} directory not found.`);
        return;
      }

      // Ensure destination exists
      await mkdir(dest, { recursive: true });

      // Read all files and directories inside public
      const entries = await readdir(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          // Recursively copy nested directories
          await this.copy_directory(srcPath, destPath);
        } else {
          // Copy files
          await copyFile(srcPath, destPath);
        }
      }

      console.log(`✅ Copied ${src} → ${dest}`);
    } catch (error) {
      console.error("⚠️ Error copying public directory:", error);
    }
  }
}

const bundle = new Bundle(map);
bundle.init();