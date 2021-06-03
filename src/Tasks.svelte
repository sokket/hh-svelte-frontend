<script>
    import InfiniteLoading from './infinity-scroll/InfiniteLoading.svelte';

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

    let unique = {};

    export function refreshList() {
        list = [];
        page = 1;
        unique = {};
    }

    function changeList(s) {
        refreshList();
    }

    $: {
        changeList(status)
    }

    let page = 1;
    let list = [];

    function infiniteHandler({detail: {loaded, complete}}) {
        fetch(`/api/tasks?status=${status}&page=${page}&count=5`)
            .then(response => response.json())
            .then(data => {
                list = [...list, ...data];
                if (data.length === 5) {
                    page += 1;
                    loaded();
                } else {
                    if (data.length !== 0)
                        loaded();
                    complete();
                }
            });
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

    .tasks-wrapper {
        overflow: auto;
    }
</style>


<div class="tasks-wrapper">
    {#key unique}
        {#each list as item}
            <div class="task" on:click={() => openTask(item.id)}>
                <div class="task-title">{item.title}</div>
                <div class="person-name">{item.performer}</div>
                <div class="person-name">{item.probationer}</div>
            </div>
        {/each}
        <InfiniteLoading on:infinite={infiniteHandler}/>
    {/key}
</div>

