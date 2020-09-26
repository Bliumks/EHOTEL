import { Component, OnInit } from '@angular/core';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  array: any[] = [];
  location: string;
  roomc: string;
  hotelname: string;
  inphotel = (document.getElementById("hname")).value;
  inplocation = (document.getElementById("hname")).value;
  inproom = (document.getElementById("hname")).value;

  constructor(private http: HttpClient) {
    this.location = "";
    this.roomc = "";
    this.hotelname = "";
   }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.http.get('http://localhost:8080/hotels').subscribe( result => {
      const g: any = result;
      for (let i = 0; i < g.length;  i++) {
        this.array.push(g[i]);
      }
      console.log(this.array);
    });
  }
  done() {

  }
  findHotels() {
    this.http.get('http://localhost:8080/hotels').subscribe( result => {
      const g: any = result;
      for (let i = 0; i < g.length;  i++) {
        if(g[i] == this.inphotel){
          this.http.get('http://localhost:8080/roomcapasity').subscribe( result => { //I wasn't sure whats the names of columns in our database, so I just tried this one0 http://localhost:8080/roomcapasity
              const g: any = result;
              this.hotelname = g[i];
              for (let j = 0; j < g.length;  j++){
                if(g[j] == this.inproom){
                  this.roomc = g[j];
                  for(let r = 0; r < g.length;  r++){
                    this.http.get('http://localhost:8080/location').subscribe( result => { 
                    const g: any = result;
                      if(g[r] == this.inplocation){
                        this.location = g[r];
                        break;
                    })
                  }
              }
        }
      })

    });
}
