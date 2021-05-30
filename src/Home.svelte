<script>
    import {Button, Card, Modal, Tab, Tabs, Row, Col} from 'svelte-chota';
    import {navigate} from 'svelte-routing';
    import CreateJoinLink from './CreateJoinLink.svelte';
    import CreateTeam from "./CreateTeam.svelte";
    import CreateTask from "./CreateTask.svelte";
    import Tasks from "./Tasks.svelte";

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
        tasksToDo.refreshList();
        tasksInProgress.refreshList();
        tasksDone.refreshList();
    }

    let inviteLinkModalOpened = false;
    let newTaskModalOpened = false;

    let tasksToDo;
    let tasksInProgress;
    let tasksDone;
</script>

<style>
    .team-name {
        margin-top: 0;
        color: #797979;
    }

    .user-name {
        margin-bottom: 0;
    }

    .profile-block {
        margin: 20pt;
    }

    .task-status-header {
        font-size: 14pt;
        margin: 10pt;
    }
</style>

<div class="profile-block">
    <h1 class="user-name">{user.first_name + ' ' + user.last_name}</h1>
    <h4 class="team-name">{getRoleName(user.role_id)} в команде {user.team?.name}</h4>
    {#if user.role_id === 2}
        <Button outline on:click={() => newTaskModalOpened = true}>Создать задачу</Button>
        <Button outline on:click={() => inviteLinkModalOpened = true}>Пригласить в команду</Button>
    {/if}
</div>

<Modal bind:open={newTaskModalOpened}>
    <Card>
        <CreateTask closeAndRefresh="{closeNewTaskAndRefreshTasksList}"/>
    </Card>
</Modal>

<Modal bind:open={inviteLinkModalOpened}>
    <Card>
        <CreateJoinLink/>
    </Card>
</Modal>

<Row>
    <Col>
        <div class="task-status-header">В очереди</div>
        <Tasks bind:this={tasksToDo} status="TODO"/>
    </Col>
    <Col>
        <div class="task-status-header">В работе</div>
        <Tasks bind:this={tasksInProgress} status="IN_PROGRESS"/>
    </Col>
    <Col>
        <div class="task-status-header">Готово</div>
        <Tasks bind:this={tasksDone} status="DONE"/>
    </Col>
</Row>

