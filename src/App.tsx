import { useState, useEffect, useRef } from 'react';
import { getAPI } from './API';
import { Outer } from './styles/Outer.styled';
import {
  Top,
  TopIcon,
  TopTitle,
  TitleTop,
  TitleBottom,
  TitleBottomGrey,
  TopSpace,
  TopSelect,
  SelectIcon,
  SelectTitle,
  SelectTitleGrey,
  SelectOptions,
  SelectOption,
} from './styles/Top.styled';
import {
  Bottom,
  BottomBanner,
  BannerTitle,
  BannerLabel,
} from './styles/Bottom.styled';
import { DataProp } from './interface';
import { chartDataTemplate } from './ChartDataTemplate';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartDataLabels
);

function App() {
  const [currentItemName, setCurrentItemName] = useState('Pickle');
  const [currentID, setCurrentID] = useState(1234);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [data, setData] = useState<DataProp>();
  const [chartData, setChartData] = useState(chartDataTemplate);
  const chartOptions = {
    plugins: {
      datalabels: {
        anchor: 'end' as const,
        align: 'end' as const,
        offset: 4,
        font: {
          size: 10,
          family: 'Monaco, sans-serif' as const,
        },
        display: (content: any) => {
          return content.dataset.label === 'Today Stocks' ? true : false;
        },
        formatter: (value: any) => {
          return value ? `Today\nSEP 6th, 2022` : '';
        },
      },
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          sort: ({ text }: any) => {
            return text === 'Demand' ? 1 : -1;
          },
          filter: ({ text }: any) => {
            return (
              ['Actual Stocks', 'Projected Stocks', 'Demand'].indexOf(text) > -1
            );
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Days', font: { size: 14 } },
        stacked: true,
      },
      y: {
        title: { display: true, text: 'KG', font: { size: 14 } },
      },
    },
  };

  const selectSwitch = () => {
    setIsSelectOpen(!isSelectOpen);
  };
  const selectClick = () => {
    selectSwitch();
  };
  const selectBlur = () => {
    if (isSelectOpen) {
      selectSwitch();
    }
  };

  const optionClick = (e: any) => {
    setCurrentItemName(e.target.dataset.itemname);
    setCurrentID(e.target.dataset.id);
  };

  const chartRef = useRef();
  const updateChart = () => {
    const tt: any = chartRef.current;
    if (tt) {
      tt.data = chartData;
      tt.update();
    }
  };

  useEffect(() => {
    const getData = () => {
      getAPI(currentID).then((res) => {
        if (res.status === 200) {
          setData(res.data);
          let {
            actualStock,
            projectedStock,
            todayStock,
            demand,
            projectedDemand,
          } = res.data;

          chartDataTemplate.datasets[0].data = actualStock;
          chartDataTemplate.datasets[1].data = projectedStock;
          chartDataTemplate.datasets[2].data = todayStock;
          chartDataTemplate.datasets[3].data = [...demand, projectedDemand[3]];
          chartDataTemplate.datasets[4].data = projectedDemand;

          setChartData(chartDataTemplate);
          updateChart();
        } else {
          console.log(res);
        }
      });
    };
    getData();
  }, [currentID]);

  return (
    <>
      <Outer>
        {data && (
          <Top>
            <TopIcon src={require(`./asset/${data?.itemIcon}.png`)} />
            <TopTitle>
              <TitleTop>{data?.itemName}</TitleTop>
              <TitleBottom>
                {data?.currentStock}kg/
                <TitleBottomGrey>{data?.maximumStock}kg</TitleBottomGrey>
              </TitleBottom>
            </TopTitle>
            <TopSpace></TopSpace>
            <TopSelect tabIndex={0} onClick={selectClick} onBlur={selectBlur}>
              <SelectIcon src={require(`./asset/select.png`)}></SelectIcon>
              <SelectTitle>
                {currentItemName} |{' '}
                <SelectTitleGrey>#{currentID}</SelectTitleGrey>
              </SelectTitle>
              <SelectIcon src={require(`./asset/arrow.png`)}></SelectIcon>
              {isSelectOpen ? (
                <SelectOptions>
                  {data?.itemList.map((i: any) => (
                    <SelectOption
                      key={i.id}
                      data-id={i.id}
                      data-itemname={i.itemName}
                      onClick={optionClick}
                    >
                      #{i.id} | {i.itemName}
                    </SelectOption>
                  ))}
                </SelectOptions>
              ) : (
                ''
              )}
            </TopSelect>
          </Top>
        )}
        <Bottom>
          <BottomBanner>
            <BannerTitle>Stock Level</BannerTitle>
            <BannerLabel>
              <li>Live Marketing Campaign</li>
            </BannerLabel>
          </BottomBanner>
          <Chart
            type="bar"
            data={chartData}
            ref={chartRef}
            options={chartOptions}
          />
        </Bottom>
      </Outer>
    </>
  );
}

export default App;
