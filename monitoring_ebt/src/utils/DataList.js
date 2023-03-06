import { fPerKilo } from "./formatNumber"
import { fTimeHour } from "./formatTime"

export function LIST_POWER(list) {
    var listBaru = []
    // if (list.length != 288){
    for (let i = 0; i < list.length; i++) {
        listBaru.push(list[i])
    }
    // }
    return (
        listBaru
        // list = [
        //     list[70], list[71], list[72], list[73], list[74], list[75], list[76], list[77], list[78], list[79], list[80], list[81],
        //     list[82], list[83], list[84], list[85], list[86], list[87], list[88], list[89], list[90], list[91], list[92], list[93],
        //     list[94], list[95], list[96], list[97], list[98], list[99], list[100], list[101], list[102], list[103], list[104], list[105],
        //     list[106], list[107], list[108], list[109], list[110], list[111], list[112], list[113], list[114], list[115], list[116], list[117],
        //     list[118], list[119], list[120], list[121], list[122], list[123], list[124], list[125], list[126], list[127], list[128], list[129],
        //     list[130], list[131], list[132], list[133], list[134], list[135], list[136], list[137], list[138], list[139], list[140], list[141],
        //     list[142], list[143], list[144], list[145], list[146], list[147], list[148], list[149], list[150], list[151], list[152], list[153],
        //     list[154], list[155], list[156], list[157], list[158], list[159], list[160], list[161], list[162], list[163], list[164], list[165],
        //     list[166], list[167], list[168], list[169], list[170], list[171], list[172], list[173], list[174], list[175], list[176], list[177],
        //     list[178], list[179], list[180], list[181], list[182], list[183], list[184], list[185], list[186], list[187], list[188], list[189],
        //     list[190], list[191], list[192], list[193], list[194], list[195], list[196], list[197], list[198], list[199], list[200], list[201],
        //     list[202], list[203], list[204], list[205], list[206], list[207], list[208], list[209], list[210], list[211], list[212], list[213],
        //     list[214], list[215], list[216], list[217], list[218], list[219], list[220],
        // ]
    )
}


export function LIST_TIMEHOUR(list){
    var listBaru = []
    for (let i = 0; i < list.length; i++) {
        listBaru.push(fTimeHour(list[i]))
    }
    // }
    return (
        listBaru)
}


export function LIST_KILO(list) {
    var listBaru = []
    for (let i = 0; i < list.length; i++) {
        listBaru.push(fPerKilo(list[i]))
    }
  return (
    listBaru
  )
}

export function LIST_INKREMEN5(list) {
    var listBaru = []
    for (let i = 0; i < list.length; i+5) {
        listBaru.push(fPerKilo(list[i]))
    }
  return (
    listBaru
  )
}

export function LIST_DayaPerLuasan(list) {
    var listBaru = []
    const panjang_mm = 1956
    const lebar_mm = 990
    const luas_mm2 = panjang_mm*lebar_mm
    const luas_m2 = luas_mm2/1000000
    const jumlah_pv = 3
    const luasTotal = jumlah_pv*luas_m2
    for (let i = 0; i < list.length; i++) {
        listBaru.push((list[i])/(luasTotal))
    }
  return (
    listBaru
  )
}

export function LIST_EFISIENSI(listA, listB) {
    var listBaru = []
    for (let i = 0; i < listA.length; i++) {
        let raw = listB[i] / listA[i]
        listBaru.push(raw * 100)
    }
    return (
        listBaru
      )
}

