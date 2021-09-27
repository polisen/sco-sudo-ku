# Sudoku Thingy.

This project is a simple sudoku app with many problems.

It's written in javascript and typescript, displayed in react and the back end are google cloud functions.

- React
- Typescript
- Firebase Functions

If you have firebase emulators - you can run those and test the app locally. You will need a firebase project config id and provide it to the firebase setup in src/app/firebase.ts. I realize that I probably should have thought about your testing ability for this but my thinking is that you might just read the code. I can wrap it up into a pure express app and push that as a docker container if you want. I used a boilerplate that I had a one-click config with for conveniece. That's also why redux is there. 

I wrote the functions in javascript because the firebase emulator setup script doesn't play nicely with create-react-app when choosing typecript in the functions and I had little time.

## Excuses

The UI is a little bit flawed as my hacky solution to the choice validation is to only allow the right answer - I should really make that a two-part process where you can insert any valid number but if you get stuck you can check where it's wrong. But I'm 12 hours in.

I also should have commited the code more often in a more atomized way.

The sudoku solving code is a backtracking algorithm that I basically stole - but only after independently figuring out that this was probably the way to go. I have this running commentary of my planning for this written down in notion and here's a link for those interested:

https://light-brook-fae.notion.site/Zecco-Sudoku-Solver-847e72dd5d5347ae8c122e2039af98ad

The rest however is built by me, as you can tell by the, let's say creative optimisation strategies.

A great example of that is the quadrant checking system - I generate a complete board every time. That's really stupid.

Some of the utility functions such as the array shuffler I totally copy and pasted - but a solid 80% of re-inventing the wheel I think is pretty good.

If you have any questions please email me at fredrik@megatech.ltd

Thank you for your interest :)

### Testing

There are some unit tests in the functions folder

`cd functions`

`npm test`









