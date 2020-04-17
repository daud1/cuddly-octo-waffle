import * as yup from "yup";

import {
  Absolute,
  Avatar,
  CameraIcon,
  Relative,
  RightAlign,
  SubTitle,
  CustomisableInput,
} from "./Common";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../shared/utils/constants";
import { Form, Formik, ErrorMessage } from "formik";

import { Button, Error } from "./Common";
import Modal from "../../shared/components/Modal";
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
      <Button white height="30px" type="button" mr="30px" onClick={props.onClose}>
        Cancel
      </Button>

      <Button type="submit" height="30px">
        Submit
      </Button>
    </RightAlign>
  );
}

function EditProfilePhoto(props) {
  const { profileId, token, editProfile, onClose } = props;

  return (
    <Formik
      initialValues={{ profile_photo: null }}
      onSubmit={(values) => {
        let form = new FormData();

        form.append("profile_photo", values.profile_photo);
        form.append("file_name", values.profile_photo.name);
        form.append("file_type", values.profile_photo.type);

        editProfile(profileId, token, form, "multipart/form-data, application/json");
        onClose();
      }}
      validationSchema={yup.object().shape({
        profile_photo: yup
          .mixed()
          .required("Required!")
          .test("fileSize", "File too large", (value) => value && value.size <= FILE_SIZE)
          .test(
            "fileFormat",
            "Unsupported Format",
            (value) => value && SUPPORTED_FORMATS.includes(value.type)
          ),
      })}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <SubTitle bold blue>
              Edit profile photo
            </SubTitle>
            <CustomisableInput
              mt="15px"
              mb="8px"
              type="file"
              accept="image/jpeg, image/jpg"
              name="profile_photo"
              onChange={(e) => setFieldValue("profile_photo", e.currentTarget.files[0])}
            />
            <ErrorMessage name="profile_photo" component={Error} />
            <ActionButtons onClose={onClose} />
          </Form>
        );
      }}
    </Formik>
  );
}

function EditCoverPhoto(props) {
  const { profileId, token, editProfile, onClose } = props;

  return (
    <Formik
      initialValues={{ cover_photo: null }}
      onSubmit={(values) => {
        let form = new FormData();

        form.append("cover_photo", values.cover_photo);
        form.append("file_name", values.cover_photo.name);
        form.append("file_type", values.cover_photo.type);

        editProfile(profileId, token, form, "multipart/form-data, application/json");
        onClose();
      }}
      validationSchema={yup.object().shape({
        cover_photo: yup
          .mixed()
          .required("Required!")
          .test("fileSize", "File too large", (value) => value && value.size <= FILE_SIZE)
          .test(
            "fileFormat",
            "Unsupported Format",
            (value) => value && SUPPORTED_FORMATS.includes(value.type)
          ),
      })}
    >
      {({ setFieldValue }) => (
        <Form>
          <SubTitle bold blue>
            Edit cover photo
          </SubTitle>
          <CustomisableInput
            mt="15px"
            type="file"
            mb="8px"
            accept="image/jpeg, image/jpg"
            name="cover_photo"
            onChange={(e) => setFieldValue("cover_photo", e.currentTarget.files[0])}
          />
          <ErrorMessage name="cover_photo" component={Error} />
          <ActionButtons onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
}

export default function ProfileBanner(props) {
  const coverPhoto = localStorage.getItem("cover_photo");
  const profilePhoto = localStorage.getItem("profile_photo");

  return (
    <Relative columns>
      <CoverPhoto src={coverPhoto} />

      <Absolute bottom="-60px" width="100%" xCenter>
        <ProfilePic src={profilePhoto} rounded width="120px" height="120px" />
      </Absolute>

      {/* edit profile_photo form-in-modal */}
      <Modal
        {...props}
        render={EditProfilePhoto}
        openButton={(props) => (
          <Absolute width="100%" xCenter bottom="30px" left="40px">
            <ProfilePicButton onClick={props.onClose}>
              <CameraIcon className="fa fa-camera-retro"></CameraIcon>
            </ProfilePicButton>
          </Absolute>
        )}
      />

      {/* edit cover_photo form/modal */}
      <Modal
        {...props}
        render={EditCoverPhoto}
        openButton={(props) => (
          <Absolute bottom="30px" right="30px">
            <CoverPhotoButton onClick={props.onClose}>
              <CameraIcon className="fa fa-camera-retro" small mr="10px"></CameraIcon>
              Edit Cover Picture
            </CoverPhotoButton>
          </Absolute>
        )}
      />
    </Relative>
  );
}
