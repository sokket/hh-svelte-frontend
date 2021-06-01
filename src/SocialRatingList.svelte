<script>
    import InfiniteLoading from './infinity-scroll/InfiniteLoading.svelte';
    import {marks} from "./utils";

    export let personId;

    let page = 1;
    let list = [];

    function infiniteFeedbackHandler({detail: {loaded, complete}}) {
        fetch(`/api/social_rating?user=${personId}&page=${page}&count=5`)
            .then(response => response.json())
            .then(data => {
                list = [...list, ...data];
                if (data.length === 5) {
                    page += 1;
                    loaded();
                } else {
                    if (data.length !== 0)
                        loaded();
                    complete();
                }
            });
    }
</script>

<style>
    .social-rating {
        padding: 10pt;
        margin: 10pt;
        border: solid #f3f3f3 2px;
        border-radius: 5px;
        user-select: none;
    }

    .social-rating-text {
        white-space: pre-wrap;
    }

    .social-rating-author {
        font-size: 15pt;
    }

    .social-rating-mark {
        flex-shrink: 0;
        height: 0.7em;
        width: 0.7em;
        border-radius: 50%;
        margin-left: 5pt;
    }
</style>

{#each list as item}
    <div class="social-rating">
        <div class="social-rating-author">{item.author.name}</div>
        <div style="display: flex; margin-bottom: 10pt; align-items: center">
            <div>{marks[item.rating - 1].text}</div>
            <div class="social-rating-mark" style="background: {marks[item.rating - 1].color}"></div>
        </div>
        <span class="social-rating-text">{item.comment}</span>
    </div>
{/each}
<InfiniteLoading on:infinite={infiniteFeedbackHandler}/>