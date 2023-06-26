<script>
    import { loading } from 'svelte-loading-spinners';
    
    export function spinner() {
      return loading({
        color: '#FF3E00',
        size: 60,
      });
    }

    // function createSpinner() {
    //     // loading({
    //     // color: '#FF3E00',
    //     // size: 60,
    //     // });
    //     const {subscribe, set} = writable(false);

    //     return {
    //         subscribe,
    //         spinnerOn: () => set(true),
    //         spinnerOff: () => set(false)
    //     }
    // }

    // export const spinner = createSpinner();

</script>

{#if loading}
<span class="loading loading-spinner"></span>
{/if}