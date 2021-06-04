<script>
    import {getPersons, getRoleName} from "./utils";
</script>

<style>
    .person {
        width: 100%;
        max-width: 400pt;
        margin: 5pt auto;
        padding: 10pt;
        border: solid #f3f3f3 2px;
        border-radius: 5px;
        user-select: none;
    }

    .person-name {
        font-size: 16pt;
        margin-right: 15pt;
    }
</style>

{#await getPersons('performers') then performers}
    {#each performers as item}
        <div class="person">
            <div class="person-name">{item.last_name} {item.first_name}</div>
            <div>{getRoleName(item.role_id)}</div>
        </div>
    {/each}
{/await}
