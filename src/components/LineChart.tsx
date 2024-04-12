import React from 'react';
import { useState } from 'react';
import { IgrCategoryChart } from "igniteui-react-charts";
import { IgrCategoryChartModule } from "igniteui-react-charts";
import { Button } from 'igniteui-react';

IgrCategoryChartModule.register();

interface DataState {
    time: number;
    value: number;
  }
export default class LineChart extends React.Component<any, any> {
    
    public data: any[] | undefined;
    public chart: IgrCategoryChart | undefined;
    public inputData: any;


    constructor(props: any) {            
        super(props);

        this.onChartRef = this.onChartRef.bind(this);
        this.onInputDataRef = this.onInputDataRef.bind(this);


        this.onTransitionInDurationChanged = this.onTransitionInDurationChanged.bind(this);
        this.onTransitionInModeChanged = this.onTransitionInModeChanged.bind(this);        
        this.onReloadChartClick = this.onReloadChartClick.bind(this);
        this.onDataButtonClicked = this.onDataButtonClicked.bind(this);
        this.state = {
            data: [
                { time: 0, value: 0 },
              ],   
            transitionLabel: "1000ms",
            transitionInDuration: 1000,
            transitionInMode: "Auto"
        };

        this.initData();
    }

    public render(): JSX.Element {
        const { contextData } = this.props;

        return (
            <div className="container sample">
                <div className="speed options">
                    <label className="options-value" style={{ width: "75px" }}>{this.state.transitionLabel}</label>
                    <input className="options-slider" type="range" min="50" max="9000" step="50" defaultValue="1000"
                           onChange={this.onTransitionInDurationChanged} />
                    <button onClick={this.onReloadChartClick}>Reload Chart</button>
                </div>
                <div className="speed options">
                </div>
                <>{console.log(contextData.tracks)}</>
                <IgrCategoryChart width="100%" height="80vh"
                    ref={this.onChartRef}
                    dataSource={contextData.tracks}
                    chartType="Line"
                    isTransitionInEnabled={true}
                    isHorizontalZoomEnabled={false}
                    isVerticalZoomEnabled={false}
                    transitionInDuration={this.state.transitionInDuration}
                    transitionInMode={this.state.transitionInMode}
                    yAxisTitle="TWh"
                    yAxisTitleLeftMargin={10}
                    yAxisTitleRightMargin={5}
                    yAxisLabelLeftMargin={0} 
					computedPlotAreaMarginMode="Series"/>
            </div>
        );
    }

    public onChartRef(chart: IgrCategoryChart) {
        if (!chart) { return; }

        this.chart = chart;
    }
    public onInputDataRef(inp: HTMLInputElement | null) {
        if (inp) {
            this.inputData = inp;
        }
    }
    

    public initData() {
        this.data = this.state.data;
    }

    public onTransitionInModeChanged(e: any) {
        const val = e.target.value;
        this.setState({ transitionInMode: val});
        this.initData();
    }

    public onTransitionInDurationChanged(e: any) {
        const val = e.target.value;
        this.setState({ transitionInDuration: val, transitionLabel: val + "ms"});
        this.initData();
    }

    public onReloadChartClick(e: any){
        this.chart?.replayTransitionIn();
    }
    public onDataButtonClicked(e: any) {
        const newData = [...this.state.data, { time: this.state.data[this.state.data.length-1].time + 1, value: Number(this.inputData.value)}];
        this.setState({ data: newData });
        this.initData();

    }
    
}
