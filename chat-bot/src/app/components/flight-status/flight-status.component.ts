import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageServiceService } from 'src/app/message-service.service';

@Component({
  selector: 'app-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.scss']
})
export class FlightStatusComponent implements OnInit {
  statusForm:FormGroup;
  url = "../../../assets/jsonData/Flight_Status_json.json";
  data:any;
  filteredData: any;
  displayedColumns: string[] = ['flight_no', 'time','status'];
  dataSource:any;
  isShowTable:any = false;
  isShowErrorMessage:any = false;
  constructor(private fb: FormBuilder,
    private Service: MessageServiceService,
    private datePipe: DatePipe){}

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      State: ['Arrival'],
      type: ['International'],
      SearchValue: [null],
      selectedOption: ['all'],
    });
    this.Service.getJsonData(this.url).subscribe((res)=>{
      this.data = res;
      this.filteredData = this.data;
    //console.log(this.data);
  })
  }

  // toggletype(value){

  // }
  togglestatus(value){
    if(value === 'Departure')
    {
      this.statusForm.patchValue({
        State: value,
      });
    }
    else{
      this.statusForm.patchValue({
        State: value,
      });
    }
  }
  onSubmit() {
    this.isShowErrorMessage = false;
    if (this.statusForm.valid) {
      const state = this.statusForm.value.State;
      const type = this.statusForm.value.type;
      const searchValue = this.statusForm.value.SearchValue;
      const selectedOption = this.statusForm.value.selectedOption;
  
      // Filter data based on the form values
      this.filteredData = this.data.filter((item) => {
        // Filter by state (Arrival/Departure)
        const stateMatches = !state || item.event === state;
  
        // Filter by type (Domestic/International)
        const typeMatches = !type || item.type === (type === 'Domestic' ? 0 : 1);
  
        // Filter by search value
        const searchMatches = !searchValue || Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchValue.toLowerCase())
        );
  
        // Filter by selected option
        const terminalMatches = !selectedOption || selectedOption === 'all' || item.terminal === 'Terminal ' + selectedOption;
  
        // Return true if all conditions are met
        return stateMatches && typeMatches && (!searchValue || searchMatches) && terminalMatches;
      });
  
      //console.log(this.filteredData);
      this.dataSource = this.filteredData;
      if(this.filteredData.length == 0){
        this.isShowTable = false;
        this.isShowErrorMessage=true;
      }
    }
  }
  
  onExtraClick(){
    this.isShowTable = true;
  }
}
