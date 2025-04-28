import {Component, OnInit} from '@angular/core';
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {NgToastService} from "ng-angular-popup";
import {GetdataService} from "../../../services/getdata.service";
import {format, subDays} from "date-fns";
import {EChartsOption} from "echarts";
import {NgxEchartsDirective, NgxEchartsModule} from "ngx-echarts";

@Component({
  selector: 'app-visitdate',
  standalone: true,
    imports: [
        DashboardSidebarComponent,
        FormsModule,
        MatProgressSpinner,
        NgIf,
        ReactiveFormsModule,
      NgxEchartsDirective
    ],
  templateUrl: './visitdate.component.html',
  styleUrl: './visitdate.component.scss'
})
export class VisitdateComponent implements OnInit{
  private currentDate:Date = new Date();
  dateform! : FormGroup;
  protected flag_date:boolean=false;
  public constructor(private toast:NgToastService, private getData:GetdataService, private fb:FormBuilder) {}

  StartDate:string = format(subDays(this.currentDate, 30), 'yyyy-MM-dd');
  EndDate:string = format(this.currentDate, 'yyyy-MM-dd');
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
  series_bar_date = [
    {
      data: [],
      type: 'bar',
      stack: 'a',
      name: 'آمار بازدید'
    },
    {
      data: [],
      type: 'bar',
      stack: 'a',
      name: 'تعداد کلیک'
    }
  ];
  series_bar:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب روز', textStyle:{fontFamily:'Yekan',fontSize:25},right:0},
    tooltip: {trigger: 'axis', axisPointer: {type: 'cross', label: {backgroundColor: '#6a7985'}}},
    legend: {data: ['آمار بازدید','تعداد کلیک'],left:10},
    xAxis: {type: 'category', data: [], axisLabel: { interval: 0, rotate: 45 }},
    yAxis: {type: 'value'},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    dataZoom: [{show: true}],
    series: this.series_bar_date as any
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
    this.flag_date = false;
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
        this.series_bar_date[0].data = res1.rows[i].impressions;
        this.series_bar_date[1].data = res1.rows[i].clicks;
      }
      (this.series_date.xAxis as any).data = series_date_lbl;
      (this.series_date.series as any)[0].data = series_date_imp;
      (this.series_date.series as any)[1].data = series_date_clk;
      (this.series_bar.xAxis as any).data = series_date_lbl;
      (this.series_bar_date as any)[0].data = series_date_imp;
      (this.series_bar_date as any)[1].data = series_date_clk;

      const stackInfo: {[key: string]: {stackStart: number[], stackEnd: number[]}} = {};
      for (let i = 0; i < this.series_bar_date[0].data.length; ++i) {
        for (let j = 0; j < this.series_bar_date.length; ++j) {
          const stackName = this.series_bar_date[j].stack;
          if (!stackName) {
            continue;
          }
          if (!stackInfo[stackName]) {
            stackInfo[stackName] = {
              stackStart: [],
              stackEnd: []
            };
          }
          const info = stackInfo[stackName];
          const data = this.series_bar_date[j].data[i];
          if (data !== null) {
            if (info.stackStart[i] == null) {
              info.stackStart[i] = j;
            }
            info.stackEnd[i] = j;
          }
        }
      }
      for (let i = 0; i < this.series_bar_date.length; ++i) {
        const data = this.series_bar_date[i].data as number[] | {value: number, itemStyle: object}[];
        const info = stackInfo[this.series_bar_date[i].stack];
        for (let j = 0; j < this.series_bar_date[i].data.length; ++j) {
          // const isStart = info.stackStart[j] === i;
          const isEnd = info.stackEnd[j] === i;
          const topBorder = isEnd ? 20 : 0;
          const bottomBorder = 0;
          data[j] = {
            value: data[j] as number,
            itemStyle: {
              borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
            }
          };
        }
      }


      this.flag_date = true;
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
