<script>
    function getTasks() {
        return fetch('/api/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((it) => it.json())
    }

    let tasksPromise = getTasks();

    export let status;

    export function refreshList() {
        tasksPromise = getTasks();
    }
</script>

<style>
    .task {
        margin: 10pt;
        padding: 10pt;
        border: solid #f3f3f3 2px;
        border-radius: 5px;
    }
    .task-title {
        font-size: 16pt;
    }
</style>

{#await tasksPromise.then(it => it.filter(x => x.status === status))}
{:then result}
    {#each result as task}
        <div class="task">
            <div class="task-title">{task.title}</div>
        </div>
    {/each}
{/await}