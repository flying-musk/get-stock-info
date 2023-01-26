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
} from './styles/Top.styled';
import { Bottom } from './styles/Bottom.styled';

function App() {
  const [data, setData] = React.useState({
    itemIcon: 'pickle',
    itemName: 'Pickle',
    currentStock: 60,
    maximumStock: 150,
    itemList: [
      { itemName: 'Pickle', id: 1234 },
      { itemName: 'Maize', id: 1235 },
      { itemName: 'Potato', id: 1236 },
      { itemName: 'Rice', id: 1237 },
      { itemName: 'Soybean', id: 1238 },
      { itemName: 'Sweet potato', id: 1239 },
      { itemName: 'Wheat', id: 1240 },
      { itemName: 'Yam', id: 1241 },
    ],
  });

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
        <Top>
          <TopIcon src={require(`./asset/${data.itemIcon}.png`)} />
          <TopTitle>
            <TitleTop>{data.itemName}</TitleTop>
            <TitleBottom>
              {data.currentStock}kg/
              <TitleBottomGrey>{data.maximumStock}kg</TitleBottomGrey>
            </TitleBottom>
          </TopTitle>
          <TopSpace></TopSpace>
          <TopSelect>
            <SelectIcon src={require(`./asset/select.png`)}></SelectIcon>
            <SelectTitle>
              {data.itemList[0].itemName} |{' '}
              <SelectTitleGrey>#{data.itemList[0].id}</SelectTitleGrey>
            </SelectTitle>
            <SelectIcon src={require(`./asset/arrow.png`)}></SelectIcon>
          </TopSelect>
        </Top>
        <Bottom>hihi bottom</Bottom>
      </Outer>
    </>
  );
}

export default App;
