<script lang="ts">
	import "bootstrap/dist/css/bootstrap.min.css";
	import NavBar from "./Navbar.svelte";
	import OfficeLayout from "./OfficeLayout.svelte";
	import Today from "./Today.svelte";
	import Weekday from "./Weekday.svelte";
	import { onMount } from "svelte";
	import { info, isAdmin } from "../ts/store";
	import { invoke } from "@tauri-apps/api/core";
	export let menu: number = 1;
	let config: boolean = true;
	const set_menu_items = () => {
		return [
			{ label: "Today", id: 1 },
			{ label: "Week", id: 2 },
			{ label: "Office Layout", id: 3 },
		];
	};
	const set_menu_enroller = () => {
		return [{ label: "Enroller", id: 1 }];
	};
	const set_menu_admin = () => {
		return [
			{ label: "Today", id: 1 },
			{ label: "Week", id: 2 },
			{ label: "Office Layout", id: 3 },
			{ label: "Create Ressources", id: 4 },
			{ label: "Edit Ressources", id: 5 },
		];
	};
</script>

<!-- MENNU BAR ON TOP -->
<NavBar navItems={set_menu_items()} bind:menu />

{#if menu === 1}
	<Today />
{:else if menu === 2}
	<Weekday />
{:else if menu === 3}
	<OfficeLayout />
{:else}
	<h2>Page Not Found or Completed Yet</h2>
{/if}

<style>
</style>
