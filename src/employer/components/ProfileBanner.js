import * as yup from "yup";

import {
  Absolute,
  Avatar,
  CameraIcon,
  Relative,
  RightAlign,
  SubTitle
} from "./Common";
import { Form, Formik } from "formik";

import { Button } from "./Common";
import Modal from "../../common/components/Modal";
import React from "react";
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

function ActionButtons(props) {
  return (
    <RightAlign mt="1.5rem">
      <Button
        white
        height="30px"
        type="button"
        mr="30px"
        onClick={props.onClose}
      >
        Cancel
      </Button>
      <Button type="submit" height="30px">
        Submit
      </Button>
    </RightAlign>
  );
}

function EditProfilePhoto(props) {
  const { profile_id, token, editProfile } = props;

  return (
    <Formik
      initialValues={{ profile_photo: null }}
      onSubmit={values => {
        let form = new FormData();
        form.append("profile_photo", values.profile_photo);
        form.append("file_name", values.profile_photo.name);
        form.append("file_type", values.profile_photo.type);

        editProfile(
          profile_id,
          token,
          form,
          "multipart/form-data, application/json"
        );
        props.onClose();
      }}
      validationSchema={yup.object().shape({
        profile_photo: yup.mixed().required()
      })}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <SubTitle bold blue>
              Edit profile photo
            </SubTitle>
            <input
              mt="15px"
              type="file"
              accept="image/*"
              name="profile_photo"
              onChange={event =>
                setFieldValue("profile_photo", event.currentTarget.files[0])
              }
            />
            <ActionButtons onClose={props.onClose} />
          </Form>
        );
      }}
    </Formik>
  );
}

function EditCoverPhoto(props) {
  const { profile_id, token, editProfile } = props;

  return (
    <Formik
      initialValues={{ cover_photo: null }}
      onSubmit={values => {
        let form = new FormData();
        form.append("cover_photo", values.cover_photo);
        form.append("file_name", values.cover_photo.name);
        form.append("file_type", values.cover_photo.type);

        editProfile(
          profile_id,
          token,
          form,
          "multipart/form-data, application/json"
        );
        props.onClose();
      }}
      validationSchema={yup.object().shape({
        cover_photo: yup.mixed().required()
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <SubTitle bold blue>
            Edit cover photo
          </SubTitle>
          <input
            mt="15px"
            type="file"
            accept="image/*"
            name="cover_photo"
            onChange={event =>
              setFieldValue("cover_photo", event.currentTarget.files[0])
            }
          />
          <ActionButtons onClose={props.onClose} />
        </Form>
      )}
    </Formik>
  );
}

function ProfileBanner(props) {
  const coverPhoto = localStorage.getItem("cover_photo");
  const profilePhoto = localStorage.getItem("profile_photo");
  return (
    <Relative columns>
      <CoverPhoto src={coverPhoto} />

      <Absolute bottom="-60px" width="100%" xCenter>
        <ProfilePic src={profilePhoto} rounded width="120px" height="120px" />
      </Absolute>

      {/* edit profile_photo form/modal */}
      <Modal
        render={EditProfilePhoto}
        {...props}
        openButton={props => (
          <Absolute width="100%" xCenter bottom="30px" left="40px">
            <ProfilePicButton onClick={props.onClose}>
              <CameraIcon className="fa fa-camera-retro"></CameraIcon>
            </ProfilePicButton>
          </Absolute>
        )}
      />

      {/* edit cover_photo form/modal */}
      <Modal
        render={EditCoverPhoto}
        {...props}
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
