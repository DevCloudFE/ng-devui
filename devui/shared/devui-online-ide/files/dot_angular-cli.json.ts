export default `
{
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": ["assets", "favicon.ico"],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "prefix": "app",
      "styles": ["styles.css", "node_modules/ng-devui/devui.min.css", "node_modules/@devui-design/icons/icomoon/devui-icon.css"],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts"
      }
    }
  ]
}
`;
