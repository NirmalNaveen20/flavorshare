import React, { useState } from 'react';
import "./Demo.css"

function PostModal({ onClose, onSubmit }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);


  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ caption, image });
  };

  return (
    <div className="">
     
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#postModal">
  Create new post
</button>


<div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="postModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="postModalLabel">Create new post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="caption">Caption:</label>
            <textarea class="form-control" id="caption" name="caption" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="image">Choose an image:</label>
            <input type="file" class="form-control-file" id="image" name="image"/>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Post</button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default PostModal;
