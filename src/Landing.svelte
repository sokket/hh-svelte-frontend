<script>
    import {Button} from 'svelte-chota';
</script>

<style>
    .title {
        font-family: "Roboto", serif;
        font-size: 36pt;
    }

    .desc {
        font-family: Roboto, serif;
        font-size: 20pt;
        margin-bottom: 20pt;
        color: #797979;
    }

    .landing-container {
        padding: 30pt;
        margin: 0;
        position: absolute;
        top: 40%;
        -ms-transform: translateY(-40%);
        transform: translateY(-40%);
    }
</style>

<div class="landing-container">
    <div class="title">Правильно оценим испытательный срок</div>
    <div class="desc">Организуем задачи, соберём фидбэк и оценки</div>
    <Button style="font-size: 15pt" outline
            on:click={() => window.location = "/api/dev/oauth?url=http://127.0.0.1:3000/createTeam"}>Начать
    </Button>
</div>