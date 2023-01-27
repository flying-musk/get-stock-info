import React from 'react';
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

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const actualStock = [53, 44, 35];
const projectedStock = [
  null,
  null,
  null,
  25,
  19,
  17,
  6,
  53,
  33,
  25,
  16,
  13,
  6,
  4,
];
const demand = [21, 16, 12];
const projectedDemand = [
  null,
  null,
  null,
  10,
  12,
  9,
  4,
  19,
  13,
  19,
  13,
  7,
  5,
  2,
];
const labels = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

export const ddddd = {
  labels,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Actual Stocks',
      data: actualStock,
      backgroundColor: '#d9d9d9',
    },
    {
      type: 'bar' as const,
      label: 'Projected Stocks',
      data: projectedStock,
      backgroundColor: '#f0f0f0',
    },
    {
      type: 'line' as const,
      label: 'Demand',
      data: demand,
      backgroundColor: '#000000',
      borderColor: '#000000',
      borderWidth: 1,
      fill: false,
    },
    {
      type: 'line' as const,
      label: 'Projected Demand',
      data: projectedDemand,
      borderColor: '#222222',
      borderDash: [3, 2],
      borderWidth: 1,
      fill: false,
    },
  ],
};

function App() {
  const [currentItemName, setCurrentItemName] = React.useState('Pickle');
  const [currentID, setCurrentID] = React.useState(1234);
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const [data, setData] = React.useState<DataProp>();

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

  const getData = () =>
    getAPI().then((res) => {
      if (res.status === 200) {
        console.log('ohlala', res.data);
        setData(res.data);
      } else {
        console.log(res);
      }
    });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>{JSON.stringify(data)}</div>
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
          <Chart type="bar" data={ddddd} />
        </Bottom>
      </Outer>
    </>
  );
}

export default App;
