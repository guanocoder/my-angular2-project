import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    onSignIn(form: NgForm) {
        this.authService.signIn(form.value.email, form.value.password).then(result => {
            console.log("User signed in successfully", result);
        }).catch(error => {
            console.log("Error during user authorization", error);
        })
    }

}
