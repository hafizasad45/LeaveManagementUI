import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.scss'],
})
export class MasterpageComponent implements OnInit {
  opened = true;

  public users: any = [];
  public fullName: string = '';
  constructor(
    private authService: AuthService,
    private api: ApiService,
    private userStote: UserStoreService
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStote.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
  }
}
