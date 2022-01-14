import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfigService } from "app/shared/okta/okta-config.service";

@Injectable({
  providedIn: 'root'
})
export class OktaWidgetService {
  private authClient = new OktaAuth({
    issuer: this.OktaConfig.strIssuer,
    clientId: this.OktaConfig.strClientID,
  });n
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfig.strPostLogoutURL;
  public strMFAStatus;

  constructor(private router: Router, private OktaConfig: OktaConfigService) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login() {
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;  
    const OktaRedirect = this.OktaConfig.strRedirectURL;
    const OktaBrand = this.OktaConfig.strBrand;
    const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    const OktaResType = this.OktaConfig.strResponseType;
    const OktaResMode = this.OktaConfig.strResponseMode;
    const OktaWidgetLogo = this.OktaConfig.strLogo;
    var oktaSignIn = new OktaSignIn({
      logo: OktaWidgetLogo,
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      features: {
                registration: true,                           // Enable self-service registration flow
                rememberMe: true,
                multiOptionalFactorEnroll: true,            // Allow users to enroll in multiple optional factors before finishing the authentication flow.
                selfServiceUnlock: true,                    // Will enable unlock in addition to forgotten password
                smsRecovery: true,                          // Enable SMS-based account recovery
                callRecovery: true,
              },
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: OktaResMode,
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: false,
        //prompt: OktaResMode
      },
      
    });
    console.log(OktaScope)
    var myMFADone = await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {

      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      console.log(oktaSignIn)
      oktaSignIn.remove();
      const idToken = tokens.idToken;
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
      window.location.replace(OktaRedirect);
      //window.location.replace('https://jpn-corp-ae.oktapreview.com/app/UserHome');
      return true;

    }).catch(function (err) {
      console.error(err);
      return false;
    });
    //console.log('MFA Status : ' + myMFADone)
    this.strMFAStatus = myMFADone;
  }

  
 
CloseWidget() {
  const OktaClientID = this.OktaConfig.strClientID;
  const OktaBaseURI = this.OktaConfig.strBaseURI;
  const OktaLang = this.OktaConfig.strLang;
  const OktaRedirect = this.OktaConfig.strRedirectURL;
  const OktaBrand = this.OktaConfig.strBrand;
  const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
  const OktaIssuer = this.OktaConfig.strIssuer;
  const OktaScope = this.OktaConfig.strScope;
  const OktaResType = this.OktaConfig.strResponseType;
  const OktaResMode = this.OktaConfig.strResponseMode;
  var oktaSignIn = new OktaSignIn({
    clientId: OktaClientID,
    baseUrl: OktaBaseURI,
    language: OktaLang,
    redirectUri: OktaRedirect,
    colors: {
      brand: OktaBrand,
    },

    postLogoutRedirectUri: OktaPostlogoutURI,
    authParams: {
      issuer: OktaIssuer,
      responseMode: OktaResMode,
      responseType: OktaResType,
      scopes: OktaScope,
      pkce: false,
    },
  });
  oktaSignIn.remove();

}

}



// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { OktaAuth } from "@okta/okta-auth-js";
// import { BehaviorSubject } from "rxjs";
// import OktaSignIn from '@okta/okta-signin-widget';
// import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
// import { OktaConfigService } from "./okta-config.service";

// @Injectable({
//   providedIn: 'root'
// })
// export class OktaWidgetService {
//   private authClient = new OktaAuth({
//     issuer: this.OktaConfig.strIssuer,
//     clientId: this.OktaConfig.strClientID,
//   });
//   public isAuthenticated = new BehaviorSubject<boolean>(false);
//   public strstateToken;
//   public oktaSignIn;
//   public idToken;
//   public LogoutURI = this.OktaConfig.strPostLogoutURL;
//   public strMFAStatus;

//   constructor(private router: Router, private OktaConfig: OktaConfigService) { }

