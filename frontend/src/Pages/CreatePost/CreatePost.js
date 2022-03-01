import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
} from "./CreatePostStyle";

const CreatePost = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [picURL, setPicURL] = useState("");

  const post = async () => {
    //Uploading image to cloudinary

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "Log-in-out");
    data.append("cloud_name", "multiverse");
    try {
      const Details = await fetch(
        "https://api.cloudinary.com/v1_1/multiverse/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const PicDetails = await Details.json();
      setPicURL(PicDetails.url);
      console.log(picURL);
      try {
        const res = await fetch("/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ title, pic: PicDetails.url }),
        });
        const response = await res.json();
        if (response.error) {
          swal(response.error, {
            icon: "error",
            buttons: false,
            timer: 1000,
          });
        } else {
          swal("Posted Successfully", {
            icon: "success",
            buttons: false,
            timer: 1000,
          });
          history.push("/allposts");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>Create Post</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder="Title"
            type="text"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </CardFieldset>

        <CardFieldset>
          <CardInput
            placeholder="Pic"
            type="file"
            required
            onChange={(e) => {
              setPic(e.target.files[0]);
            }}
          />
        </CardFieldset>

        <CardFieldset>
          <CardButton type="button" onClick={post}>
            Submit
          </CardButton>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};

export default CreatePost;
