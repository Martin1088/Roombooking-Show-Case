<script lang="ts">
  import { getOverviewday, setJoins } from "../ts/fetch";
  import {
    loading,
    user,
    wookingDays,
    info,
    responseMrbs,
    type MrbsResponse,
  } from "../ts/store";
  import { DateInput } from "date-picker-svelte";
  import OviewTable from "../components/OviewTable.svelte";
  import HeaderJoinSelect from "../components/HeaderJoinSelect.svelte";
  import today from "../ts/today.json";

  let date: Date = new Date();
  let weekOrDay: boolean = false;
  let startdate = new Date(2023, 1, 1);
  let enddate = new Date(2040, 1, 1);
  let bookingdays: [string];
  let booking_roomid: number;
  let repeat_weeks = 1;
</script>

<div class="bg-danger text-white p-3 text-center">{$info}</div>
<h2 class="text-center my-4">Welcome {$user}</h2>

<div class="d-flex flex-row justify-content-center">
  <DateInput
    min={startdate}
    max={enddate}
    on:select={() => getOverviewday(date)}
    bind:value={date}
  />
</div>

<div class="">
  <div class="">
    <div class="d-flex flex-row">
      {#each today as res}
        <div class="card mx-auto">
          <div class="card-body">
            <h3 class="card-title">{res.area_name}</h3>
            <HeaderJoinSelect {res} cardDate={date.toISOString()} {weekOrDay} />
            <OviewTable {res} {date} {weekOrDay} />
            <div class="mt-4">
              <h2>Book for the next week(s):</h2>
              <label for="allrooms">Rooms</label>
              <select
                class="form-select mb-3"
                name="allrooms"
                id="allrooms"
                bind:value={booking_roomid}
              >
                {#each res.rooms as room}
                  <option value={room.id}>{room.room_name}</option>
                {/each}
              </select>
              <div class="mb-3 d-flex flex-row">
                {#each wookingDays as { name, num }}
                  <div class="form-check form-check-inline">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      {name}
                      id="{name}{res.area_name}"
                      value={num}
                      bind:group={bookingdays}
                    />
                    <label class="form-check-label" for="{name}{res.area_name}"
                      >{name}</label
                    >
                  </div>
                {/each}
                <label class="form-label" for={res.area_name}>
                  Repeating {repeat_weeks} week(s)
                </label>
                <input
                  type="range"
                  class="form-range mb-3"
                  name={res.area_name}
                  min="1"
                  max="15"
                  bind:value={repeat_weeks}
                />
                <button
                  class="btn btn-success"
                  on:click={() =>
                    setJoins(booking_roomid, bookingdays, repeat_weeks)}
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
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
</style>
