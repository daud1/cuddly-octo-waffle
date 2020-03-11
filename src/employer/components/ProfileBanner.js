import { Absolute, Avatar, CameraIcon, Input, Relative } from "./Common";
import { Form, Formik, useFormikContext } from "formik";
import { uploadToS3 } from "../../common/utils/cloudStorageUtils";

import Modal from "../../common/components/Modal";
import React from "react";
import coverPhoto from "../../common/images/sample_cover_pic.jpg";
import profilePic from "../../common/images/sample_profile_pic.jpg";
import styled from "styled-components";

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

function EditProfilePhoto(props) {
  const formik = useFormikContext();

  return (
    <Formik
      initialValues={{ profile_photo: props.profile_photo }}
      onSubmit={values => {
        values.profile_photo = uploadToS3(values.profile_photo);
        props.editProfile(values);
      }}
    >
      <Form>
        <Input
          type="file"
          accept="image/*"
          name="profile_photo"
          onChange={event =>
            formik.setFieldValue({
              profile_photo: event.currentTarget.files[0]
            })
          }
        />
        <button type="submit">submit</button>
        <button onClick={props.onClose}>cancel</button>
      </Form>
    </Formik>
  );
}

function EditCoverPhoto(props) {
  const formik = useFormikContext();

  return (
    <Formik
      initialValues={{ cover_photo: props.cover_photo }}
      onSubmit={values => {
        values.cover_photo = uploadToS3(values.cover_photo);
        props.editProfile(values);
      }}
    >
      <Form>
        <Input
          type="file"
          accept="image/*"
          name="cover_photo"
          onChange={event =>
            formik.setFieldValue({
              cover_photo: event.currentTarget.files[0]
            })
          }
        />
        <button type="submit">submit</button>
        <button onClick={props.onClose}>cancel</button>
      </Form>
    </Formik>
  );
}

function ProfileBanner(props) {
  return (
    <Relative columns>
      <CoverPhoto src={coverPhoto} />

      <Absolute bottom="-60px" width="100%" xCenter>
        <ProfilePic src={profilePic} rounded width="120px" height="120px" />
      </Absolute>

      <Modal // edit profile_photo form/modal
        render={EditProfilePhoto}
        openButton={props => (
          <Absolute width="100%" xCenter bottom="30px" left="40px">
            <ProfilePicButton onClick={props.onClose}>
              <CameraIcon className="fa fa-camera-retro"></CameraIcon>
            </ProfilePicButton>
          </Absolute>
        )}
      />

      <Modal // edit cover_photo form/modal
        render={EditCoverPhoto}
        openButton={props => (
          <Absolute bottom="30px" right="30px">
            <CoverPhotoButton onClick={props.onClose}>
              <CameraIcon
                className="fa fa-camera-retro"
                small
                mr="10px"
              ></CameraIcon>
              Edit Cover Picture
            </CoverPhotoButton>
          </Absolute>
        )}
      />
    </Relative>
  );
}

export default ProfileBanner;
