// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  site_name:'EbooksDen',
  firebase: {
    apiKey: 'AIzaSyDyyvLXBYg95v5Bf34l0_aLM61JjgG0jV8',
    authDomain: 'ebooksden-4c77a.firebaseapp.com',
    databaseURL: 'https://ebooksden-4c77a.firebaseio.com',
    projectId: 'ebooksden-4c77a',
    storageBucket: 'ebooksden-4c77a.appspot.com',
    messagingSenderId: '690754521255'
  },
  externalPath: 'http://libgen.io/',
  site_url:'www.ebooksden.com'
};
