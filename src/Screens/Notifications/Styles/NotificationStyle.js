import styled from 'styled-components'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`

export const Card = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
`

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`

export const BottomBorder = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #5A5A5A;
`

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 5%;
  flex-wrap: wrap;
  align-items: center
`

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: 'MontserratLight';
`

export const PostTime = styled.Text`
  font-size: 12px;
  color: #5A5A5A;
  font-family: 'MontserratLight';
  width: 20%;
`

export const NotificationMessage = styled.Text`
  font-size: 14px;
  color: #5A5A5A;
  width: 60%;
  font-family: 'MontserratLight'
`