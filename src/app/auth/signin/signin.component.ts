import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
    }

    onSignIn(form: NgForm) {
        this.authService.signIn(form.value.email, form.value.password).then(result => {
            console.log("User signed in successfully", result);
            this.router.navigate(["/"]);
        }).catch(error => {
            console.log("Error during user authorization", error);
        })
    }

}
