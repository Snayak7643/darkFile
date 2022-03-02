import React, { useState, useEffect } from "react";
import {
  Card,
  CardContainer,
  CardImage,
  CardWrapper,
  CutIcon,
} from "./AllPostsStyle";
import swal from "sweetalert";
import { FaBan } from "react-icons/fa";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(true);

  const handleClick = (id) => {
    fetch("/deletepost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          swal("Post Deleted Successfully ", {
            buttons: false,
            timer: 1000,
          });
          setReload(!reload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("/allposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .catch((err) => console.log(err));
  }, [reload]);

  return (
    <CardWrapper>
      {posts[0] ? (
        posts.map((post) => {
          return (
            <Card key={post._id}>
              <CutIcon
                onClick={() => {
                  swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this post!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      handleClick(post._id);
                    }
                  });
                }}
              />
              <CardImage src={post.pic} alt="Photo" />
              <CardContainer>
                <h4>{post.title}</h4>
              </CardContainer>
            </Card>
          );
        })
      ) : (
        <FaBan
          style={{ fontSize: "200px", color: "grey", marginLeft: "30%" }}
        />
      )}
    </CardWrapper>
  );
};

export default AllPosts;
