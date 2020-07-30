import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { UserData } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm:FormGroup;
  @Input() isInUpdateMode = false;
  @Input() userData: UserData;
  dataHolder:any[]
  userId:any;
  dataList:any[];
  constructor(
    private _FormBuilder: FormBuilder,
    private _UserService:UserService,
    private _Router:Router,
    private _Activated:ActivatedRoute
  ) {
    this.registrationForm = this._FormBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile:['',Validators.required],
      password:['',],
      confirmPassword:['']
    },{ validators: passwordMatch })
    this.dataHolder=[];
    this.dataList=[];
   }

  ngOnInit(): void {
   
    this.userId=this._Activated.snapshot.params.userId;    
    
   
    if (this.userId) {
    
      const temp=localStorage.getItem('user-list') as any;
      this.dataList=JSON.parse(temp);
      this.dataList.map((val,index)=>{
        val.id=`S-${index}`
      });
    this.dataList.forEach(val=>{
      if(val.id===this.userId){
        this.registrationForm.controls.name.setValue(val.name);
        this.registrationForm.controls.email.setValue(val.email);
        this.registrationForm.controls.mobile.setValue(val.mobile);
        this.registrationForm.controls.password.setValue(val.password);
      }
    })
           
    }
    // localStorage.clear();
  }

  

  onSubmit() {
    if (this.userId) {      
      this.dataList.forEach((value,index,array)=>{
         if(value.id===this.userId){
    array.splice(index,1);
  }
      });
      this.dataList.push(this.registrationForm.value);
      this.dataHolder=this.dataList;

      this.registrationForm.reset();
    } else {
      this._UserService
        .sendData(this.registrationForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.dataHolder.push(data);
              this.dataList= this.dataHolder;
              this.registrationForm.reset();
              console.log(this.dataHolder);              
            
            }
          }
        });
    }
  }


  goToList(){
    localStorage.setItem('user-list', JSON.stringify(this.dataHolder as any));
      this._Router.navigate(['/user-list']);
    
  }

  

}

export const passwordMatch = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { misMatch: true }
    : null;

};
