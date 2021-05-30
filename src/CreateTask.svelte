<script>
    import {Button, Input} from 'svelte-chota';
    import {getRoleName} from './utils.js';

    export let closeAndRefresh;

    let taskTitle = '';
    let taskDescription = '';
    let selectedProbationer = -1;
    let selectedPerformer = -1;

    function getPersons(type) {
        return fetch('/api/' + type, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(it => it.json())
    }

    function createTask() {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'performer_id': selectedPerformer,
                'probationer_id': selectedProbationer,
                'title': taskTitle,
                'description': taskDescription
            })
        })
            .then((it) => {
                closeAndRefresh();
            })
    }


    $: isBtnDisabled =
        taskTitle.length < 3
        || selectedPerformer === -1
        || selectedProbationer === -1
</script>

<h4>Создать задачу</h4>

<p><Input bind:value={taskTitle} placeholder="Название задачи"/></p>

<select bind:value={selectedPerformer}>
    <option disabled selected>Исполнитель</option>
    {#await getPersons('performers')}
    {:then performers}
        {#each performers as performer}
            <option value="{performer.id}">{performer.last_name} {performer.first_name}
                ({getRoleName(performer.role_id)})
            </option>
        {/each}
    {/await}
</select>

<select bind:value={selectedProbationer}>
    <option disabled selected>Соискатель</option>
    {#await getPersons('probationers')}
    {:then probationers}
        {#each probationers as probationer}
            <option value="{probationer.id}">{probationer.last_name} {probationer.first_name}</option>
        {/each}
    {/await}
</select>

<p><Input bind:value={taskDescription} textarea placeholder="Описание задачи"/></p>

<Button outline disabled={isBtnDisabled} on:click={createTask}>Создать</Button>