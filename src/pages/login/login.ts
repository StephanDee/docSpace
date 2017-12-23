import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUpPage } from '../signup/signup';
import { BasePage } from '../base/base';
import { TabsPage } from '../tabs/tabs';

/**
 * This class represents the login-page.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage extends BasePage {

  protected loginForm: FormGroup;

  /**
   *
   * @param {NavController} navCtrl
   * @param {AlertController} alertCtrl
   * @param {FormBuilder} formBuilder
   * @param {AuthService} authService
   * @param {LoadingController} loadingCtrl
   */
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              protected formBuilder: FormBuilder,
              private authService: AuthService) {
    super(navCtrl, alertCtrl, loadingCtrl);
  }

  async ngOnInit() {
    this.createLoading('Authentifizierung...');
    this.initForm();
  }

  /**
   * Initialize the form.
   */
  protected initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(LoginPage.REGEX_EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  protected async userSignIn() {
    if (this.loginForm.invalid) {
      this.showAlert('Login', 'Bitte Formularfelder richtig ausfüllen.');
    } else {
      this.loading.present();
      await this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).then((user) => {
        if (user) {
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.showAlert('Anmeldung fehlgeschlagen', 'Ein Fehler ist aufgetreten.');
        }
      }).catch((err) => {
        this.showAlert('Anmeldung fehlgeschlagen', 'Das Passwort ist falsch oder der Nutzer existiert nicht.');
        console.error(err);
      });
    }
  }

  protected openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

}
