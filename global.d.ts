// Next 14's bundled types only declare `*.module.css`, so plain CSS
// side-effect imports trip TS2882 under TypeScript 5.6+.
declare module '*.css'
