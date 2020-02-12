import React from "react";
import styled from "styled-components";

import coverPhoto from "../../images/sample_cover_pic.jpg";
import profilePic from "../../images/sample_profile_pic.jpg";

import { Avatar, CameraIcon, Relative, Absolute } from "./Common";

const CoverPhoto = styled.img`
  width: 100%;
  height: 55vh;
  object-fit: cover;
`;

const ProfilePic = styled(Avatar)`
  border: 5px solid #fff;
`;

const ProfilePicButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #534cf9;
  color: #fff;
  border: 0;
`;

const CoverPhotoButton = styled.button`
  width: 160px;
  height: 35px;
  color: white;
  background-color: black;
  border-radius: 25px;
  border: 0;
`;

function ProfileBanner() {
  return (
    <Relative columns>
      <CoverPhoto src={coverPhoto} />
      <Absolute bottom="-60px" width="100%" xCenter>
        <ProfilePic src={profilePic} rounded width="120px" height="120px" />
      </Absolute>
      <Absolute width="100%" xCenter bottom="30px" left="40px">
        <ProfilePicButton>
          <CameraIcon className="fa fa-camera-retro"></CameraIcon>
        </ProfilePicButton>
      </Absolute>
      <Absolute bottom="30px" right="30px">
        <CoverPhotoButton>
          <CameraIcon
            className="fa fa-camera-retro"
            small
            mr="10px"
          ></CameraIcon>
          Edit Cover Picture
        </CoverPhotoButton>
      </Absolute>
    </Relative>
  );
}

export default ProfileBanner;
