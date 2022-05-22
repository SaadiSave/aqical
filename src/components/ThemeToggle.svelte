<script lang="ts">
    import { detectTheme, Theme } from "../util"

    let theme = detectTheme()

    const toggle = () => {
        const newTheme = (detectTheme() === Theme.Dark) ? Theme.Light : Theme.Dark
        localStorage.setItem("theme", newTheme)
        document.documentElement.setAttribute("theme", newTheme)
        theme = newTheme
    }
</script>

<div>
    <button on:click={toggle}>
        {#if theme === Theme.Dark}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                 viewBox="0 0 24 24"
                 stroke-width="2" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="4"></circle>
                <path
                    d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
            </svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                 viewBox="0 0 24 24"
                 stroke-width="2" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                    d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
            </svg>
        {/if}
    </button>
</div>

<style>
    div { margin: 1em }

    button {
        font-family: inherit;
        font-size: inherit;
        padding: 1em 1em;
        color: var(--btnText);
        background-color: var(--btn);
        border-radius: 5px;
        border: 2px solid var(--btn);
    }

    button:focus { border: 2px solid var(--btnSecondary) }

    button:active { background-color: var(--btnActive) }

    svg { stroke: #e1e1db }
</style>
