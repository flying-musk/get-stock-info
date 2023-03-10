import styled from 'styled-components';

export const Top = styled.div`
  border: solid 1px #d0d7de;
  border-radius: 4px;
  padding: 40px;
  display: flex;
  gap: 16px;
`;

export const TopIcon = styled.img`
  width: 48px;
  height: 48px;
`;

export const TopTitle = styled.div`
  flex-basis: 0;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const TitleTop = styled.div`
  font-size: 20px;
`;
export const TitleBottom = styled.div``;
export const TitleBottomGrey = styled.span`
  color: #d0d7de;
`;
export const TopSpace = styled.div`
  flex-basis: 0;
  flex-grow: 3;
`;
export const TopSelect = styled.div`
  border: solid 1px;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  flex-basis: 0;
  flex-grow: 3;
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
export const SelectIcon = styled.img`
  width: 20px;
  height: 20px;
`;
export const SelectTitle = styled.div`
  flex-grow: 1;
`;
export const SelectTitleGrey = styled.span`
  color: #d0d7de;
`;
export const SelectOptions = styled.span`
  border: solid 1px #d0d7de;
  position: absolute;
  left: 16px;
  right: 16px;
  top: 102%;
  background-color: #ffffff;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;
export const SelectOption = styled.span`
  padding: 16px;
`;
