import {Component, OnInit} from '@angular/core';
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {GetdataService} from "../../../services/getdata.service";
import {format, subDays} from "date-fns";
import {sort} from "d3";
import {NgxEchartsDirective} from "ngx-echarts";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-keyword',
  standalone: true,
    imports: [
        DashboardSidebarComponent,
        MatProgressSpinner,
        NgIf,
        ReactiveFormsModule,
        NgForOf,
        NgxEchartsDirective
    ],
  templateUrl: './keyword.component.html',
  styleUrl: './keyword.component.scss'
})
export class KeywordComponent implements OnInit {
  private currentDate:Date = new Date();
  dateform! : FormGroup;
  protected flag_query:boolean=false;

  public constructor(private toast:NgToastService, private getData:GetdataService, private fb:FormBuilder) {}
  StartDate:string = format(subDays(this.currentDate, 30), 'yyyy-MM-dd');
  EndDate:string = format(this.currentDate, 'yyyy-MM-dd');
  data_query:any = [];
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
    this.flag_query = false;
    try {
      let res = await this.getData.getdata_query(stDate,enDate).toPromise();
      this.data_query = res.rows;
      let series_query_imp: any[] = [];
      let series_query_lbl: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        series_query_imp.push(res.rows[i].impressions);
        series_query_lbl.push(res.rows[i].keys[0]);
      }
      (this.series_query.yAxis as any).data = series_query_lbl;
      (this.series_query.series as any)[0].data = series_query_imp;
      this.flag_query = true;
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
