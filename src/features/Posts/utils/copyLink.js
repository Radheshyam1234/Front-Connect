export const copyLink = ({ post }) => {
  navigator.clipboard
    .writeText(
      `${window.location.origin}/${post.postedBy.userName}/${post._id}`
    )
    .then(
      function () {
        alert("copied successfully!");
      },
      function (err) {
        alert("Failed to copy");
      }
    );
};