//   async checkAuthenticated() {
//     const authenticated = await this.authClient.session.exists();
//     this.isAuthenticated.next(authenticated);
//     return authenticated;
//   }


//   async login() {
//     const OktaClientID = this.OktaConfig.strClientID;
//     //const OktaClientSecret  = this.OktaConfig.strClientSecret
//     const OktaBaseURI = this.OktaConfig.strBaseURI;
//     const OktaLang = this.OktaConfig.strLang;
//     const OktaRedirect = this.OktaConfig.strRedirectURL;
//     const OktaBrand = this.OktaConfig.strBrand;
//     const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
//     const OktaIssuer = this.OktaConfig.strIssuer;
//     const OktaScope = this.OktaConfig.strScope;
//     const OktaResType = this.OktaConfig.strResponseType;
//     const OktaResMode = this.OktaConfig.strPrompt;
//     const OktaWidgetLogo = this.OktaConfig.strLogo;
//     var oktaSignIn = new OktaSignIn({
//       logo: OktaWidgetLogo,
//       clientId: OktaClientID,
//       baseUrl: OktaBaseURI,
//       language: OktaLang,
//       redirectUri: OktaRedirect,
//       colors: {
//         brand: OktaBrand,
//       },
//       features: {
//         registration: true,                           // Enable self-service registration flow
//         // rememberMe: true,
//         // multiOptionalFactorEnroll: true,            // Allow users to enroll in multiple optional factors before finishing the authentication flow.
//         // selfServiceUnlock: true,                    // Will enable unlock in addition to forgotten password
//         // smsRecovery: true,                          // Enable SMS-based account recovery
//         // callRecovery: true,
//       },
//       postLogoutRedirectUri: OktaPostlogoutURI,
//       authParams: {
//         issuer: OktaIssuer,
//         responseMode: OktaResType,
//         responseType: OktaResType,
//         scopes: OktaScope,
//         pkce: false,
//         //prompt: OktaResMode
//       },

//     });
//     //console.log(OktaScope)
//     //showSignInAndRedirect
//     var myToken = await oktaSignIn.showSignInToGetTokens({
//       //var myMFADone = await oktaSignIn.showSignInAndRedirect({
//       el: '#okta-signin-container'
//     })
//       .then(function (tokens) {

//         oktaSignIn.authClient.tokenManager.setTokens(tokens);

//         oktaSignIn.remove();
//         const idToken = tokens.idToken;
//         console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
//         window.location.replace(OktaRedirect);
//         //console.log(tokens)

//         return true;


//       }).catch(function (err) {
//         console.error(err);
//         return false;
//       });
//     //console.log('MFA Status : ' + myMFADone)
//     this.colToken = myToken;

//   }

//   colToken;

//   CloseWidget() {
//     const OktaClientID = this.OktaConfig.strClientID;
//     const OktaBaseURI = this.OktaConfig.strBaseURI;
//     const OktaLang = this.OktaConfig.strLang;
//     const OktaRedirect = this.OktaConfig.strRedirectURL;
//     const OktaBrand = this.OktaConfig.strBrand;
//     const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
//     const OktaIssuer = this.OktaConfig.strIssuer;
//     const OktaScope = this.OktaConfig.strScope;
//     const OktaResType = this.OktaConfig.strResponseType;
//     const OktaResMode = this.OktaConfig.strResponseMode;
//     var oktaSignIn = new OktaSignIn({
//       clientId: OktaClientID,
//       baseUrl: OktaBaseURI,
//       language: OktaLang,
//       redirectUri: OktaRedirect,
//       colors: {
//         brand: OktaBrand,
//       },
//       postLogoutRedirectUri: OktaPostlogoutURI,
//       authParams: {
//         issuer: OktaIssuer,
//         responseMode: 'fragment',
//         responseType: OktaResType,
//         scopes: OktaScope,
//         pkce: false,
//         prompt: OktaResMode
//       },
//     });
//     oktaSignIn.remove();

//   }

// }

