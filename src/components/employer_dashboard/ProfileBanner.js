import React from "react";
import styled from "styled-components";

import coverPhoto from "../../images/sample_cover_pic.jpg";
import profilePic from "../../images/sample_profile_pic.jpg";

import { Avatar, Container, CameraIcon } from "./Common";

const BannerContainer = styled(Container)`
  position: relative;
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: 55vh;
  object-fit: cover;
`;

const FlexContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const ProfilePic = styled(Avatar)`
  border: 5px solid #fff;
  position: absolute;
  bottom: -60px;
`;

const CoverPhotoButton = styled.button`
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

const ProfilePicButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #534cf9;
  color: #fff;
  border: 0;
  position: absolute;
  bottom: 30px;
  left: calc(50% + 20px);
`;

function ProfileBanner() {
  return (
    <BannerContainer columns>
      <CoverPhoto src={coverPhoto} />
      <FlexContainer>
        <ProfilePic src={profilePic} rounded width="120px" height="120px" />
      </FlexContainer>
      <ProfilePicButton>
        <CameraIcon className="fa fa-camera-retro"></CameraIcon>
      </ProfilePicButton>
      <CoverPhotoButton>
        <CameraIcon className="fa fa-camera-retro" small mr="10px"></CameraIcon>Edit Cover
        Picture
      </CoverPhotoButton>
    </BannerContainer>
  );
}

export default ProfileBanner;
