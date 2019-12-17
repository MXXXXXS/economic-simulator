// import { Working, Living, Trading, Products, Comsuming } from './interface'

export const market = {
  // productivity: 2, //money 2 per time
}

export class Person {
  money: number
  assets: number
  productValue: number
  farmingCost: number
  livingCost: number
  productivity: number

  constructor(
    money?: number,
    assets?: number,
    productValue?: number,
    livingCost?: number,
    productivity?: number,
    farmingCost?: number
  ) {
    this.money = money || 100 //已有的金钱
    this.assets = assets || 100 //已有的物质
    this.productivity = productivity || 3 //生产力, 每日生产产品的量
    this.productValue = productValue || 1 //单位产品价值
    this.livingCost = livingCost || 1 //每日生存消耗物质
    this.farmingCost = farmingCost || 0.6 //每日种植金钱成本
  }
  farming = (time: number) => {
    const cost = this.farmingCost * time //消耗金钱
    if (this.money < cost) {
      this.trading((cost - this.money) / this.productValue)
      this.assets -= this.livingCost * time //消耗物质
    }

    this.money -= cost
    this.living(time) //消耗物质

    this.assets += time * this.productivity //增加物质
  }
  living = (time: number) => {
    const cost = this.livingCost * time
    if (this.assets < cost) {
      this.consuming((cost - this.assets) * this.productValue)
    }
    
    this.assets -= this.livingCost * time //消耗物质
  }
  consuming = (cost: number) => {
    if (this.money >= cost) {
      this.assets += cost / this.productValue //增加物质
      this.money -= cost //减少金钱
    }
  }
  trading = (num: number) => {
    if (this.assets > num) {
      this.assets -= num //减少物质
      this.money += num * this.productValue //增加金钱
    }
  }
}