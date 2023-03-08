import { fPerKilo } from "./formatNumber"
import { fTimeHour } from "./formatTime"

export function LIST_POWER(list) {
    const listBaru = []
    for (let i = 0; i < list.length; i++) {
        listBaru.push(list[i])
    }
    return (
        listBaru
    )
}


export function LIST_TIMEHOUR(list){
    const listBaru = []
    for (let i = 0; i < list.length; i++) {
        listBaru.push(fTimeHour(list[i]))
    }
    return (
        listBaru)
}


export function LIST_KILO(list) {
    const listBaru = []
    for (let i = 0; i < list.length; i++) {
        listBaru.push(fPerKilo(list[i]))
    }
  return (
    listBaru
  )
}

export function LIST_INKREMEN5(list) {
    const listBaru = []
    for (let i = 0; i < list.length; i+5) {
        listBaru.push(fPerKilo(list[i]))
    }
  return (
    listBaru
  )
}

export function LIST_DayaPerLuasan(list) {
    const listBaru = []
    const panjang_mm = 1956
    const lebar_mm = 990
    const luas_mm2 = panjang_mm*lebar_mm
    const luas_m2 = luas_mm2/1000000
    const jumlah_pv = 3
    const luasTotal = jumlah_pv*luas_m2
    for (let i = 0; i < list.length; i++) {
        listBaru.push((list[i])*(luasTotal))
    }
  return (
    listBaru
  )
}

export function LIST_EFISIENSI(listA, listB) {
    const listBaru = []
    for (let i = 0; i < listA.length; i++) {
        let raw = listA[i] / listB[i]
        listBaru.push(raw * 100)
    }
    return (
        listBaru
      )
}

