<script lang="ts">
    import logo from "./assets/svelte.png"
    import Counter from "./components/Counter.svelte"
    import ThemeToggle from "./components/ThemeToggle.svelte"
</script>

<main>
    <img src={logo} alt="Svelte Logo"/>
    <h1>Hello Typescript!</h1>

    <Counter/>

    <ThemeToggle/>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
        background: var(--bg);
    }

    img {
        height: 16rem;
        width: 16rem;
    }

    h1 {
        color: var(--text);
        text-transform: uppercase;
        font-size: 4rem;
        font-weight: 100;
        line-height: 1.1;
        margin: 2rem auto;
        max-width: 14rem;
    }

    @media (min-width: 480px) {
        h1 {
            max-width: none;
        }
    }
</style>
