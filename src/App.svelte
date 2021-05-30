<script>
    import 'chota';
    import {Container} from 'svelte-chota';
    import {link, navigate, Route, Router} from "svelte-routing";
    import CreateTeam from "./CreateTeam.svelte";
    import Home from "./Home.svelte";
    import Landing from "./Landing.svelte";
    import NotFound from "./NotFound.svelte";
    import Team from "./Team.svelte";

    let authorized = false;

    function getProfilePromise() {
        return fetch("/api/me")
            .then(response => {
                if (response.status !== 200) {
                    navigate('/', {replace: true});
                } else {
                    authorized = true;
                }
                return response.json();
            });
    }

    let promise;

    function updateProfile() {
        promise = getProfilePromise();
    }

    updateProfile();
</script>

<style>
    .nav-container {
        display: flex;
    }

    .nav-item {
        text-decoration: none;
        padding: 10pt;
        font-size: 16pt;
        font-family: Roboto, serif;
        color: #6d6d6d;
    }
</style>

<Router>
    <div class="nav-container">
        {#if authorized}
            <a href="/" use:link class="nav-item">PES</a>
            <a href="/probationers" use:link class="nav-item">Испытуемые</a>
            <a href="/team" use:link class="nav-item">Команда</a>
        {/if}
    </div>
    <Container>
        <Route path="/createTeam">
            <CreateTeam updateProfile="{updateProfile}"/>
        </Route>
        <Route path="/">
            {#await promise}
            {:then result}
                <Home user="{result}"/>
            {:catch e}
                <Landing/>
            {/await}
        </Route>
        <Route path="/team">
            <Team/>
        </Route>
        <Route component="{NotFound}"/>
    </Container>
</Router>
