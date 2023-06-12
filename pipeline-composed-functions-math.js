const createArray = (n) => {
  console.log('composed functions math: n = ', n)
  return [...Array(n)].map((value) => Math.floor(Math.random() * 100))
}
// const source = createArray(100)
// const source = createArray(1_000)
// const source = createArray(10_000)
// const source = createArray(100_000)
const source = createArray(1_000_000)

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)

function multiplyBy2(value) {
  return value * 2
}

function subtract75(value) {
  return value - 75
}

function add43(value) {
  return value + 83
}

function divideBy2Rounded(value) {
  return Math.floor(value / 2)
}

function piExponent(value) {
  return Math.pow(value, Math.PI)
}

function sqrt(value) {
  return Math.sqrt(value)
}

function cos(value) {
  return Math.cos(value)
}

function randomPow(value) {
  return Math.pow(Math.random())
}

console.time('classic for-loop')

const result1 = []

for (i = 0; i < source.length; i++) {
  result1.push(
    pipe(
      multiplyBy2,
      subtract75,
      add43,
      divideBy2Rounded,
      piExponent,
      sqrt,
      cos,
      randomPow
    )(source[i])
  )
}

console.timeEnd('classic for-loop')

console.time('for-of for-loop')

const result2 = []

for (let element of source) {
  result2.push(
    pipe(
      multiplyBy2,
      subtract75,
      add43,
      divideBy2Rounded,
      piExponent,
      sqrt,
      cos,
      randomPow
    )(element)
  )
}

console.timeEnd('for-of for-loop')

console.time('forEach for-loop')

const result3 = []

source.forEach((element) =>
  result3.push(
    pipe(
      multiplyBy2,
      subtract75,
      add43,
      divideBy2Rounded,
      piExponent,
      sqrt,
      cos,
      randomPow
    )(element)
  )
)

console.timeEnd('forEach for-loop')

console.time('map')

const result4 = source.map((element) =>
  pipe(
    multiplyBy2,
    subtract75,
    add43,
    divideBy2Rounded,
    piExponent,
    sqrt,
    cos,
    randomPow
  )(element)
)

console.timeEnd('map')

console.time('chain')

const result5 = source
  .map(multiplyBy2)
  .map(subtract75)
  .map(add43)
  .map(divideBy2Rounded)
  .map(piExponent)
  .map(sqrt)
  .map(cos)
  .map(randomPow)

console.timeEnd('chain')

console.time('iterator')

const result6 = []

const iterator = source[Symbol.iterator]()
let iteratorContent = iterator.next()

while (!iteratorContent.done) {
  result6.push(
    pipe(
      multiplyBy2,
      subtract75,
      add43,
      divideBy2Rounded,
      piExponent,
      sqrt,
      cos,
      randomPow
    )(iteratorContent.value)
  )
  iteratorContent = iterator.next()
}

console.timeEnd('iterator')
