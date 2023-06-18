import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  formValidation: FormGroup | undefined; 
  errorMessage: string = ''; 
  headermsg: string = 'Log in to';

  formValidationMessages = { 
    'email': [
      { type: 'required', message: 'El email es un campo obligatorio.' },
      { type: 'pattern', message: 'El formato del email no es correcto.' }
    ],
   'password': [
     { type: 'required', message: 'La contraseña es un campo obligatorio.' },
     { type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.' }
   ]
 };

  isInLogin: boolean = true;
  isLogged: boolean = false;
  userData: any = {};
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private modalCtrl: ModalController, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.userData.name = "test";

    this.authService.isLogged().subscribe(loggedIn => {
      this.isLogged = loggedIn;
    });

    this.formValidation = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  
  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/tabs/tab1']);
  }

  async login(value: { email: string; password: string; }) {
    if(this.isInLogin){
      this.isLogged = await this.authService.login(value.email, value.password);
      if (this.isLogged) {
        this.confirm();
      } else {
        this.cancel();
        this.errorMessage = "Usuario o contraseña incorrectos";
      }  
    } else {
      let register = await this.authService.register(value.email, value.password);
      if (register) {
        this.confirm();
      } else {
        this.errorMessage = "Algo ha salido mal durante el registro";
        this.cancel();
      }
    }
  }

  async register(value: {email: string; password: string; }) {
    let registerOk = await this.authService.register(value.email, value.password);
    if (registerOk) {
      this.confirm();
    } else {
      this.errorMessage = "No se ha podido registrar el usuario";
    }
  }

  goToRegister() {
    this.isInLogin = !this.isInLogin;
    if(this.isInLogin){
      this.headermsg = 'Log in to';
    }else{
      this.headermsg = 'Register to';
    }
  }


  async cancel() {
    const toast = this.toastCtrl.create({
      message: 'Could not authenticate. Please try again.',
      duration: 2000
    });
    (await toast).present();
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const toast = this.toastCtrl.create({
      message: 'You have been authenticated!',
      duration: 2000
    });
    (await toast).present();
    return this.modalCtrl.dismiss("", 'confirm');
  }

}
