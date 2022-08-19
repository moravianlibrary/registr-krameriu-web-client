import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  graph_all: any;
  graph: any;
  display: string = '5d';
  percent: any;
  code: string;
  baseUrl = environment.baseUrl;
  graphData: any;
  loading: boolean;

  constructor(public translate: TranslateService,
              public dataService: DataService,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      const code = params['code'];
      this.code = code;
      this.changeHttpRequest(this.display)
      
      
    })
    
  }

  changeHttpRequest(display: any) {
    this.http.get(this.baseUrl + '/libraries/' + this.code + '/states?int=' + display).subscribe((data: any) => { 
      // console.log(data)
      const graphData = {
        from: Math.floor(new Date(data.from).getTime()/1000),
        to: Math.floor(new Date(data.to).getTime()/1000),
        values: this.buildValues(data.values) 
      }
      
      this.graph_all = this.buildGraph(graphData)
      this.graph = this.graph_all[0];
      this.percent = this.graph_all[1];
      this.loading = false;
    }
    )
  }

  buildValues(values: any) {
    const newValues = [];
    for (const value of values) {
      newValues.push([Math.floor(new Date(value.t).getTime()/1000), value.v])
    }
    return newValues
  }

    changeInterval(interval:string) {
      if (interval === "5h") {
        this.display = '5h'
        this.changeHttpRequest(this.display)   
      }
      else if (interval === "24h") {
        this.display = '24h'
        this.changeHttpRequest(this.display)
      }
      else if (interval === "5d") {
        this.display = '5d'
        this.changeHttpRequest(this.display)
      }
      else if (interval === "1m") {
        this.display = '1m'
        this.changeHttpRequest(this.display)
      }
      else if (interval === "6m") {
        this.display = '6m'
        this.changeHttpRequest(this.display)
      }
      else if (interval === "1y") {
        this.display = '1y'
        this.changeHttpRequest(this.display)
      }
  }

  buildGraph(graph_data: any) {
    // console.log(graph_data)
    let graph_length:number = graph_data.to - graph_data.from
    let sequences = [];
    let i = 0;
    let n = graph_data.values.length -1;
    // console.log("n", n)
    let t1: number;
    let t2: number;
    let v: number;
    let green_percent: number = 0;

    for (const value of graph_data.values) {
      // console.log(i)
      if (n > 0) {
        if (i == 0) {
          t1 = value[0];
          v = value[1];
          i = i+1
        }
        else if (i < n) {
          t2 = value[0];
          let div_length = t2 - t1;
          sequences.push([v, div_length/(graph_length/100), this.unixtimeToDate(t1), this.unixtimeToDate(t2),  this.dataService.unixDurationToHuman(div_length)])
          if (v == 1) {
            green_percent = green_percent + div_length/(graph_length/100)
          }
          t1 = t2;
          v = value[1];
          i = i+1
        }
        else if (i == n) {
          t2 = value[0];
          let div_length = t2 - t1;
          sequences.push([v, div_length/(graph_length/100), this.unixtimeToDate(t1), this.unixtimeToDate(t2),  this.dataService.unixDurationToHuman(div_length)])
          if (v == 1) {
            green_percent = green_percent + div_length/(graph_length/100)
          }
          t1 = t2;
          v = value[1];
          div_length = graph_data.to - t1;
          sequences.push([v, div_length/(graph_length/100), this.unixtimeToDate(t1), this.unixtimeToDate(graph_data.to), this.dataService.unixDurationToHuman(div_length)])
          if (v == 1) {
            green_percent = green_percent + div_length/(graph_length/100)
          }
        }  
      }
      else {
        t1 = graph_data.from;
        t2 = graph_data.to
        v = value[1];
        let div_length = t2 - t1;
        sequences.push([v, div_length/(graph_length/100), this.unixtimeToDate(t1), this.unixtimeToDate(t2),  this.dataService.unixDurationToHuman(div_length)])
        if (v == 1) {
          green_percent = green_percent + div_length/(graph_length/100)
        }
        console.log(v)
      }
      
    }
    return [sequences, green_percent.toFixed(2)]
   
  }

  color(num: number): string {
    switch(num) {
      case 0: return 'red';
      case 1: return 'green';
      case -1: return '#555';
      default: return 'ff0';
    }
  }
  state(num: number): string {
    switch(num) {
      case 0: return 'nejede';
      case 1: return 'jede';
      case -1: return 'neznámý';
      default: return 'well...';
    }
  }

  unixtimeToDate(t: number) {
    const newT = new Date(t*1000).toLocaleString("cs-CZ", { year: 'numeric', month: 'numeric', day: 'numeric', hour: "2-digit", minute: "2-digit" });
    return newT;
  }

}
