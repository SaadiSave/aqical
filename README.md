# Air Quality Calculation Suite
## Covers the following air quality indices</h2>
* European Air Quality Index
* Indian National Air Quality Index

## Usage
### Python
### TypeScript
#### Initialisation
```typescript
/* Accepted keys in the first array for pd: 'pm2', 'pm10', 'so2', 'no2', 'co', 'o3'
Remember that the length of both arrays should be equal*/
let pd = new dict(['pm2', 'pm10', ...], [78.5, 39.2, ...])

// European Air Quality Index (EU)
const x = new Eaqi(pd)

// National Air Quality Index (India)
const x = new Naqi(pd)

// Custom index made during the research
const x = new Mmaqi(pd)
```
#### Setting Values
```typescript
// result
x.setres()
// description
x.setdes()
// colour
x.setcol()
```
#### Getting Values
Value | Type
----- | ----
res | string
col | string
des | string
```typescript
// result
x.res
// description
x.des
// colour
x.col
```

<br>

*This program is orignally written for a High School research project. Therefore, the functionality of the program may or may not be extended*
