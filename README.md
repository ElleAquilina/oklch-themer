# oklch-tailwind
Web app to convert HEX to OKLCH colors and TailwindCSS templates.

## Libraries Used
- Vite: Base application
- Typescript/ESLint/Prettier: Dev tools
- Vitest: Testing
- Zod: Validation
- Jotai: State management
- TailwindCSS: Styling
- Culori : Color spaces, conversions, and manipulations
- PrismJS : Code highlighter

## TODO

- [x] (Color Card) Round the random color value when page is loaded
- [x] (Color Card) Add percentage value for luminosity instead of decimal
- [x] (Color Card) Add alpha channel
- [ ] (Color Card) Add checkered background to canvas
- [ ] (Color Card) Add linear gradients representing each range input
- [ ] (Color Card) Add hotkeys to input fields (luminosity (l), chroma (c), hue (h), alpha (a))
- [ ] (Color Card) Add '+' / '-' to sides of input fields when selected
- [x] (Styling) Install component library (new Daisy?) & style components
- [x] (Styling) Switch toggle to grey scale themes
- [ ] (List Card) Add list of color capabilities (expand...)
- [ ] (Code Card) Add code capabilities based on list of colors (expand...)

# Stretch Goals
- Add more colour formats to convert to
- Add i18N & L10N
- Add import/export functionality
