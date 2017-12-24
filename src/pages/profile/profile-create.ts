import { Component } from '@angular/core';
import { BasePage } from '../base/base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

/**
 * This class represents the profile-create-page.
 */
@Component({
  selector: 'page-profile-create',
  templateUrl: 'profile-create.html',
  providers: [AuthService, ProfileService]
})
export class ProfileCreatePage extends BasePage {

  protected profileForm: FormGroup;

  /**
   *
   * @param {NavController} navCtrl
   * @param {AlertController} alertCtrl
   * @param {LoadingController} loadingCtrl
   * @param {FormBuilder} formBuilder
   * @param {AuthService} authService
   * @param {ProfileService} profileService
   */
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              protected formBuilder: FormBuilder,
              private authService: AuthService,
              private profileService: ProfileService) {
    super(navCtrl, alertCtrl, loadingCtrl);
  }

  async ngOnInit() {
    this.createLoading('Daten werden synchronisiert...');
    this.initForm();
  }

  /**
   * Initialize the form.
   */
  protected initForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  protected createProfile() {
    if (this.profileForm.invalid) {
      this.showAlert('Profil', 'Bitte Formularfelder richtig ausfüllen.');
    }
    this.loading.present();
    // get Auth Uid
    const authUid = this.authService.getAuthUid();

    // set profile name
    this.profileService.setProfileName(authUid, this.profileForm.value.name)
      .then(() => {
        this.navCtrl.setRoot(TabsPage);
      }).catch((err) => {
      this.showAlert('Profil', 'Ein Fehler ist aufgetreten.');
      console.error(err);
    });
    this.loading.dismiss();
  }

}
