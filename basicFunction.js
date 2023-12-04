function getIeee754_32(number) {
    let temp_array = new Float32Array([number])
    return temp_array[0]
}
function ie32(number){    //缩写
      return getIeee754_32(number)
}

 function tradeUp(totalFloat, minFloat, maxFloat) {
    let tradeUpResult = ie32(        ie32(     ie32(totalFloat)/ ie32(10))   *   ie32(   ie32(maxFloat) - ie32(minFloat))) + ie32(minFloat)
        
        return ie32(tradeUpResult) 
                         
                                                                                                       
}

 
/* let tenCaculate_value = ie32(0)
var myItems = document.getElementsByClassName("solo_input")
for (let item of myItems) {
    if (tenCaculate_value == ie32(0)){
        tenCaculate_value = ie32(tenCaculate_value + ie32(item.value))
    }else{
        tenCaculate_value = ie32(ie32(tenCaculate_value + ie32(item.value))/ie32(2))
    }

    
}
let minFloat = document.getElementById("minFloat").value
let maxFloat = document.getElementById("maxFloat").value
let tradeUpResult = ie32(        ie32(     ie32(tenCaculate_value)*   ie32(ie32(maxFloat) - ie32(minFloat)))) + ie32(minFloat)
tradeUpResult   
  */















function nineFloats_repeate(averFloat, dig) {
    let finalFloat = 0.00
    for (let i = 0; i < 9; i++) {
        finalFloat = ie32(finalFloat + ie32(averFloat))
    }
    return finalFloat
}

/* function tradeUp(totalFloat, minFloat, maxFloat) {
    let tradeUpResult = ie32(ie32(ie32(totalFloat) / ie32(10)) * (ie32(maxFloat) - ie32(minFloat)) + ie32(minFloat))
    return tradeUpResult
} */








/////计算10简单结果
function caculte_myFloat(methord) {
    var myItems = document.getElementsByClassName("solo_input")
    if (methord == 0) {
        
        let tenCaculate_value = ie32(0)
        for (let item of myItems) {
            tenCaculate_value = ie32(tenCaculate_value + ie32(item.value))
        }
        document.getElementById('tenCaculate_value').value = ie32(tenCaculate_value / ie32(10))
    } else if (methord == 1) {
        let tenCaculate_value = ie32(0)
        for (let item of myItems) {
            tenCaculate_value = ie32(tenCaculate_value + ie32(item.value))
        }
        let minFloat = document.getElementById("minFloat").value
        let maxFloat = document.getElementById("maxFloat").value
        
        document.getElementById('tenCaculate_Trade').value = tradeUp(tenCaculate_value, minFloat, maxFloat)

    } else { }


}

function floatsCollect(defaultJson) {


    let floats_list = []



    for (let grades in defaultJson) {

        for (let floats in defaultJson[grades]) {
            if (!(in_arry(floats, floats_list))) {
                floats_list.push(floats)

            }
        }
    }


    return (floats_list)



}
function in_arry(item, arry) {
    for (let i of arry) {
        if (item == i) { return true }
    }
    return false
}
function changed(){
    
    caculte_myFloat(1)
    caculte_myFloat(0)
}
