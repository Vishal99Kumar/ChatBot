import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageServiceService } from 'src/app/message-service.service';

@Component({
  selector: 'app-lost-found',
  templateUrl: './lost-found.component.html',
  styleUrls: ['./lost-found.component.scss']
})
export class LostFoundComponent implements OnInit {
  url = "../../../assets/jsonData/Lost_Found_json.json";
  data:any;
  filteredData: any;
  form:FormGroup;
  displayedColumns: string[] = ['Property_Details', 'Contact_Mob'];
  dataSource:any;
  isShowTable:any = false;
  isShowErrorMessage:any = false;
  
  constructor(private Service: MessageServiceService,
    private fb: FormBuilder,private datePipe: DatePipe){}
  ngOnInit(): void {
    this.form = this.fb.group({
      lostItem: [''],
      lostDate: [new Date(), Validators.required],
      selectedOption: ['all'],
    });
    this.Service.getJsonData(this.url).subscribe((res)=>{
      this.data = res;
      this.filteredData = this.data;
    //console.log(this.data);
  })
  }

  onSubmit() {
    this.isShowErrorMessage = false;
    if (this.form.valid) {
      const lostItem = this.form.value.lostItem;
      const lostDate = this.datePipe.transform(this.form.value.lostDate, 'dd/MM/yyyy');
      //console.log(lostDate)
      const selectedOption = this.form.value.selectedOption;
  
      // Filter data based on the form values
      const filteredData = this.data.filter((item) => {
        // Filter by lost item
        const itemMatches = !lostItem || item['name of item'].toLowerCase().includes(lostItem.toLowerCase());
        
        // Filter by lost date
        const dateMatches = !lostDate || item.date === lostDate;
        
        // Filter by selected option
        const terminalMatches = !selectedOption || selectedOption === "all" || item.Terminal === selectedOption;
      
        // Return true if all conditions are met
        return itemMatches && dateMatches && terminalMatches;
      });
      this.dataSource = filteredData;
      
      if(filteredData.length == 0){
        //console.log(filteredData.length,"inner");
        this.isShowTable = false;
        this.isShowErrorMessage=true;
      }
      else{
        this.isShowTable = true;
      }
      //console.log(filteredData.length);
    }
  }  
  
}
