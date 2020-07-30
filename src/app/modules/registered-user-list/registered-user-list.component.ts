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
  userId: string;
  userlist: User[];
  selectValue = 'select';
  pageNumber:any;
  pageSize:any;
  count:any;
  userList:User[];
  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _ExportExcelService: ExportExcelService
  ) {
    this.userlist = []
    this.pageSize=5;
    this.pageNumber=1;
  }

  ngOnInit(): void {
    
    const temp = localStorage.getItem('user-list');
    this.userlist = JSON.parse(temp);
    this.userlist.map((val, index) => {
      val.id = `S-${index}`
    });
    console.log(this.userlist)
    this.count=20;

    this.pageChanged(1);
  }

  deleteEmp(userId: any) {
    this.userlist.forEach((value, index, array) => {
      if (value.id === userId) {
        array.splice(index, 1);
      }

    })
    localStorage.setItem('user-list', JSON.stringify(this.userlist as any));

  }
  editEmp(id: any) {
    this._Router.navigate([`/register/${id}`]);
  }


  sortList() {

    if (this.selectValue === 'Asc') {
      const sortedArray = this.userlist.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      console.log('sortedArray:-', sortedArray)
      this.userlist = sortedArray;
    } else {
      const sortedArray = this.userlist.sort((a, b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0));
      console.log('sortedArray:-', sortedArray)
      this.userlist = sortedArray;
    }
  }
  pageChanged(event:any){
    debugger
    this.pageNumber=event;
      const na=this.userlist.slice((this.pageNumber*this.pageSize-5),(this.pageNumber*this.pageSize));   
      this.userList=na;
      console.log(na);
  }


  onExcel() {
    this._ExportExcelService.exportAsExcelFile(
      (() => {
        return this.userlist.map((val) => {
          return {
            'id': val.id,
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
