import {Component, OnInit} from '@angular/core';
import {DashboardSidebarComponent} from "../../Template/dashboard-sidebar/dashboard-sidebar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {GetdataService} from "../../../services/getdata.service";
import {format, subDays} from "date-fns";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {EChartsOption} from "echarts";
import {NgxEchartsDirective} from "ngx-echarts";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    DashboardSidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf,
    NgForOf,
    NgxEchartsDirective
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  private currentDate:Date = new Date();
  dateform! : FormGroup;
  protected flag_page:boolean=false;

  public constructor(private toast:NgToastService, private getData:GetdataService, private fb:FormBuilder) {}
  StartDate:string = format(subDays(this.currentDate, 30), 'yyyy-MM-dd');
  EndDate:string = format(this.currentDate, 'yyyy-MM-dd');
  data_page: any[] = [];
  series_page:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب صفحات', textStyle:{fontFamily:'Yekan',fontSize:25}, right: 0, textAlign:'center'},
    tooltip: {},
    grid: {containLabel: true},
    yAxis: {type: 'value'},
    xAxis: {type: 'category', data: [], axisLabel: {interval: 0, rotate:45, fontWeight:700, fontFamily:'Yekan', fontSize:14}},
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
  series_page_pie:EChartsOption = {
    title: {text: 'آمار کل بازدید ها - بر حسب صفحات', textStyle:{fontFamily:'Yekan',fontSize:25}, top:'5%', right: 0, textAlign:'center'},
    tooltip: {trigger: 'item'},
    legend: {orient: 'vertical', top: '14%', right: 0},
    toolbox: {show: true, orient: 'vertical', left: 'right', top: 'center', feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }},
    series: [
      {
        type: 'pie',
        top: '10%',
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
    this.flag_page = false;
    try {
      let res = await this.getData.getdata_page(stDate,enDate).toPromise();
      this.data_page = res.rows;
      let series_page_imp: any[] = [];
      let series_page_lbl: any[] = [];
      let series_page_data: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        let url = decodeURIComponent(res.rows[i].keys[0]);
        let newUrl = url.replace("https://","");
        series_page_imp.push(res.rows[i].impressions);
        series_page_lbl.push(newUrl);
        series_page_data.push({ name: newUrl, value: res.rows[i].impressions })
      }
      (this.series_page.xAxis as any).data = series_page_lbl;
      (this.series_page.series as any)[0].data = series_page_imp;
      (this.series_page_pie.series as any)[0].data = series_page_data;
      this.flag_page = true;
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

  protected readonly decodeURIComponent = decodeURIComponent;
}
