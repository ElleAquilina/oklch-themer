# oklch-tailwind
Web app to convert HEX to OKLCH colors and TailwindCSS templates.

## Libraries Used
- Vite: Base application
- Typescript/ESLint/Prettier: Dev tools
- Vitest: Testing
- Zod: Validation
- Jotai: State management
- TailwindCSS: Styling
- DaisyUI: Styled components using tailwind classes
- Culori : Color spaces, conversions, and manipulations
- Shiki: Syntax highlighter

## TODO

- [x] (Color Card) Round the random color value when page is loaded
- [x] (Color Card) Add percentage value for luminosity instead of decimal
- [x] (Color Card) Add alpha channel
- [ ] (Color Card) Add checkered background to canvas
- [x] (Color Card) Add linear gradients representing each range input
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
- Add range of colors with X steps (similar to tailwind default from X-50 to X-900 color ranges)

# Notes
### Why are the individual color channels (ex, canvas, input, etc.) not in reusable components?
When I first started this, I split up each cavas, range input, and text input into individual components that took in the channel name. When I did this, I quickly realised that if there was any deviation from an individual channel, it became pretty difficult to shoehorn in those specific details. 

I also started overengineering it- what if I want to do different color types (RGB, etc)? I overgeneralized it, and eventually
I was using useImperativeHandle and more just to get a canvas to work- and I still needed
to add code to the components implmeneting it!

I eventually decided it was much easier to maintain (as much as I hate duplication) as separate implementations instead of complexity for complexity's sake.
