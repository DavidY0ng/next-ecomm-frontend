<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<script>
    import { uploadMedia } from '../utils/s3-uploader.js';
  
    async function uploadImage(evt) {
      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
      // code to make POST request to your backend
    }
  </script>

<h1>Welcome to SvelteKit</h1>

<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
<div class = "container">
    
</div>
  <form on:submit|preventDefault={uploadImage} method="dialog" class="modal-box">
    <input type="file" name="file" class="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
    <div class="form-control w-full max-w-xs">
      <div>
        <label for ="price" class="label">
          <span class="label-text">Price</span>
        </label>
          <input type="text" placeholder=" " class="input input-bordered w-full max-w-xs" />
        <label for ="currency" class="label">
          <span class="label-text-alt">USD</span>
        </label>
      </div>
      <div>
        <label for = "title" class="label">
          <span class="label-text">Title</span>
        </label>
        <input type="text" placeholder=" " class="input input-bordered w-full max-w-xs" />
      </div>
      <div>
        <label for = "description" class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
      </div>
    </div>
    <button class="btn btn-block btn-secondary">Upload</button>
  </form>

  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
