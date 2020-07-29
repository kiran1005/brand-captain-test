import { Component, OnInit } from '@angular/core';
import { UserData, User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ExportExcelService } from 'src/app/export-to-excel.service';

@Component({
  selector: 'app-registered-user-list',
  templateUrl: './registered-user-list.component.html',
  styleUrls: ['./registered-user-list.component.css']
})
export class RegisteredUserListComponent implements OnInit {
  public getUser: UserData[];
  userId:string;
  userlist:User[];
  constructor(
    private _UserService:UserService,
    private _Router: Router,
    private _ExportExcelService:ExportExcelService
  ) { 
    this.userlist=[]
  }

  ngOnInit(): void {
   const temp= localStorage.getItem('user-list');
  this.userlist=JSON.parse(temp);
  this.userlist.map((val,index)=>{
    val.id=`S-${index}`
  });
  console.log(this.userlist)
 
    
  }

  deleteEmp(userId:any) {
this.userlist.forEach((value,index,array)=>{
  if(value.id===userId){
    array.splice(index,1);
  }

})
localStorage.setItem('user-list', JSON.stringify(this.userlist as any));
    
  }
  editEmp(id:any) {
    this._Router.navigate([`/register/${id}`]);
  }

  onExcel(){
    this._ExportExcelService.exportAsExcelFile(
      (() => {
        return this.userlist.map((val) => {
          return {
            'id':val.id,
            'User_name': val.name,
            'Email': val.email,
            'Mobile': val.mobile,
            'Passowrd': val.password,
            'Confirm_password': val.confirmPassword  
          };
        });
      })()
      ,
      'export_data')
  }

}
