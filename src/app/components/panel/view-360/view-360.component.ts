import {Component, OnInit} from '@angular/core';
import {BarChartModule, LineChartModule, PieChartModule, ScaleType} from "@swimlane/ngx-charts";
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {NgToastService} from "ng-angular-popup";
import {NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GetdataService} from "../../../services/getdata.service";
import {format, subDays} from "date-fns";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {EChartsOption} from "echarts";
import {NgxEchartsDirective} from "ngx-echarts";
@Component({
  selector: 'app-view-360',
  standalone: true,
  imports: [
    BarChartModule,
    PieChartModule,
    LineChartModule,
    DashboardSidebarComponent,
    NgForOf,
    NgIf,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxEchartsDirective
  ],
  templateUrl: './view-360.component.html',
  styleUrl: './view-360.component.scss'
})
export class View360Component implements OnInit {
  private currentDate:Date = new Date();
  dateform! : FormGroup;
  protected flag_date:boolean=false;
  protected flag_query:boolean=false;
  protected flag_country:boolean=false;
  protected flag_device:boolean=false;
  public constructor(private toast:NgToastService, private getData:GetdataService, private fb:FormBuilder) {}
  protected readonly ScaleType = ScaleType;

  StartDate:string = format(subDays(this.currentDate, 30), 'yyyy-MM-dd');
  EndDate:string = format(this.currentDate, 'yyyy-MM-dd');

  series_country_data: any[] = [];
  series_device_data: any[] = [];
  series_date:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب روز', textStyle:{fontFamily:'Yekan',fontSize:25},right:0},
    tooltip: {trigger: 'axis', axisPointer: {type: 'cross', label: {backgroundColor: '#6a7985'}}},
    legend: {data: ['آمار بازدید','تعداد کلیک'],left:10},
    xAxis: {type: 'category', data: [], axisLabel: { interval: 0, rotate: 45 }},
    yAxis: {type: 'value'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }},
    dataZoom: [{show: true}],
    series: [{name: 'آمار بازدید',data: [], type: 'line', color: '#3498DB', symbolSize: 10},{name: 'تعداد کلیک',data: [], type: 'line', color: '#E74C3C', symbolSize: 10}]
  };
  series_country:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب کشور', textStyle:{fontFamily:'Yekan'}, right: 0, textAlign:'center'},
    tooltip: {trigger: 'item'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    series: [
      {
        type: 'treemap',
        name:'بازدید',
        data: []
      }
    ]
  };
  series_device:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب دستگاه', textStyle:{fontFamily:'Yekan'}, right: 0, textAlign:'center'},
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
  series_query:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب کلمه کلیدی', textStyle:{fontFamily:'Yekan',fontSize:25}, right: 0, textAlign:'center'},
    tooltip: {},
    grid: {containLabel: true},
    xAxis: {type: 'value'},
    yAxis: {type: 'category', data: [], axisLabel: {interval: 0, fontWeight:700, fontFamily:'Yekan', fontSize:14}},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    series: [
      {
        type: 'bar',
        data: [],
        realtimeSort:true,
        label: {
          position: 'right',
          show: true
        }
      }
    ]
  };

  async ngOnInit() {
    this.dateform = this.fb.group({
      StartDate: [''],
      EndDate: ['']
    });
    this.dateform.controls['StartDate'].setValue(this.StartDate);
    this.dateform.controls['EndDate'].setValue(this.EndDate);
    await this.do(this.StartDate,this.EndDate);
  }

  async do(stDate:string,enDate:string){
    this.flag_date = false;
    this.flag_country = false;
    this.flag_device = false;
    this.flag_query = false;
    this.series_country_data = [];
    this.series_device_data = [];
    try {
      let res1 = await this.getData.getdata_date(stDate,enDate).toPromise();
      // ------------------------------------------
      let series_date_imp: any[] = [];
      let series_date_lbl: any[] = [];
      let series_date_clk: any[] = [];
      for (let i = 0; i < res1.rows.length; i++) {
        series_date_imp.push(res1.rows[i].impressions);
        series_date_clk.push(res1.rows[i].clicks);
        series_date_lbl.push(res1.rows[i].keys[0]);
      }
      (this.series_date.xAxis as any).data = series_date_lbl;
      (this.series_date.series as any)[0].data = series_date_imp;
      (this.series_date.series as any)[1].data = series_date_clk;
      this.flag_date = true;

      let res2 = await this.getData.getdata_country(stDate,enDate).toPromise();
      for (let i = 0; i < res2.rows.length; i++) {
        this.series_country_data.push({ name: res2.rows[i].keys[0], value: res2.rows[i].impressions });
      }
      (this.series_country.series as any)[0].data = this.series_country_data;
      this.flag_country = true;

      let res3 = await this.getData.getdata_device(stDate,enDate).toPromise();
      for (let i = 0; i < res3.rows.length; i++) {
        this.series_device_data.push({ name: res3.rows[i].keys[0], value: res3.rows[i].impressions });
      }
      (this.series_device.series as any)[0].data = this.series_device_data;
      this.flag_device = true;

      let res4 = await this.getData.getdata_query(stDate,enDate).toPromise();
      let series_query_imp: any[] = [];
      let series_query_lbl: any[] = [];
      for (let i = 0; i < res4.rows.length; i++) {
        series_query_imp.push(res4.rows[i].impressions);
        series_query_lbl.push(res4.rows[i].keys[0]);
      }
      (this.series_query.yAxis as any).data = series_query_lbl;
      (this.series_query.series as any)[0].data = series_query_imp;
      this.flag_query = true;
    } catch (error:any) {
      this.toast.error({ detail: "ERROR", summary: error.message, duration: 5000, position: 'topRight' });
    }
  }

  async OnUpdateDate(){
    this.StartDate = this.dateform.controls['StartDate'].value;
    this.EndDate = this.dateform.controls['EndDate'].value;
    await this.do(this.StartDate,this.EndDate);
  }
}
