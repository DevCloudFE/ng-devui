export default {
  $schema: './node_modules/@angular/cli/lib/config/schema.json',
  version: 1,
  newProjectRoot: 'projects',
  projects: {
    demo: {
      root: '',
      sourceRoot: 'src',
      projectType: 'application',
      prefix: 'app',
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:browser',
          options: {
            outputPath: 'dist/demo',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            tsConfig: 'tsconfig.json',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['src/styles.css', 'node_modules/ng-devui/devui.min.css', 'node_modules/@devui-design/icons/icomoon/devui-icon.css'],
          },
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          options: {
            browserTarget: 'demo:build',
          },
        },
      },
    },
  },
  defaultProject: 'demo',
};
