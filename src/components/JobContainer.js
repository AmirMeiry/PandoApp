import React,{ useEffect, Component} from 'react'
import { connect } from 'react-redux'
import { fetchJobs } from '../redux/job/jobActions'
import { Chart } from "react-google-charts";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const dayName = ["Sun", "Mon", "Tue", "Wed", "May", "Thu",
  "Fri", "Sat"
];

function JobContainer({ jobData, fetchJobs }) {
    useEffect(() => {
        fetchJobs()
    }, [])
    jobData.loading ? (
        <h2>loading</h2>
    ) : jobData.error ? (
        <h2>{jobData.error}</h2>
    ) : (jobData.users.map(user => addDataToChart(user.activeJobs,user.predictedViews,user.jobViews,user.date))
    )
    return GoogleCharts
}

function addDataToChart(ActiveJobs, PredictedJobViews, JobViews, date) {
    let dateToUpdate = new Date(date)
    let monthDayToShow = monthNames[dateToUpdate.getMonth()].toString() + ' ' + (dateToUpdate.getDate() ).toString()
    dataArrayData.push([monthDayToShow, createCustomHTMLContent(new Date(dateToUpdate.getFullYear(),dateToUpdate.getMonth(),dateToUpdate.getDate()), JobViews, PredictedJobViews, ActiveJobs), JobViews, PredictedJobViews, ActiveJobs])
}

let dataArrayData = [
    [
      'Month',
      { role: "tooltip", type: "string", p: { html: true } },
      'Cumulative job views',
      'Cumulative predicted job views',
      'Active Jobs',
    ], 
]

const GoogleCharts = 
    <Chart
            width={"100%"}
            height={"20em"}
            chartType="ComboChart"
            loader={<div>Loading Chart</div>}
            
            data={dataArrayData}
        
            options={{
              title: 'Cumulative job views vs. prediction',
              titleTextStyle: {
                color: '#16487f',
                bold: true,
                //auraColor: 'lightblue',
            },
            subtitle: '   ',
              tooltip: { isHtml: true, trigger: "visible" },
              focusTarget: 'category',
              vAxis: { title: 'Jobs Views', minValue: 0, maxValue: 1500, titleTextStyle: { color: '#333'} },
              /*vAxes: {
                  0: {title: 'Jobs Views', minValue: 0, maxValue: 1500, titleTextStyle: { color: '#333'},},
                  1: {title: 'Jobs', minValue: 0, maxValue: 100, titleTextStyle: { color: '#333'},},
                  },
                  */
                  //hAxis: {showTextEvery: 1},
              //hAxis: { title: 'Day of Month'},
              seriesType: 'bars',
              //backgroundColor: 'black',
              backgroundColor: {
                stroke: '#f0f0f0',
                strokeWidth: 4
            },
              /*chartArea: {
                backgroundColor: {
                    stroke: '#f0f0f0',
                    strokeWidth: 2
                }
              },*/
              legend: 'bottom',

              series: { 
                0: {
                  //visibleInLegend: false,
                  type: 'line', 
                  color: '#96c03b',
                  pointSize: 5,
                  dataOpacity: 0.5,
                  pointBorderColor: 'black',
                  pointBorderWidth: 10,
                  axis: 'JobsViews'
                },
                1: { 
                  type: 'line', 
                  color: '#42b2ca',
                  pointSize: 5,
                  //visibleInLegend: false
                },
                2: {
                  color: '#dddddd',
                  axis: 'Jobs'
                   //visibleInLegend: false
                  }
                },
                
                axes: {
                  y: {
                  JobsViews: {label: 'Jobs Views', side: 'top'},
                  Jobs: {label: 'Jobs'}
                  }
                 },

                
              
            }}
            rootProps={{ 'data-testid': '1' }}
          />

