import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-brief-device',
  templateUrl: './show-brief-device.component.html',
  styleUrls: ['./show-brief-device.component.scss']
})
export class ShowBriefDeviceComponent implements OnInit {

  @Input() device:any;
  id: number = 0;
  name: string = "";
  os: string = "";
  status: string = "Up";

  constructor( private router: Router) { }
  ngOnInit(): void {
    this.id = this.device.id;
    this.name = this.device.name;
    this.os = this.device.os;
  }
}
