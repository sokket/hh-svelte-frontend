<script>
    import {Button} from 'svelte-chota';
    import {link} from "svelte-routing";
</script>

<style>
    .not-found-container {
        margin: 0 auto;
        text-align: center;
        width: min-content;
        font-family: "Roboto", serif;
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
    <div class="not-found-code">404</div>
    <div class="not-found-text">Страницы не существует</div>
    <a href="/" use:link>
        <Button outline>Вернуться на главную</Button>
    </a>
</div>
