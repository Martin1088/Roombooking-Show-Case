<script lang="ts">
  import { deleteJoin, getName } from "../ts/fetch";
  import { isAdmin, loading } from "../ts/store";

  export let res;
  export let weekOrDay: boolean;
  export let date;
</script>

<div class="table-responsive-lg">
  <table class="table table-bordered">
    <thead class="table-light">
      <tr>
        <th>Room</th>
        <th>Participants</th>
      </tr>
    </thead>
    <tbody>
      {#each res.rooms as room}
        <tr>
          <td
            >{room.room_name}
            {room.description}
            {#if isAdmin && room.entry_id == null}
              𐄂
            {:else}
              ✔
            {/if}
          </td>
          <td>
            {#each room.participants as p}
              <div class="d-flex justify-content-between align-items-center">
                {getName(p.username)}
              </div>
              <button
                class="btn btn-sm btn-danger ms-2"
                on:click={() => deleteJoin(p.id, date, weekOrDay)}
                disabled={$loading}
              >
                {#if $loading}
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                {:else}
                  Delete
                {/if}
              </button>
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
