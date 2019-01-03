// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  site_name:'EbooksDen',
  firebase: {
    apiKey: "AIzaSyDMEkyGDip-9rQYSjB-3_kXpMXwn8qEW2Q",
    authDomain: "ebooksden-7d1f8.firebaseapp.com",
    databaseURL: "https://ebooksden-7d1f8.firebaseio.com",
    projectId: "ebooksden-7d1f8",
    storageBucket: "ebooksden-7d1f8.appspot.com",
    messagingSenderId: "450617729843"
    // apiKey: "AIzaSyDyyvLXBYg95v5Bf34l0_aLM61JjgG0jV8",
    // authDomain: "ebooksden-91dca.firebaseapp.com",
    // databaseURL: "https://ebooksden-91dca.firebaseio.com",
    // projectId: "ebooksden-91dca",
    // storageBucket: "ebooksden-91dca.appspot.com",
    // messagingSenderId: "690754521255"
  },
  externalPath: 'http://library1.org/',
  site_url:'www.ebooksden.com',
  site_config:{
    imagePath:'http://library1.org/covers/',
    dPath:'http://library1.org/_ads/'
  }
};
