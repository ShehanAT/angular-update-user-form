import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service'
import { User } from '../shared/user.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent implements OnInit {
  selectedUser: User = new User;
  updateUserForm: FormGroup = this.formBuilder.group({});
  formReady:boolean = false;
  component = this;
  formErrors: { [key: string]: any }  = {
    'username': '', 
    'emailAddress': '',
    'fullName': '',
    'age': ''
  };
  validationMessages: { [key: string]: any }  = {
    'username': {
      'required':      'Username is required.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'emailAddress': {
      'required': 'Email is required!',
      'email': 'Email is not valid!',
    },
    'fullName': {
      'required': 'fullName is required!'
    },
    'age': {
      'required': 'age is required!'
    }
  };

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder
    ) {
    }

  setupForm(){
    this.updateUserForm = this.formBuilder.group({
      _id: new FormControl(this.selectedUser._id),
      username: new FormControl(this.selectedUser.username, [
        Validators.required
      ]),
      emailAddress: new FormControl(this.selectedUser.emailAddress, [
        Validators.required,
        Validators.email
      ]),
      fullName: new FormControl(this.selectedUser.fullName, [
        Validators.required
      ]),
      age: new FormControl(this.selectedUser.age, [
        Validators.required
      ])
    });  
    this.updateUserForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  loadUserData(){
    this.selectedUser = new User()
    this.selectedUser._id = '1';
    this.selectedUser.username = 'testing1';
    this.selectedUser.emailAddress = 'testing1@gmail.com';
    this.selectedUser.fullName = 'Testing1 Testing1';
    this.selectedUser.age = 10;
  }
  
  ngOnInit(){
    this.loadUserData();
    this.setupForm()
    this.formReady = true;
    
  }

  onSubmit(){
    this.userService.updateUser(this.updateUserForm.value).subscribe(x => {
      window.location.reload();
    }, 
      error => {
        console.log('Error encountered during form submission');
      });
  }

  onValueChanged(data?: any) {
    if (!this.updateUserForm) { return; }
    const form = this.updateUserForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}