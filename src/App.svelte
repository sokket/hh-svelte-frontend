<script>
    import 'chota';
    import '@fontsource/roboto';
    import {Container} from 'svelte-chota';
    import {link, navigate, Route, Router} from "svelte-routing";
    import CreateTeam from "./CreateTeam.svelte";
    import Home from "./Home.svelte";
    import Landing from "./Landing.svelte";
    import ErrorPage from "./ErrorPage.svelte";
    import Team from "./Team.svelte";
    import Probationers from './Probationers.svelte';

    let authorized = false;
    let hasCommand = false;
    let userRole;

    $: isManager = userRole === 2
    $: isProbationer = userRole === 0

    function getProfilePromise() {
        return fetch("/api/me")
            .then(response => {
                if (response.status !== 200) {
                    navigate('/', {replace: true});
                } else {
                    authorized = true;
                }
                return response.json();
            }).then(it => {
                userRole = it.role_id;
                hasCommand = it.team !== null;
                return it;
            });
    }

    let promise;

    function updateProfile() {
        promise = getProfilePromise();
    }

    function logout() {
        fetch('/api/oauth/logout', {
            method: 'POST'
        });
        window.location = '/';
    }

    updateProfile();
</script>

<style>
    :global(:root) {
        --font-family: "Roboto", sans-serif;
    }

    .nav-container {
        display: flex;
        flex-shrink: 0;
    }

    @media only screen and (max-width : 600px) {
        .nav-item {
            font-size: 14pt;
            padding-left: 5pt;
            padding-right: 5pt;
        }
    }

    @media only screen and (min-width : 601px) {
        .nav-item {
            font-size: 15pt;
            padding-left: 10pt;
            padding-right: 10pt;
        }
    }

    .nav-item {
        padding-top: 10pt;
        padding-bottom: 10pt;
        text-decoration: none;
        color: #6d6d6d;
    }

    .nav-item-exit {
        margin-right: 10pt;
        margin-left: auto;
        cursor: pointer;
    }
</style>

<Router>
    <div style="display: flex; flex-direction: column; height: 100%">
        <div class="nav-container">
            {#if authorized && hasCommand}
                <a href="/" use:link class="nav-item">PES</a>
                {#if !isProbationer}
                    <a href="/probationers" use:link class="nav-item">Соискатели</a>
                {/if}
                {#if isManager}
                    <a href="/team" use:link class="nav-item">Команда</a>
                {/if}
                <div class="nav-item nav-item-exit" on:click={logout}>Выход</div>
            {/if}

        </div>
        <Container style="flex-grow: 1; display: flex; flex-direction: column; overflow: auto">
            <Route path="/createTeam">
                {#if !hasCommand }
                    <CreateTeam updateProfile="{updateProfile}"/>
                {:else}
                    <ErrorPage errorCode="403" errorMessage="Недостаточно прав"/>
                {/if}
            </Route>
            <Route path="/">
                {#await promise then result}
                    <Home user="{result}"/>
                {:catch e}
                    <Landing/>
                {/await}
            </Route>
            <Route path="/team">
                {#if isManager}
                    <Team/>
                {:else}
                    <ErrorPage errorCode="403" errorMessage="Недостаточно прав"/>
                {/if}
            </Route>
            <Route path="/probationers">
                {#if !isProbationer}
                    <Probationers role="{userRole}"/>
                {:else}
                    <ErrorPage errorCode="403" errorMessage="Недостаточно прав"/>
                {/if}
            </Route>
            <Route>
                <ErrorPage errorCode="404" errorMessage="Страницы не существует"/>
            </Route>
        </Container>
    </div>
</Router>
