<script>
    import { authenticateUser } from '../../../utils/auth';
    import { goto } from '$app/navigation';
    
    let formErrors = {}
    let alertMessage = ''

    async function logInUser (evt) {
        
        evt.preventDefault()

        const userData = {
            email : evt.target['email'].value,
            password : evt.target['password'].value,
        }
        const res = await authenticateUser(userData.email, userData.password);
  
        if (res.success) {
          goto('/');
        } else {
          alertMessage = 'Please check your email and password'
        }
    }

</script>

{#if alertMessage}
<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 py-3 shadow-md flex justify-center" role="alert">
  <div class="flex">
    <div class="py-1">
      <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
    </div>
    <div>
      <p class="font-bold text-center">Log In Failed</p>
      <p class="text-sm text-center">{alertMessage}</p>
    </div>
  </div>
</div>
{/if}

<div class = "container mx-auto px-4 py-10">
    <h1 class ="text-center text-xl">Log in</h1>
    <div class="flex justify-center items-center mt-8">
        <form on:submit={logInUser} class="w-1/3">
            <div class="form-control w-full">
                <label class="label" for="email">
                    <span class="text">Email</span>
                </label>
                <input type="text" name="email" placeholder="johndoe" class="input input-bordered w-full"  required />
                {#if 'email' in formErrors}
                <label class="label" for="email">
                    <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
                </label>
                {/if}
            </div>
    
            <div class="form-control w-full">
                <label class="label" for="password">
                    <span class="text">Password</span>
                </label>
                <input type="password" name="password" placeholder="" class="input input-bordered w-full" autocomplete = "current-password"  required />
                {#if 'password' in formErrors}
                <label class="label" for="password">
                    <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                </label>
                {/if}
            </div>
    
            <div class="form-control w-full mt-4">
                <button class="btn btn-md">Log In</button>
            </div>
        </form>
    </div>
</div>
