<script lang="ts">
  import { getNameBeam, setJoin } from "../ts/fetch";
  import { info, isAdmin, loading, users, type Room } from "../ts/store";
  let select_room: Room;
  let other_user: String | null = null;
  function handleCardDate(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;
    const isoDate: string | null = button.getAttribute("data-date");
    if (isoDate !== null) {
      let date: string = isoDate;
      setJoin(
        select_room.id,
        select_room.entry_id,
        new Date(date),
        weekOrDay,
        other_user,
      );
    } else {
      info.set("No valide Date");
    }
  }
  export let res;
  export let cardDate: string;
  export let weekOrDay: boolean;
</script>

<div class="form-group mb-3">
  <label for="allrooms" class="form-label">Rooms</label>
  <select
    class="form-select"
    name="allrooms"
    id="allroooms"
    bind:value={select_room}
  >
    <option value={null}>Select a room</option>
    {#each res.rooms as room}
      <option value={room}>{room.room_name} {room.description}</option>
    {/each}
  </select>
</div>
<div class="form-group mb-3">
  <label for="allrooms" class="form-label">Workspace user(Optional)</label>
  {#if false}
    <input
      type="text"
      id="optionuser"
      name="optionuser"
      placeholder="Only to join as other user"
      bind:value={other_user}
    />
    <div id="usernameHelp" class="form-text">Best practice</div>
  {:else}
    <select
      class="form-select"
      name="allusers"
      id="allusers"
      bind:value={other_user}
    >
      <option value={null} selected>You</option>
      {#each $users as beam_user}
        <option value={getNameBeam(beam_user)}>{getNameBeam(beam_user)}</option>
      {/each}
    </select>
    <div id="usernameHelp" class="form-text">Select another user if needed</div>
  {/if}
</div>
<button
  class="btn btn-primary mb-3"
  type="submit"
  data-date={cardDate}
  on:click={handleCardDate}
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
    Join Room
  {/if}
</button>
