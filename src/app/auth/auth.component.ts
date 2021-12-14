import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthResponseData, AuthService } from "./auth.service";
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placehholder/placeholder.directive";
import * as fromAppState from "./../store/app.reducer";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogInMode: boolean = true;
  showSpinner = false;
  errorMsg = null;
  authObsSubscription: Subscription;
  private closeSubscription: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  constructor(
    private authSrv: AuthService,
    private route: Router,
    private componentFactory: ComponentFactoryResolver,
    private store: Store<fromAppState.AppState>
  ) {}

  ngOnInit(): void {}
  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }
  onSubmit(form: NgForm) {
    this.showSpinner = true;
    this.errorMsg = null;
    const subEmail = form.value.email;
    const subPass = form.value.password;
    let authObs: Observable<AuthResponseData>;
    if (this.isLogInMode) {
      authObs = this.authSrv.logIn(subEmail, subPass);
    } else {
      authObs = this.authSrv.signUp(subEmail, subPass);
    }

    this.authObsSubscription = authObs.subscribe(
      (response) => {
        //console.log("AuthComponent:55 response", response);
        this.showSpinner = false;
        this.route.navigate(["/recipes"]);
      },
      (errorMsg) => {
        console.error("authObsSubscription errorMsg", errorMsg);
        this.errorMsg = errorMsg;
        this.showAlert(errorMsg);
        this.showSpinner = false;
      }
    );
    form.reset();
  }

  ngOnDestroy() {
    if (this.authObsSubscription) {
      this.authObsSubscription.unsubscribe();
    }
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  onCloseAlert() {
    this.errorMsg = null;
  }

  private showAlert(msg: string) {
    const alertComponentFactory =
      this.componentFactory.resolveComponentFactory(AlertComponent);
    const hostContaienrRef = this.alertHost.viewContainerRef;
    hostContaienrRef.clear();
    const cmpRef = hostContaienrRef.createComponent(alertComponentFactory);
    cmpRef.instance.message = msg;
    this.closeSubscription = cmpRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostContaienrRef.clear();
    });
  }
}
