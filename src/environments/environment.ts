// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyAbJoc1McUE1z045lc8CQC7wmz_eVquj5o",
    authDomain: "angulartreinamento.firebaseapp.com",
    databaseURL: "https://angulartreinamento-default-rtdb.firebaseio.com",
    projectId: "angulartreinamento",
    storageBucket: "angulartreinamento.appspot.com",
    messagingSenderId: "900900157215",
    appId: "1:900900157215:web:26cd04329cea704780222a"
  },

  baseUrlCep: "//viacep.com.br/ws/",

  baseUrlCity: "//servicodados.ibge.gov.br/api/v1/localidades/estados/",

  baseUrlCidade: "//servicodados.ibge.gov.br/api/v1/localidades/distritos/",
  
  baseUrlAPI: "//servicodados.ibge.gov.br/api/v1"
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
