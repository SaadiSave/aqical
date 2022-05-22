<script lang="ts">
    let count: number = 0
    const increment = () => {
        count += 1
    }

    const decrement = () => {
        if (count !== 0) count -= 1
    }
</script>

<div>
    <button on:click={increment}>Increment</button>
    <h1 style="color: var(--text)">{count}</h1>
    <button on:click={decrement}>Decrement</button>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
    }

    button {
        margin: 1em;
        font-family: inherit;
        font-size: inherit;
        padding: 1em 2em;
        color: var(--btnText);
        background-color: var(--btn);
        border-radius: 5px;
        border: 2px solid var(--btn);
        width: 200px;
    }

    button:focus { border: 2px solid var(--btnSecondary) }

    button:active { background-color: var(--btnActive) }
</style>
