function myfloat_single_test(wantedFloat, minFloat, maxFloat, similarity) {


    //////////////////////////////遍历
    for (let dig = 8; dig < 12; dig++) {
        let ieee32_wanted = ie32(wantedFloat / (10 ** dig))


        if (String(ieee32_wanted * 10 ** dig).substr(0, similarity) == wantedFloat) {
            let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
            test_float(averFloat, dig, minFloat, maxFloat)



        } else if (String(ieee32_wanted * 10 ** dig).substr(0, similarity) > wantedFloat) {
            let temp_ieee32_wanted = ieee32_wanted
            let num = 1
            while (String(ie32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) > wantedFloat  && String(ie32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) != wantedFloat) {
                num++
                temp_ieee32_wanted = temp_ieee32_wanted - num / (10 ** dig)
            }
            if (String(ie32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) == wantedFloat  ) {

                let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
                test_float(averFloat, dig, minFloat, maxFloat)
            } else {
                finalFloats.push(`磨损：  ${wantedFloat / (10 ** dig)}  不存在，相似磨损为 ${ieee32_wanted} </br>`)

            }




        } else {
            let temp_ieee32_wanted = ieee32_wanted
            let num = 1
            while (String(ie32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) < wantedFloat  && String(ie32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) != wantedFloat) {
                num++
                temp_ieee32_wanted = temp_ieee32_wanted + num / (10 ** dig)
            }
            if (String(ie32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) == wantedFloat) {

                let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
                test_float(averFloat, dig, minFloat, maxFloat)

            } else {
                finalFloats.push(`磨损：  ${wantedFloat / (10 ** dig)}  不存在，相似磨损为 ${ieee32_wanted} </br>`)

            }

        }




        function test_float(averFloat, dig, minFloat, maxFloat) {






            let nine_floats = nineFloats_repeate(averFloat, dig)
            console.log(nine_floats,averFloat)
            let tenAverTrade = tradeUp(ie32(nine_floats + ie32(averFloat)), minFloat, maxFloat)
            if (String((tenAverTrade * 10 ** dig)).substring(0, similarity) == wantedFloat) {
                console.log(tenAverTrade,"makeed")
                finalFloats.push(`可做${tenAverTrade}</br>`)

            } else if (String((tenAverTrade * 10 ** dig)).substring(0, similarity) <= wantedFloat) {
                let simpleTenR_lower = tenAverTrade;
                let num = 1
                while (simpleTenR_lower <= wantedFloat / (10 ** dig) && String((simpleTenR_lower * 10 ** dig)).substr(0, similarity) != wantedFloat) {

                    simpleTenR_lower = tradeUp(ie32(nine_floats + ie32(averFloat + num / (10 ** dig))), minFloat, maxFloat)
                    num++
                    console.log(simpleTenR_lower.toFixed(16))
                }
                if (String((simpleTenR_lower * 10 ** dig)).substring(0, similarity) == wantedFloat) { finalFloats.push(`可做${simpleTenR_lower}</br>`) } else { finalFloats.push(`该枪皮 ${wantedFloat / (10 ** dig)} 不可做,相似磨损</br> ${tenAverTrade}  '   or    '  ${simpleTenR_lower}</br> `) }



            } else {
                let simpleTenR_greater = tenAverTrade;
                let num = 1
                console.log(simpleTenR_greater)

                while (simpleTenR_greater >= wantedFloat / (10 ** dig) && String((simpleTenR_greater * 10 ** dig)).substr(0, similarity) != wantedFloat) {

                    simpleTenR_greater = tradeUp(ie32(nine_floats + ie32(averFloat - num / (10 ** dig))), minFloat, maxFloat)
                    num++
                    console.log(simpleTenR_greater)
                }
                if (String((simpleTenR_greater * 10 ** dig)).substring(0, similarity) == wantedFloat) { finalFloats.push(`可做${simpleTenR_greater}</br>`) } else { finalFloats.push(`该枪皮 ${wantedFloat / (10 ** dig)} 不可做,相似磨损</br> ${tenAverTrade}     or     ${simpleTenR_greater}  </br> `) }





            }





        }
    }////第一层for循环结束
    ///////////////////////////////遍历0.2、0.020、0.002、0.0002
    for (let j = 0; j < 4; j++) {
       /*  console.log(finalFloats[j]) */
        document.getElementById("outPut_queryFloat").innerHTML += finalFloats[j] + (`</br>`)
    }


}
