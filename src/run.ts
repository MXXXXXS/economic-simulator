import { market, Person } from './person'

function run(workingRatio = 0.8) {
  const farmer = new Person()

  let lifeTime = 1000
  let livingTime = 0

  const states = []

  while (lifeTime > 0 && farmer.assets > 0) {
    const step = 1
    lifeTime -= step

    farmer.living((1 - workingRatio) * step)
    farmer.farming(workingRatio * step)

    livingTime += step
    if (livingTime % 5 === 0) states.push({
      livingTime,
      money: farmer.money,
      assets: farmer.assets
    })
  }

  console.log(states)
  return states as [{
    livingTime: number
    money: number
    assets: number
  }]
}
export default run