function createCustomHTMLContent(date, JobViews, PredictedJobViews, ActiveJobs) {
  let dateToShow = dayName[date.getDay()] + ', ' + monthNames[date.getMonth()] + ' ' + (date.getDate()).toString() + ', ' + date.getFullYear()
    return '<div style="padding:5px 5px 5px 5px;">' +
        '<p "style="width:75px;height:50px"><b>'+ 
        dateToShow 
        + '</b></p><br/>' +
        '<table class="job_layout">' + '<tr>' +
        '<td><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEVrvmb///9nvWJduVdkvF9ovWNiu1z8/vzW7NWf05yVz5Lj8uLn9OaLy4d3w3K737nK5sn3+/eQzY2z3LF7xXd/xnvE48Kk1aKZ0Jbb7tqu2atvwGrk8uPt9+y94Lug052My4hI0NTiAAAH3ElEQVR4nOWdjZqqIBBA+dcsTU2zta3u+z/lxbWtVFQ0SJk9D7Dr+YCZYVJA2DZesvOP+7I4hXkWRWd0PkdRHga3ch/728T6v8fI5h/fxYcgQ4IKxhghnKNfOCeEMCFB+ekQf9t8CFuGl7jIqFQjTy01XJpSmhfxxdKT2DC8HAMkxKhb01MOZ3rdWXga04aevzlTQSbIPSGMoo3vGX4io4ZJHLBpY9e1FCyNjcYfg4ZxKmYOXluShrG5kTRluL0xI3o1XIjT1tCTmTE8ZtScXg2h0dHIQBow3BVUvLX2euCCFgZSyNuG25QyC3o1TKRvT9Y3Dbeh8enZhNDwa0FD634VnIZvjeMbhrv0A3614783ip3ZhsntQ34VhG5mVwFzDa/MXnxRwcT+o4ZfkfioX4U4zws5sww31Eb+G4PTzYcMff7ZCfqEcf8Dht6JLuRXQU+TK7mphl9oqQGsYWjqapxoWC6yAl/htLRomOSfD6FdRD4pN04x9NnncvwQhEwJOBMM90uGmCb0YMMwXcMM/UWE2jFV1zDJlo2hbVikuxg1Db/Z0jG0DWeanXI9wy8rbYr34EIv3mgZxuuJMa/QoynD6zoFpeLVjOFhrYJSUaO+GTdcsaCW4qjhqgV1FMcMVy6oUd6MGK42yDwZCzfDhitNE01Gksagoe+CoFQcTP1Dhts11dpD0KGm+IBhsrpatBc2UIYPGEbOCCIezTFM17VdGoal0w0PrizCGtGbFvsMHQmjT3oDao9hso6e0xRIT7TpMcwdNMynGJZuLcIaoS7ClYZfri3CGqps+KsMPeROJnyFI1WLUWV4cikTvsICPUMnNhRqVCmja+i5OoIVRMdw47Ih6/4Q3jHcujtHK7obqY6hQzsKFd1dRttw72Kuf6Xz3k3LMHFdUComg4Y3l8NMTTvYNA0vboeZGrobMEzdDjM15F+/oeOZ4pdmxmgYhu7tClXwsM8QyBC2tlGvhiGEVVjBc7UhmCFsrsQXwxTGKqwggcrw4n4580RcFIaF++XME1Z0DT04q7CCeh3DK6RJKqfpsWPo+L6wDc/ahoBSRc0jYfwabuCkihqyaRlCCqQ1rGkYw4ozFSJuGAKqZ34h6ashgPZMl3vDBkGdpI9piqBO0sc0/TF0+qeKfpj3MPQhTlI5Tf2HIbh0X1Mn/R/D89LPYgd+/jUE0QdWQS93wyPMZXjfQlWGAcxleG/XVIZLP4hFakNQLagmVUMKAS3ZaqrCDQFrsjWpWm7SMIfVoXmlau9LQ6jZsIJWhjvQhjtpCLTsrpHFN8IHuIFGhpqDNAzgBpqfqgbhDLIhz6Th0g9hGYxAttmeiASBThZVukCgk0WVLhDgurtCxGgPOR3KhLhHJXDDEhVQWxg1pEBgmzQ15ITAvOqlhocI8P63gucoW/oZLJOhaOlHsEyEgP5m8QC+IXS/CuiO5z9gCD+WwjeEX9NAr0v/IdDtUmkYoBvw3dMNlcANyz/Qp4Hfa4PfL4Xf84b/u4W39DNYxvsLvx+CLmp48Cd+xwedEEX8J96ngf9O1B94rw3w/onU7yaCfc378X4p/HeEIb8zdH+THeR3XRU/33ZVhleoVQ37/d4CbM5/fDMDdiGewX+7dvtD3x8C7WS8fEMK5/ykV+6nmtWGIAu3+/Em9+/xIeaLxvf4UE5qe6V5pgLEVkbrXAwPoGHzbBN8gjZNO+fTwD9jCP45UeDO+rp2DOGf1wbrc2DVmXuwGlLKcxMhtWvUZ19CShivx0GDPIO2cRr0q6Gjl690aRwG3TgLGshvNKT3LGgoK3HgPG8gZ7I3b5uBeK7+ZcAQxN0INzxkmAAwHL7fAsAdJe17Vzv3zJzdDjbj98y4nvY17gpy906yinaYURp6Lm8xeEdHde+acxd0PtG7d83hecpOChv1/YeOwnXvP3R1nurfYYlx4WLe77kSuOcu2cy9gDrtLlkX69O+28fh3OmsXIQDhs7dy92+FHDc0LG71VW3yI4ZuhRtSNavMWCYEFc2Upz3RJkRQ/ztylIUuwGLIUNXAqqq3tY0xEcXFGm7bzHFEF/Xr0ivwwojhviwdkWqrkb1DdeuOCo4bojLNSuOC2oYrnkUaW+tNskQ79eqOBJF9Q3XmjRorPPwWobYF+sr4Ljo2y/NMcQ7srYynKDL+GNPMMRJtq7NFMsGiu1ZhnK/uKY6XPTvB+cbrikxaqTBOYbYZ+tYjIQNbibeMMRJvoaZKnLdJTjdcBUzlZbTHnmiIfb5sjOVcb0sON8Qe+mSw0g3qh9fzBpiHLOlUiNDU0LMfEOMN3SJIo7T7k/YtgzxNvp8UBXZ96xnnWcod1QfnqqM6OyUTBriZEM/F1WJKCblQCOGcr8Rfmg5EnrS3EcYNsT4K/zAOBL6b6ilbddQhhzb48hpOi/AmDLE+DsQ9mIOE8Fb42fEEONLKaw0ObigxRvrz6Ch5JgZX5CEZtfJFZoKM4ZyQd6YMCdJhAg6LxnOxJShJE6FEUk5O8PYyPD9YNBQVgFxIEfyrTUpRy+8zs7uKowaSjx/c6Yzh5Iwija+UT1s3rDicgyQmDaWXI4dSq9vpwYFNgwrLnGRUSrYqCcnTFCaF7GBxKDEluEPu/gQZEhIUcYI4U9ZzgmRZkJQHqVl/GbVMoxVw5pk5x/3ZXEK8yyKzuh8jqI8DG7lPva/E3Mxs4//Ry5bqViKc4EAAAAASUVORK5CYII=" style="width:25px;height:25px"/></td>' +
        '<td><b>' + "Job views: "+ JobViews + '</b></td>' + '</tr>' + '<tr>' +
        '<td><img src="https://p.kindpng.com/picc/s/210-2102921_glossy-blue-light-button-svg-clip-arts-light.png" style="width:25px;height:25px"/></td>' +
        '<td><b>' + "Predicted job views: " + PredictedJobViews + '</b></td>' + '</tr>' + '<tr>' +
        '<td><img src="https://www.tlbx.app/200.svg" style="width:25px;height:25px"/></td>' +
        '<td><b>' + "Active jobs: " + ActiveJobs + '</b></td>' + '</tr>' + '</table>' + '</div>';
  }
const mapStateToProps = state => {
    return {
        jobData: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchJobs: () => dispatch(fetchJobs())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(JobContainer)
export * from '../redux/job/jobActions'
