# oklch-themer
A web app to create oklch color themes.

## Libraries Used
- Vite
- Typescript/ESLint/Prettier: Dev tools
- Vitest: Testing
- Zod: Validation
- Jotai: State management
- TailwindCSS: Styling
- DaisyUI: Component library
- Culori : Color spaces, conversions, and manipulations

## How to Locally Start
- Clone the repository
- From the repository, run ```npm run dev```

# Notes
### Why are the individual color channels (ex, canvas, input, etc.) not in reusable components?
When I first started this, I split up each canvas, range input, and text input into individual components that took in the channel name. When I did this, I quickly realised that if there was any deviation from an individual channel, it became pretty difficult to shoehorn in those specific details. 

I also started overengineering it- what if I want to do different color types (RGB, etc)? Eventually
I was using ```useImperativeHandle``` and more just to get a canvas to work- and I still needed
to add code to the components implementing it!

I decided it was much easier to maintain (as much as I hate duplication) seperate canvases instead of
complexity for complexity's sake.
