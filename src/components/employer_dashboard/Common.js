import styled from "styled-components";

// text
export const GrayTxt = styled.span`
  color: #989898;
  font-size: ${props => (props.bigger ? "14px" : "")};
`;

export const BlueSubTitle = styled.span`
  color: #3d6de9;
  font-size: 14px;
  font-weight: ${props => (props.bold ? "bold" : "")};
  cursor: pointer;

  &:hover {
    color: ${props => (props.hoverEffect ? "black" : "")};
    text-decoration: ${props => (props.hoverEffect ? "underline" : "")};
`;

// flexible container
export const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};

  // Display
  display: flex;
  align-items: ${props =>
    props.yCenter ? "center" : ""}; //vertically align content to the center
  justify-content: ${props =>
    props.xCenter ? "center" : ""}; //horizontally align content to the center
  flex-direction: ${props =>
    props.columns
      ? "column"
      : "row"}; //container children will be rows by default
  flex-wrap: ${props => (props.wrap ? "wrap" : "no-wrap")};

  // Border
  border-bottom: solid 1px ${props => (props.bb ? "#f1f1f1" : "fff")};
  border-right: solid 1px ${props => (props.br ? "#f1f1f1" : "fff")};
  border-left: solid 1px ${props => (props.bl ? "#f1f1f1" : "fff")};
  border-top: solid 1px ${props => (props.bt ? "#f1f1f1" : "fff")};

  // Margin
  margin: ${props => props.mg};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};

  // Padding
  padding: ${props => props.pd};
  padding-top: ${props => props.pt};
  padding-bottom: ${props => props.pb};
  padding-left: ${props => props.pl};
  padding-right: ${props => props.pr};
`;

export const Relative = styled(Container)`
  position: relative;
`;

export const Absolute = styled(Container)`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
`;

// images
export const Avatar = styled.img`
  width: ${props => (props.width ? `${props.width}` : "60px")};
  height: ${props => (props.height ? `${props.width}` : "60px")};
  border-radius: ${props => (props.rounded ? "50%" : "5px")};
  object-fit: cover;
  border: ${props => (props.border ? "solid 1px #f1f1f1" : "0px")};
`;

// text align
export const RightAlign = styled(Container)`
  display: flex;
  justify-content: flex-end;
`;

// buttons
export const Button = styled.button`
  width: ${props => (props.width ? `${props.width}` : "80px")};
  height: 28px;
  border-radius: 15px;
  border: 0;
  font-size: 11px;
  font-weight: 600;
  color: ${props => (props.white ? "#989898" : "#fff")};
  background-color: ${props => (props.white ? "#fff" : "#5355F0")};
  box-shadow: ${props => (props.white ? "0px 0px 20px 8px #E8E7FB" : "")};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
`;

// icons
export const EditIcon = styled.i`
  font-size: 18px;
  color: #a5a5a5;
  cursor: pointer;

  // Margin
  margin: ${props => props.mg};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
`;

export const SocialIcon = styled.i`
  font-size: 16px;
  width: 35px;
  height: 35px;
  background-color: #ebf5f6;
  margin: ${props => (props.mg ? `${props.mg}` : "5px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7d7d7d;
  cursor: pointer;
`;

export const TwitterIcon = styled(SocialIcon)`
  border: solid 1px #f1f1f1;
  color: #05c3ff;
  background-color: #fff;
`;

export const BriefcaseIcon = styled.i`
  font-size: 16px;
  margin-right: ${props => (props.mr ? `${props.mr}` : "10px")};
  color: #7d7d7d;
`;

export const CameraIcon = styled.i`
  color: #fff;
  font-size: ${props => (props.small ? "15px" : "20px")};
  margin-right: ${props => (props.mr ? `${props.mr}` : "0px")};
`;

export const Ellipsis = styled.i`
  font-size: 20px;
  color: #989898;
  margin: 0 10px;
`;

export const AwardIcon = styled.i`
  font-size: 18px;
  padding-top: ${props => props.pt};
  color: #959595;
`;

// inputs
export const Input = styled.input`
  border-radius: 20px;
  width: 280px;
  margin-bottom: 8px;
  border: solid 1px #f1f1f1;
  padding: 5px 20px;
  font-size: 12px;
`;
