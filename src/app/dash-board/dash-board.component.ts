import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var createGoogleEvent: any;


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  constructor(private fb: FormBuilder){}
  appointmentForm!: FormGroup;

 ngOnInit(){
    this.appointmentForm = this.fb.group({
      appointmentTime: [ '',Validators.required],
      email: [ '', [Validators.required, Validators.email]]
    });
 }
 // Method to handle the button click event schedule a meeting.

    scheduleMeeting(){
      let appointmentTime = new Date(this.appointmentForm.value.appointmentTime);

      // convert the date to the desired formate with a custom offset(eg. -07:00)
      const startTime = appointmentTime.toISOString().slice(0,18) + '-07:00';
      const endTime = this.getEndTime(appointmentTime);
      const eventDetails = {
        email : this.appointmentForm.value.email,
        startTime: startTime,
        endTime: endTime,
      };
      console.info(eventDetails);
      createGoogleEvent(eventDetails);
    } 

    getEndTime(appointmentTime: Date){
      // Add one hour to the date
      appointmentTime.setHours(appointmentTime.getHours() + 1);
      const endTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
      return endTime;
    }

  
      
    }
