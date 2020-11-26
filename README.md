# Air Quality Calculation Suite
## Covers the following air quality indices</h2>
* European Air Quality Index
* Indian National Air Quality Index

## Usage
### Python
#### Initialisation
```python
# Accepted keys for pd: 'pm2', 'pm10', 'so2', 'no2', 'co', 'o3'
pd = {'pm2' : 78.5, 'pm10' : 39.2, ...}

# European Air Quality Index (EU)
x = Eaqi(pd)

# National Air Quality Index (India)
x = Naqi(pd)

# Custom index made during the research
x = Mmaqi(pd)
```
#### Setting Values
```python
# result
x.set_res()
# description
x.set_des()
# colour
x.set_col()
```
#### Getting Values
Value | Type
----- | ----
res | string
col | string
des | string
```python
# result
x.res
# description
x.des
# colour
x.col
```
#### Other features
##### Compare
```python
# used to compare two values
# returns percentage by which b is less than a
compare((aval, amax),(bval, bmax))
```
##### Convert
```python
# returns conversion to µg/m³
# pollutant can have unit of ppm, ppb or µg/m³
# Accepted pollutants: 'so2', 'no2', 'co', 'o3'
convert('so2', 27.9, ppb)
```
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
#### Other features
##### Compare
```typescript
// used to compare two values
// returns percentage by which b is less than a
compare([aval, amax],[bval, bmax])
```
##### Convert
```typescript
// returns conversion to µg/m³
// pollutant can have unit of ppm, ppb or µg/m³
// Accepted pollutants: 'so2', 'no2', 'co', 'o3'
convert('so2', 27.9, ppb)
```

<br>

*This program is orignally written for a High School research project. Therefore, the functionality of the program may or may not be extended*
