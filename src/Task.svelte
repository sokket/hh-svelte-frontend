<script>
    import {Button, Col, Row} from 'svelte-chota';
    import {getPersons, getRoleName} from "./utils";
    import autosize from 'autosize';

    export let taskId;
    export let personRole;
    export let refreshTasks;

    let isManager = personRole === 2;
    let isProbationer = personRole === 0;

    let originalTask;
    let title;
    let description;
    let status;
    let probationerId;
    let performerId;
    let feedbackForManager;
    let feedbackForProbationer;

    let taskLoaded = false;

    $: modified =
        taskLoaded && (
        originalTask.title !== title ||
        originalTask.description !== description ||
        originalTask.feedback_for_manager !== feedbackForManager ||
        originalTask.feedback_for_probationer !== feedbackForProbationer);


    function updateState(it, forceUpdate) {
        originalTask = it;
        status = it.status;
        probationerId = it.probationer.id;
        performerId = it.performer.id;
        if (forceUpdate || !modified) {
            title = it.title;
            description = it.description;
            feedbackForManager = it.feedback_for_manager;
            feedbackForProbationer = it.feedback_for_probationer;
        }
        taskLoaded = true;
    }

    function uploadTask() {
        fetch('/api/tasks/' + originalTask.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(originalTask)
        })
            .then(it => it.json())
            .then(it => {
                updateState(it, false);
                refreshTasks();
            });
    }

    function updateTaskText() {
        originalTask.title = title;
        originalTask.description = description;
        originalTask.feedback_for_manager = feedbackForManager;
        originalTask.feedback_for_probationer = feedbackForProbationer;
        uploadTask();
    }

    function updateTaskValues() {
        originalTask.status = status;
        originalTask.probationer.id = probationerId;
        originalTask.performer.id = performerId;
        uploadTask();
    }

    function cancel() {
        updateState(originalTask, true);
    }

    function getTask() {
        return fetch('/api/tasks/' + taskId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(it => it.json())
            .then(it => updateState(it, true));
    }

    getTask();
</script>

<style>
    .text-field {
        overflow: hidden;
        resize: none;
        min-height: 10pt;
        background: #FFFFFF;
        color: #1d1d1d;
    }

    .text-block {
        margin-bottom: 10pt;
        white-space: pre-wrap;
    }

    .label {
        margin: 5pt 5pt 3pt 0;
        font-size: 14pt;
        color: #343434;
    }
</style>

{#if taskLoaded}
    <Row reverse>
        <Col>
            <div class="label">Статус</div>
            <select bind:value={status} on:blur={updateTaskValues} disabled={isProbationer}>
                <option value="TODO">В очереди</option>
                <option value="IN_PROGRESS">В работе</option>
                <option value="DONE">Готово</option>
            </select>
            {#if isManager}
                <div class="label">Исполнитель</div>
                {#await getPersons('performers') then performers}
                    <select bind:value={performerId} on:blur={updateTaskValues}>
                        {#each performers as performer}
                            <option value="{performer.id}">{performer.last_name} {performer.first_name}
                                ({getRoleName(performer.role_id)})
                            </option>
                        {/each}
                    </select>
                {/await}
                <div class="label">Соискатель</div>
                {#await getPersons('probationers') then probationers}
                    <select bind:value={probationerId} on:blur={updateTaskValues}>
                        {#each probationers as probationer}
                            <option value="{probationer.id}">{probationer.last_name} {probationer.first_name}</option>
                        {/each}
                    </select>
                {/await}
            {:else}
                <div class="label">Исполнитель</div>
                <select disabled>
                    <option>{originalTask.performer.last_name} {originalTask.performer.first_name}
                        ({getRoleName(originalTask.performer.role_id)})
                    </option>
                </select>
                <div class="label">Соискатель</div>
                <select disabled>
                    <option>{originalTask.probationer.last_name} {originalTask.probationer.first_name}</option>
                </select>
            {/if}
        </Col>
        <Col>
            <div style="max-height: 300pt; overflow: auto; padding-right: 10pt">
                <div class="label">Название</div>
                {#if isManager}
                    <textarea class="text-field" rows="1" placeholder="Название" bind:value={title}></textarea>
                {:else}
                    <div class="text-block">
                        {title}
                    </div>
                {/if}
                <div class="label">Описание</div>
                {#if isManager}
                <textarea class="text-field" use:autosize
                          placeholder="Описание" bind:value={description}></textarea>
                {:else}
                    <div class="text-block">
                        {description}
                    </div>
                {/if}
                {#if !isProbationer}
                    <div class="label">Фидбэк для менеджера</div>
                    <textarea use:autosize class="text-field"
                              placeholder="Фидбэк" bind:value={feedbackForManager}></textarea>
                {/if}
                <div class="label">Фидбэк для соискателя</div>
                {#if !isProbationer}
                <textarea use:autosize class="text-field"
                          placeholder="Фидбэк" bind:value={feedbackForProbationer}></textarea>
                {:else}
                    <div class="text-block">
                        {feedbackForProbationer}
                    </div>
                {/if}
            </div>
            {#if modified}
                <Button primary on:click={updateTaskText} style="margin-top: 10pt">Сохранить</Button>
                <Button outline on:click={cancel} style="margin-top: 10pt">Отмена</Button>
            {/if}
        </Col>
    </Row>
{/if}