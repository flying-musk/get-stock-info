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
import { Bottom } from './styles/Bottom.styled';
import { DataProp } from './interface';

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
        <Bottom>hihi bottom</Bottom>
      </Outer>
    </>
  );
}

export default App;
