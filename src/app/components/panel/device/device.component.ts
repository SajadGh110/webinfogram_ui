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
  selector: 'app-device',
  standalone: true,
  imports: [
    DashboardSidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf,
    NgxEchartsDirective
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent implements OnInit{
  private currentDate:Date = new Date();
  dateform! : FormGroup;
  protected flag_device:boolean=false;
  public constructor(private toast:NgToastService, private getData:GetdataService, private fb:FormBuilder) {}
  StartDate:string = format(subDays(this.currentDate, 30), 'yyyy-MM-dd');
  EndDate:string = format(this.currentDate, 'yyyy-MM-dd');
  series_device_data: any[] = [];
  series_device:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب دستگاه', textStyle:{fontFamily:'Yekan',fontSize:25}, top:'5%', right: 0, textAlign:'center'},
    tooltip: {trigger: 'item'},
    legend: {top: '10%', right: 'center'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    series: [
      {
        type: 'pie',
        name: 'بازدید',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        endAngle: 360,
        label: {position: 'outer', alignTo: 'labelLine'},
        data: []
      }
    ]
  };
  series_device_funnel:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب دستگاه', textStyle:{fontFamily:'Yekan',fontSize:25}, top:'5%', right: 0, textAlign:'center'},
    tooltip: {trigger: 'item'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    legend: {
      data: ['DESKTOP', 'MOBILE','TABLET'],
      top:'10%'
    },
    series: [
      {
        name: 'Device', type: 'funnel', left: 'center', top: '25%', width:'50%', minSize: '0%', maxSize: '100%', sort: 'ascending', gap: 2,
        label: {show: true, position: 'inside'},
        labelLine: {length: 10, lineStyle: {width: 1, type: 'solid'}},
        itemStyle: {borderColor: '#fff', borderWidth: 1},
        emphasis: {label: {fontSize: 20}},
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
    this.flag_device = false;
    this.series_device_data = [];
    try {
      let res = await this.getData.getdata_device(stDate,enDate).toPromise();
      let series_device_lbl: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        this.series_device_data.push({ name: res.rows[i].keys[0], value: res.rows[i].impressions });
        series_device_lbl.push(res.rows[i].keys[0]);
      }
      (this.series_device.series as any)[0].data = this.series_device_data;
      (this.series_device_funnel.series as any)[0].data = this.series_device_data;
      this.flag_device = true;
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
