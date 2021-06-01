<script>
    import {Button, Card, Modal, Tab, Tabs} from 'svelte-chota';
    import {navigate} from 'svelte-routing';
    import CreateJoinLink from './CreateJoinLink.svelte';
    import CreateTask from "./CreateTask.svelte";
    import Tasks from "./Tasks.svelte";
    import Task from "./Task.svelte";

    export let user;

    if (user.team === null) {
        navigate('/createTeam', {replace: true})
    }

    function getRoleName(roleId) {
        switch (roleId) {
            case 0:
                return 'На испытательном сроке'
            case 1:
                return 'Сотрудник'
            case 2:
                return 'Менеджер'
        }
    }

    function closeNewTaskAndRefreshTasksList() {
        newTaskModalOpened = false;
        tasks.refreshList();
    }

    function openTask(id) {
        openedTaskId = id;
        taskModalOpened = true;
    }

    let inviteLinkModalOpened = false;
    let newTaskModalOpened = false;
    let taskModalOpened = false;

    let openedTaskId;

    let tasksActiveTab = 'TODO';
    let tasks;
</script>

<style>
    .team-name {
        margin-top: 0;
        color: #797979;
        font-size: 15pt;
        margin-bottom: 15pt;
    }

    .user-name {
        font-size: 2em;
        font-weight: 500;
        margin: .35em 0 0;
    }

    .profile-block {
        margin: 20pt;
    }
</style>


<div class="profile-block">
    <div class="user-name">{user.first_name + ' ' + user.last_name}</div>
    <div class="team-name">{getRoleName(user.role_id)} в команде {user.team?.name}</div>
    {#if user.role_id === 2}
        <Button outline style="margin-right: 10pt" on:click={() => newTaskModalOpened = true}>Создать задачу</Button>
        <Button outline style="margin: 0" on:click={() => inviteLinkModalOpened = true}>Пригласить в команду</Button>
    {/if}
</div>

<Modal style="width: 40%" bind:open={newTaskModalOpened}>
    <Card>
        <CreateTask closeAndRefresh="{closeNewTaskAndRefreshTasksList}"/>
    </Card>
</Modal>

<Modal bind:open={inviteLinkModalOpened}>
    <Card>
        <CreateJoinLink/>
    </Card>
</Modal>

<Modal style="width: 60%" bind:open={taskModalOpened}>
    <Card>
        <Task taskId="{openedTaskId}" personRole="{user.role_id}" refreshTasks="{() => tasks.refreshList()}"/>
    </Card>
</Modal>

<Tabs full bind:active={tasksActiveTab}>
    <Tab tabid="TODO" style="width: 30em">В очереди</Tab>
    <Tab tabid="IN_PROGRESS" style="width: 30em">В работе</Tab>
    <Tab tabid="DONE" style="width: 30em">Готово</Tab>
</Tabs>

<Tasks bind:this={tasks} status="{tasksActiveTab}" openTask="{openTask}"/>
