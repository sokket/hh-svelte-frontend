<script>
    import VirtualList from '@sveltejs/svelte-virtual-list';
    import {Button, Card, Modal} from 'svelte-chota';
    import {getPersons} from "./utils";
    import RatePerson from "./RatePerson.svelte";
    import Probationer from "./Probationer.svelte";

    let socialRatingModalOpened = false;
    let probationerModalOpened = false;

    export let role;
    let person;

    function openSocialRating(item) {
        person = item;
        socialRatingModalOpened = true;
    }

    function isManager() {
        return role === 2;
    }

    function openProbationer(item) {
        if (isManager()) {
            person = item;
            probationerModalOpened = true;
        }
    }
</script>

<style>
    .person {
        max-width: 400pt;
        margin: 5pt auto;
        padding: 10pt;
        border: solid #f3f3f3 2px;
        border-radius: 5px;
        user-select: none;
        display: flex;
        align-items: center;
    }

    .person-name {
        font-size: 16pt;
        flex: 1;
    }
</style>

<Modal style="width: 40%" bind:open={socialRatingModalOpened}>
    <Card>
        <RatePerson person="{person}" closeModal="{() => socialRatingModalOpened = false}"/>
    </Card>
</Modal>

<Modal style="width: 40%" bind:open={probationerModalOpened}>
    <Card>
        <Probationer person="{person}"/>
    </Card>
</Modal>

{#await getPersons('probationers') then probationers}
    <VirtualList items={probationers} let:item>
        <div class="person">
            <div class="person-name" on:click={() => openProbationer(item)}
                 style="cursor: {isManager() ? 'pointer' : 'default'}">{item.last_name} {item.first_name}</div>
            <Button outline style="margin: 0" on:click={() => openSocialRating(item)}>Оценка</Button>
        </div>
    </VirtualList>
{/await}
