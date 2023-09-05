import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../service/apiservice.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  userService : ApiService = inject(ApiService);
  users: any[] = [];
  datos: any;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    console.log("UsersComponent.ngOnInit()");
    this.apiService.getUsers().subscribe(users => {console.log(users);
      this.users = users;
      this.datos = users;}
    );
  }

}
