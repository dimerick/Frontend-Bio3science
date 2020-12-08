import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuActive = false;
  public modalSearchActive = false;
  public menuXsActive = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.menuActive = !this.menuActive;
  }
  
  toggleModalSearchActive(){
    this.modalSearchActive = !this.modalSearchActive;
    console.log(this.modalSearchActive);
  }
  toggleMenuXsActive(){
    this.menuXsActive = !this.menuXsActive;
  }


}
