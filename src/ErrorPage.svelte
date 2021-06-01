<script>
    import {Button} from 'svelte-chota';
    import {link, navigate} from "svelte-routing";

    export let errorCode;
    export let errorMessage;
</script>

<style>
    .not-found-container {
        margin: 0 auto;
        text-align: center;
        width: min-content;
    }

    .not-found-code {
        font-size: 60pt;
    }

    .not-found-text {
        width: max-content;
        font-size: 20pt;
        margin-bottom: 15pt;
    }
</style>


<div class="not-found-container">
    <div class="not-found-code">{errorCode}</div>
    <div class="not-found-text">{errorMessage}</div>
    <a href="/" use:link>
        <Button outline>Вернуться на главную</Button>
    </a>
</div>
