import React from "react";
import styled from "styled-components";

import bannerImage from "../../images/sample_cover_pic.jpg";
import profilePic from "../../images/sample_profile_pic.jpg";

import { Avatar, Container } from "./CommonStyles";

const BannerContainer = styled(Container)`
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 55vh;
  object-fit: cover;
`;

const ImageContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const ProfilePic = styled(Avatar)`
  border: 5px solid #fff;
  position: absolute;
  bottom: -60px;
`;

const EditButton = styled.button`
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 160px;
    height: 35px;
    color: white;
    background-color: black;
    border-radius: 25px;
    border: 0;
`;

function ProfileBanner() {
  return (
    <BannerContainer columns>
      <BannerImage src={bannerImage} />
      <ImageContainer>
        <ProfilePic src={profilePic} rounded width="120px" height="120px" />
      </ImageContainer>
      <EditButton>Edit Cover Picture</EditButton>
    </BannerContainer>
  );
}

export default ProfileBanner;
