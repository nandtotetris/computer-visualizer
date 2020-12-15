import styled from 'styled-components'

export const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150px;
  text-align: center;
  margin-bottom: 40px;
`

export const Up = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  height: 40%;
`

export const UpItem = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

export const VArrow = styled.div`
  height: 15px;
  margin-top: 5px;
  border: 0.5px solid black;
`

export const Text = styled.span`
  font-size: 16px;
`

export const SmallText = styled.span`
  font-size: 12px;
`

export const Down = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60%;
`

export const DownLeft = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const DownLeftItem = styled.div`
  height: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const HArrow = styled.div`
  margin-left: 10px;
  width: 20px;
  border: 1px solid black;
`

export const DownCenter = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
`

export const DownRight = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`

export const DownRightItem = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const HRArrow = styled(HArrow)`
  margin-left: 0px;
  margin-right: 10px;
`

export const LargeText = styled.span`
  font-size: 20px;
`
