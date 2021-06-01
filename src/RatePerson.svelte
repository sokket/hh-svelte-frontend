<script>
    import {Button} from 'svelte-chota';
    import autosize from 'autosize';
    import {marks} from "./utils";

    export let person;
    export let closeModal;

    let selectedIndex = -1;

    let comment = '';

    function rate() {
        return fetch('/api/users/' + person.id + '/feedback', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'comment': comment,
                'social_rating': selectedIndex + 1
            })
        }).then(it => closeModal());
    }

    function getRate() {
        return fetch('/api/users/' + person.id + '/feedback')
            .then(it => it.json())
            .then(it => {
                selectedIndex = it.social_rating - 1;
                comment = it.comment;
            })
            .catch(exception => {
            });
    }

    getRate();
</script>

<style>
    .rate-container {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .rate-person-name {
        font-size: 15pt;
        margin-bottom: 10pt;
    }

    .mark {
        min-width: 250pt;
        margin: 5pt;
        padding: 5pt;
        border: solid 1px;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
    }

    .text-field {
        margin-top: 10pt;
        margin-bottom: 20pt;
        max-width: 300pt;
        max-height: 150pt;
        overflow: hidden;
        resize: none;
        min-height: 10pt;
        background: #FFFFFF;
        color: #1d1d1d;
    }
</style>

<div class="rate-container">
    <h3 style="margin-bottom: 5pt">Социальная оценка соискателя</h3>
    <div class="rate-person-name">{person.last_name} {person.first_name}</div>
    {#each marks as mark, index}
        <div class="mark"
             style="border-color: {mark.color}; background: {selectedIndex === index ? '#bfbfbf' : '#ffffff'}"
             on:click={() => selectedIndex = index}>
            {mark.text}
        </div>
    {/each}
    <textarea class="text-field" use:autosize
              placeholder="Комментарий к оценке (обязателен)" bind:value={comment}></textarea>
    <Button outline
            disabled="{selectedIndex === -1 || comment.length === 0}"
            on:click={rate}
    >Отправить оценку
    </Button>
</div>

