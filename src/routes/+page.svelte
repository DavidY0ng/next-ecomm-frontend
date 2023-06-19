<h1>Welcome to SvelteKit</h1>

<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <input type="file" class="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
    <div class="form-control w-full max-w-xs">
      <div>
        <label class="label">
          <span class="label-text">Price</span>
        </label>
          <input type="text" placeholder=" " class="input input-bordered w-full max-w-xs" />
        <label class="label">
          <span class="label-text-alt">USD</span>
        </label>
      </div>
      <div>
        <label class="label">
          <span class="label-text">Title</span>
        </label>
        <input type="text" placeholder=" " class="input input-bordered w-full max-w-xs" />
      </div>
      <div>
        <label class="label">
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