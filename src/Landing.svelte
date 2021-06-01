<script>
    import {Button} from 'svelte-chota';
</script>

<style>
    @media only screen and (max-width : 600px) {
        .title {
            font-size: 20pt;
        }

        .desc {
            font-size: 15pt;
        }
    }

    @media only screen and (min-width : 601px) {
        .title {
            font-size: 30pt;
        }

        .desc {
            font-size: 20pt;
        }
    }

    .desc {
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
            on:click={() => window.location = "/api/oauth/login"}>Начать
    </Button>
</div>