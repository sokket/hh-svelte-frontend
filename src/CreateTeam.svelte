<script>
    import {Button, Input} from 'svelte-chota';
    import {navigate} from 'svelte-routing';

    export let updateProfile;
    let teamName;

    function join(team) {
        return fetch('/api/me', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'team': {
                    'id': team.id
                },
                'role_id': 2 // Manager
            })
        })
    }

    function createTeam() {
        return fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: teamName
            })
        }).then(it => it.json())
    }

    function createTeamAndJoin() {
        createTeam()
            .then(team => join(team))
            .then(() => {
                updateProfile();
                navigate('/', {replace: true});
            })
    }
</script>

<style>
    .form-content {
        max-width: 400px;
        margin: 0 auto;
    }
</style>

<div class="form-content">
    <h4>Новая команда</h4>
    <p><Input placeholder="Название" bind:value={teamName}/></p>
    <Button on:click={createTeamAndJoin}>Создать</Button>
</div>
