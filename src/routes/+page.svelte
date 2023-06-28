<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
  <script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<script>
    import { uploadMedia } from '../utils/s3-uploader.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'
    import { goto } from '$app/navigation';
    import { getUserId } from '../utils/auth.js';
    import { getTokenFromLocalStorage } from '../utils/auth.js';

    export let data;
    let successMsg = false;
    let loading = false;
    let searchTerm = ""
    let items = data.images

    $: searchedImages = items.filter((image) => {
      return image.title.toLowerCase().includes(searchTerm) || image.description.toLowerCase().includes(searchTerm)
    })

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function uploadImage(evt) {
      loading = true
      const token = getTokenFromLocalStorage()
      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
      evt.preventDefault()
      successMsg = true
      

      const imageData = {
          path : fileUrl,
          name : fileName,
          price : parseInt((evt.target['price'].value)*100),
          title : evt.target['title'].value,
          description : evt.target['description'].value,
          sellerId : getUserId()
      };

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/images', {
          method : 'POST',
          mode : 'cors',
          headers: {
              'Content-Type' : 'application/json',
              Authorization : `Bearer ${token}`,
          },
          body: JSON.stringify(imageData)
      });


      if (resp.status == 200) {
        await sleep(2000); 
        successMsg = false
        loading = false
      return {
      success: true,
      }
      
      }
      return {
      success: false,
      }
    }

    async function checkout(id) {
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/checkout', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})

      });
      const res = await resp.json();
        goto(res)

    }
  </script>

<!-- Upload button -->
<div class = "container mx-auto p-7">
  <button class="btn btn-secondary" onclick="uploadImage.showModal()">Upload Image</button>
  <input type="text" placeholder="Search" class="input input-bordered input-secondary w-full max-w-xs" bind:value={searchTerm}/>
</div>

<!-- upload dialog box -->
<dialog id="uploadImage" class="modal" >
  <form on:submit|preventDefault={uploadImage} method="dialog" class="modal-box container mx-auto">
    <input type="file" name="file" class="file-input file-input-bordered file-input-secondary w-full" />
    <div class="form-control w-full">
      <div>
        <label for ="price" class="label">
          <span class="label-text">Price</span>
        </label>
          <input type="text" name = "price" placeholder=" " class="input input-bordered w-full" />
        <label for ="currency" class="label">
          <span class="label-text-alt">USD</span>
        </label>
      </div>
      <div>
        <label for = "title" class="label">
          <span class="label-text">Title</span>
        </label>
        <input type="text" name = "title" placeholder=" " class="input input-bordered w-full" />
      </div>
      <div>
        <label for="description" class="label">
          <span class="label-text">Description</span>
        </label>
        <textarea class="textarea textarea-bordered h-24 w-full" name="description" placeholder=" "></textarea>
      </div>
    </div>
    <button on:click = {loading}   class ="btn btn-block btn-secondary">
      {#if loading}
      <span class="loading loading-bars loading-lg"></span>
      {/if}

      {#if successMsg}
      <div class="toast toast-center">
        <div class="alert alert-success">
          <span>Upload successfully.</span>
        </div>
      </div>
      {/if}
      Upload
    </button>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

<!-- load the images -->
<div class="overflow-y-auto grid grid-rows-1 lg:grid-cols-3 gap-5 container mx-auto p-7 ">
  {#each searchedImages as image}
  <div class="card h-100 glass w-96 bg-base-100 shadow-xl hover:scale-105 transition ease-in-out delay-150">
    <figure class = "h-80"><img src={image.path} alt="something suppose to be here" /></figure>
    <div class="card-body">
      <h2 class="card-title">{image.title}</h2>
      <p>{image.description}</p>
      <div class="card-actions justify-end">
        <p>USD {((image.price)/100).toFixed(2)}</p>
        <form action=" ">
        <button class="btn btn-primary glass" type = "submit" on:click={checkout(image.id)}>Buy Now</button>
        </form>
      </div>
    </div>
  </div>
{/each}
</div>
