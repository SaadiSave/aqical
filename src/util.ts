export const enum Theme {
    Dark = "dark",
    Light = "light"
}
export function detectTheme(): Theme {
    let theme = localStorage.getItem("theme")

    switch (theme) {
        case Theme.Dark:
        case Theme.Light:
            return theme
        default:
            if (window.matchMedia) {
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    return Theme.Dark
                }
                else return Theme.Light
            } else return Theme.Light
    }
}
