import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  cabTypeLabels = ["Pink", "Green", "Red"];
  location: any;
  listOfCabs: any[];
  cabType: number = -1;
  consumer = {
    consumerId: 1004,
    location: this.location
  };
  bookedCab: any;
  bookingInfo: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    console.log("App ngonit");
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((geo) => {
      console.log("location", geo);
      this.location = {
        "lat": geo.coords.latitude,
        "long": geo.coords.longitude,
        timeStamp: new Date().getTime()
      };
      this.getNearByCabs();
    });
  }
  bookCab(cab) {
    let req = { cab, consumer: this.consumer };
    this.location.timeStamp = new Date().getTime();
    req.consumer.location = this.location;
    this.appService.bookCab(req).then((res) => {
      this.bookedCab = cab;
      console.log(res)
      this.listOfCabs = undefined;
      this.bookingInfo = res;
    }).catch((err) => {
      console.log(err);
      alert("Booking Failed, Plz try again")
    });
  }

  endRide() {
    let req = { cab: this.bookedCab, consumer: this.consumer, booking: this.bookingInfo };
    this.appService.endRide(req).then((res) => {
      console.log(res);
      this.bookedCab = undefined;
      this.getCurrentLocation();
      this.bookingInfo = res;
      let amount = res.paymentInfo.finalamount;
      if (amount) {
        alert(`${amount} dogecoin's were charged for ride,plz pay for uninterrupted serives`)
      }
    }).catch((err) => {
      console.log(err);
      alert("Unable to end the ride, Plz try again")
    });
  }

  getNearByCabs() {
    this.appService.getNearByCabs(this.location).then((res) => {
      console.log(res)
      this.listOfCabs = res || [];
    }).catch((err) => {
      console.log(err);
      this.listOfCabs = [];
    });
  }
  bookNearMyCab() {
    console.log(this.cabType);
    let i;
    if (this.cabType == -1) i = 0;
    else i = this.listOfCabs.findIndex(e => +e.cabType == +this.cabType);
    if (i != -1)
      this.bookCab(this.listOfCabs[i]);
    else {
      if (this.cabType == -1)
        alert("No Cab found nearby");
      else alert("No Cab of " + this.cabTypeLabels[this.cabType] + " found")
    }
  }
}
