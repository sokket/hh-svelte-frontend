<script>
    import {Button} from 'svelte-chota';
    import {getRoleName} from './utils.js';

    const baseUrl = 'http://192.168.14.62:3000/api/invite_links/';

    let selected = -1;
    let link = null;

    function createLink() {
        fetch('/api/invite_links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role_id: selected
            })
        })
            .then(it => it.json())
            .then(it => link = it)
    }

    /* function getLinks() {
         return fetch('/api/invite_links', {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         }).then(it => it.json())
     }

     let links = getLinks();*/
    let linkElem;
</script>

<style>
    .role-text {
        margin-bottom: 10pt;
    }
</style>


{#if link === null}
    <h4>Создать ссылку-приглашение</h4>

    <select bind:value={selected}>
        <option disabled selected>Выберите роль</option>
        <option value="2">Менеджер</option>
        <option value="1">Сотрудник</option>
        <option value="0">Испытуемый</option>
    </select>

    <Button outline disabled={selected === -1} on:click={createLink}>Создать</Button>

{:else }
    <h4>Ссылка создана</h4>
    <div class="role-text">Роль: {getRoleName(link.role_id)}</div>
    <input bind:this={linkElem} class="link-box" id="input" type="text"
           value="{baseUrl + link.code}"/>
    <div>
        <Button outline on:click={() => {
                            linkElem.select()
                            document.execCommand("copy")
                        }}>Копировать
        </Button>
    </div>
{/if}
