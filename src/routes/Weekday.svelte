<script lang="ts">
  import { onMount } from "svelte";
  import { getOverviewweek } from "../ts/fetch";
  import { responseMrbs, info, type WeekData } from "../ts/store";
  import { DateInput } from "date-picker-svelte";
  import today from "../ts/today.json";
  import OviewTable from "../components/OviewTable.svelte";
  import HeaderJoinSelect from "../components/HeaderJoinSelect.svelte";

  let date: Date = new Date();
  let weekOrDay: boolean = true;
  let startdate = new Date(2023, 1, 1);
  let enddate = new Date(2040, 1, 1);
  let select_areas: string;

  const exampleWeekResponse: WeekData[] = [
    { date: "2025-02-05", weekday: "Monday", areas: today },
    { date: "2025-02-06", weekday: "Tuesday", areas: today },
    { date: "2025-02-07", weekday: "Wednesday", areas: today },
    { date: "2025-02-08", weekday: "Thursday", areas: today },
    { date: "2025-02-09", weekday: "Friday", areas: today },
  ];

  onMount(() => {});
</script>

<h3 class="text-center my-4">Week</h3>
<div class="bg-danger text-white p-3 text-center">{$info}</div>

<div class="d-flex glex-row justify-content-center">
  <DateInput
    min={startdate}
    max={enddate}
    on:select={() => getOverviewweek(date)}
    bind:value={date}
  />
</div>

<div class="form-group mb-3">
  <label for="allarea" class="form-label">Offices</label>
  <select
    class="form-select"
    name="allarea"
    id="allarea"
    bind:value={select_areas}
  >
    {#each today as a}
      <option value={a.area_name}>{a.area_name}</option>
    {/each}
  </select>
</div>

<div class="container">
  <div class="d-flex flex-row">
    {#each exampleWeekResponse as week}
      {#each week.areas as res}
        {#if select_areas === res.area_name}
          <div class="card mx-auto">
            <div class="card-body">
              <h3 class="card-title">
                {week.weekday}
                {week.date.slice(0, 10)}
              </h3>
              <HeaderJoinSelect {res} cardDate={week.date} {weekOrDay} />

              <OviewTable {res} {date} {weekOrDay} />
            </div>
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style>
</style>
