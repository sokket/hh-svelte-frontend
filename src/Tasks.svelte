<script>
    import VirtualList from '@sveltejs/svelte-virtual-list';

    export let status;
    export let openTask;

    function getTasks(currentStatus) {
        return fetch('/api/tasks?status=' + currentStatus, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((it) => it.json())
    }

    let promise;
    $: promise = getTasks(status);

    export function refreshList() {
        promise = getTasks(status);
    }

</script>

<style>
    .task {
        margin: 15pt 10pt 0;
        padding: 10pt;
        border: solid #f3f3f3 2px;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
    }

    .task-title {
        font-size: 16pt;
    }

    .task-not-found {
        text-align: center;
        padding: 30pt;
        margin: 0 auto;
    }
</style>

{#await promise then result}
    {#if result.length === 0}
        <div class="task-not-found">Нет задач</div>
    {:else }
        <VirtualList items={result} let:item>
            <div class="task" on:click={() => openTask(item.id)}>
                <div class="task-title">{item.title}</div>
                <div class="person-name">{item.performer}</div>
                <div class="person-name">{item.probationer}</div>
            </div>
        </VirtualList>
    {/if}
{/await}

