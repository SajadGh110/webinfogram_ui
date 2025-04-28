import {Component, OnInit} from '@angular/core';
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {GetdataService} from "../../../services/getdata.service";
import {format, subDays} from "date-fns";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {EChartsOption} from "echarts";
import {NgxEchartsDirective} from "ngx-echarts";
@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    DashboardSidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf,
    NgxEchartsDirective
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  private currentDate:Date = new Date();
  dateform! : FormGroup;
  protected flag_country:boolean=false;

  public constructor(private toast:NgToastService, private getData:GetdataService, private fb:FormBuilder) {}
  StartDate:string = format(subDays(this.currentDate, 30), 'yyyy-MM-dd');
  EndDate:string = format(this.currentDate, 'yyyy-MM-dd');
  series_country_data: any[] = [];
  series_country:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب کشور', textStyle:{fontFamily:'Yekan',fontSize:25}, top:'10%', right: 0, textAlign:'center'},
    tooltip: {trigger: 'item'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    series: [
      {
        top:'25%',
        bottom: '15%',
        type: 'treemap',
        name:'بازدید',
        data: []
      }
    ]
  };
  series_country_pie:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب صفحات', textStyle:{fontFamily:'Yekan',fontSize:25}, top:'5%', right: 0, textAlign:'center'},
    tooltip: {trigger: 'item'},
    legend: {orient: 'vertical', top: '14%', right: '10%'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    series: [
      {
        type: 'pie',
        name: 'آمار بازدید',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {position: 'outer', alignTo: 'labelLine'},
        data: []
      }
    ]
  };

  async ngOnInit(){
    this.dateform = this.fb.group({
      StartDate: [''],
      EndDate: ['']
    });
    this.dateform.controls['StartDate'].setValue(this.StartDate);
    this.dateform.controls['EndDate'].setValue(this.EndDate);
    await this.do(this.StartDate,this.EndDate);
  }
  async do(stDate:string,enDate:string){
    this.flag_country = false;
    this.series_country_data = [];
    try {
      let res = await this.getData.getdata_country(stDate,enDate).toPromise();
      for (let i = 0; i < res.rows.length; i++) {
        this.series_country_data.push({ name: res.rows[i].keys[0], value: res.rows[i].impressions });
      }
      (this.series_country.series as any)[0].data = this.series_country_data;
      (this.series_country_pie.series as any)[0].data = this.series_country_data;
      this.flag_country = true;
    }
    catch (error:any){
      this.toast.error({ detail: "ERROR", summary: error.message, duration: 5000, position: 'topRight' });
    }
  }

  async OnUpdateDate(){
    this.StartDate = this.dateform.controls['StartDate'].value;
    this.EndDate = this.dateform.controls['EndDate'].value;
    await this.do(this.StartDate,this.EndDate);
  }
}
