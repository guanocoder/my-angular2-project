import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    onSignUp(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signUp(email, password).then(result => {
            console.log("User registered successfully", result);
        }).catch(error => {
            console.log("Error during user registration", error);
        })
    }

}
