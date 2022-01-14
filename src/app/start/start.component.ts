import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth} from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaConfigService } from "app/shared/okta/okta-config.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  strUserSession;
  constructor(private OktaWidgetService: OktaWidgetService, private OktaSDKAuthService: OktaSDKAuthService, private _snackBar: MatSnackBar, public OktaConfigService:OktaConfigService,) { }

  async ngOnInit()  {
    this.OktaWidgetService.CloseWidget();
    
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          console.log('Session to Okta : ' + exists);
          //window.location.replace(this.OktaConfigService.strRedirectURL);
          window.location.replace('https://jpn-corp-ae.oktapreview.com/app/UserHome');
          return exists
        } else {
          // not logged in
          console.log('Session to Okta : ' + exists);
          //window.location.replace(this.OktaConfigService.strPostLogoutURL);
          window.location.replace('https://192.168.1.210:4200/jpn-corp-ae-siw');
          return exists
        }
      });
    // switch (this.strUserSession) {
    //   case false:
    //     //this.OktaWidgetService.login();
    //     window.location.replace(this.OktaConfigService.strPostLogoutURL);
    //     break;

    //   case true:
    //     window.location.replace(this.OktaConfigService.strRedirectURL);
    //     break;

    // }
  }

}
