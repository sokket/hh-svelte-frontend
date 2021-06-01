<script>
    import {Tab, Tabs} from 'svelte-chota';
    import {getRoleName} from "./utils";
    import FeedbackList from "./FeedbackList.svelte";
    import SocialRatingList from "./SocialRatingList.svelte";

    export let person;

    function getAllInfo() {
        return fetch('/api/users/' + person.id)
            .then(it => it.json());
    }

    let activeTab = 'feedback';


    function getRatingStr(fullInfo) {
        if (fullInfo.social_rating !== null)
            return parseFloat(fullInfo.social_rating).toFixed(1);
        else
            return '0.0';
    }
</script>

<style>
    .profile-sub-txt {
        color: #797979;
        font-size: 15pt;
        margin-bottom: 15pt;
    }

    .team-name {
        margin-top: 0;
        margin-bottom: 0;
    }

    .user-name {
        font-size: 2em;
        font-weight: 500;
        margin: .35em 0 0;
    }

    .profile-block {
        margin: 20pt;
    }

    .list {
        margin-top: 1pt;
    }
</style>


<div class="profile-block">
    <div class="user-name">{person.first_name + ' ' + person.last_name}</div>
    {#await getAllInfo() then fullInfo}
        <div class="team-name profile-sub-txt">{getRoleName(fullInfo.role_id)} в команде {fullInfo.team?.name}</div>
        <div class="team-name profile-sub-txt">Социальная оценка <b>{getRatingStr(fullInfo)}</b>
        </div>
    {/await}
</div>

<Tabs full bind:active={activeTab}>
    <Tab tabid="feedback" style="width: 30em">Фидбэк</Tab>
    <Tab tabid="socialRating" style="width: 30em">Социальная оценка</Tab>
</Tabs>


<div class="list" style="height: 300pt; overflow: auto">
    {#if activeTab === "feedback"}
        <FeedbackList personId="{person.id}"/>
    {:else}
        <SocialRatingList personId="{person.id}"/>
    {/if}
</div>
