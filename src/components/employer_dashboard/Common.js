import styled from "styled-components";

// div container
export const Div = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: ${props =>
    props.yCenter ? "center" : ""}; //vertically align content to the center
  justify-content: ${props =>
    props.xCenter ? "center" : ""}; //horizontally align content to the center
  border-bottom: solid 1px ${props => (props.bb ? "#f1f1f1" : "fff")};
  border-right: solid 1px ${props => (props.br ? "#f1f1f1" : "fff")};
  border-left: solid 1px ${props => (props.bl ? "#f1f1f1" : "fff")};
  border-top: solid 1px ${props => (props.bt ? "#f1f1f1" : "fff")};
  margin-top: ${props => (props.mt)};
  margin-bottom: ${props => (props.mb)};
  margin-left: ${props => (props.ml)};
  margin-right: ${props => (props.mr)};
  padding: ${props => (props.pd)};
  padding-top: ${props => (props.pt)};
  padding-bottom: ${props => (props.pb)};
  padding-left: ${props => (props.pl)};
  padding-right: ${props => (props.pr)};
`;

// div container split into columns that run horizontally
export const Columns = styled(Div)`
  display: flex;
  flex-direction: row;
  width: ${props => props.width};
`;

// div container split into rows that run vertically
export const Rows = styled(Div)`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
`;

export const Avatar = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
`;

export const RoundedAvatar = styled(Avatar)`
  border-radius: 50%;
`;

export const GrayTxt = styled.span`
  color: #989898;
`;

export const Title = styled.span`
  color: #4874ea;
  font-size: 15px;
`;
