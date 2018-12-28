// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  site_name:'EbooksDen',
  firebase: {
    apiKey: "AIzaSyBobbTBr7a4hQE1IalY1V922ZrXHeMXZKI",
    authDomain: "ebooksden-91dca.firebaseapp.com",
    databaseURL: "https://ebooksden-91dca.firebaseio.com",
    projectId: "ebooksden-91dca",
    storageBucket: "ebooksden-91dca.appspot.com",
    messagingSenderId: "355154509416"
  },
  externalPath: 'http://library1.org/',
  site_url:'www.ebooksden.com',
  site_config:{
    imagePath:'http://library1.org/covers/',
    dPath:'http://library1.org/_ads/'
  }
};
