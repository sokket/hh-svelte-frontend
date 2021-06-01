<script>
    import InfiniteLoading from './infinity-scroll/InfiniteLoading.svelte';

    export let personId;

    let feedbackPage = 1;
    let feedbackList = [];
    let feedbackItemHeight = {};

    function infiniteFeedbackHandler({detail: {loaded, complete}}) {
        fetch(`/api/feedback?user=${personId}&page=${feedbackPage}&count=5`)
            .then(response => response.json())
            .then(data => {
                let filteredData = data.filter(it => it.text.length !== 0);
                feedbackList = [...feedbackList, ...filteredData];
                if (data.length === 5) {
                    feedbackPage += 1;
                    loaded();
                } else {
                    if (filteredData.length !== 0)
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

    .social-rating-task {
        margin-bottom: 10pt;
    }
</style>

{#each feedbackList as item}
    <div class="social-rating">
        <div class="social-rating-author">{item.author.name}</div>
        <div class="social-rating-task">{item.task.title}</div>
        <span class="social-rating-text">{item.text}</span>
    </div>
{/each}
<InfiniteLoading on:infinite={infiniteFeedbackHandler}/>