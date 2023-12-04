 function check_Anime_Concentration(methord, birthday_input_id) {

            if (methord == 0 && (birthday_input_id == "birthday")) {


                finalFloats = []

                document.getElementById("outPut_queryFloat").innerHTML = ''
                let maxFloat = document.getElementById("maxFloat").value
                let minFloat = document.getElementById("minFloat").value
                let wantedFloat = document.getElementById(birthday_input_id).value.replace('-', '').replace('-', '')
                let similarity = document.getElementById("similarity").value
                myfloat_single_test(wantedFloat, minFloat, maxFloat, similarity)


            } else if (methord == 0 && birthday_input_id == "wantedFloat") {


                finalFloats = []
                document.getElementById("outPut_queryFloat").innerHTML = ''
                let maxFloat = document.getElementById("maxFloat").value
                let minFloat = document.getElementById("minFloat").value
                let wantedFloat = document.getElementById("wantedFloat").value.replace('-', '').replace('-', '')
                let similarity = document.getElementById("similarity").value
                myfloat_single_test(wantedFloat, minFloat, maxFloat, similarity)


            } else if (methord == 1 && (birthday_input_id == "generateAvailabe")) {
             
                for(let grade of    ['industry','mil-spec',"restricted",'classfied','classfied',"covert"]){
                    document.getElementById(grade).innerHTML=' '
 
               } 
                finalItems = []

                finalFloats = []


                var tempFloats_arr = floatsCollect(defaultJson)

                let wantedFloat = document.getElementById(birthday_input_id).value.replace('-', '').replace('-', '')

           /*      console.log(wantedFloat) */


                for (let dig = 8; dig < 12; dig++) {
                    var similarity = 8
                    let ieee32_wanted = getIeee754_32(wantedFloat / (10 ** dig))
                    if (String(ieee32_wanted * 10 ** dig).substr(0, similarity) == wantedFloat) {
                        let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
                        testDig(dig, averFloat)
                        finalFloats[dig] = (`${ieee32_wanted}可做：`)
                    } else if (String(ieee32_wanted * 10 ** dig).substr(0, similarity) > wantedFloat) {
                        let temp_ieee32_wanted = ieee32_wanted
                        let num = 1
                        while (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) > wantedFloat &&  String((temp_ieee32_wanted * 10 ** dig)).substr(0, similarity) != wantedFloat) {
                            num++
                            temp_ieee32_wanted = temp_ieee32_wanted - num / (10 ** dig)
                        }
                        if (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) == wantedFloat) {
                            let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
                            testDig(dig, averFloat)
                            /* finalFloats[dig] = (`${temp_ieee32_wanted}可做：`) */
                            finalFloats[dig] = (`${getIeee754_32(temp_ieee32_wanted)}可做：`)
                        } else {
                            finalFloats[dig] = (`磨损：  ${wantedFloat / (10 ** dig)}  不存在，相似磨损为 ${ieee32_wanted} </br>`)
                        }
                    } else {
                        let temp_ieee32_wanted = ieee32_wanted
                        let num = 1
                        while (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) < wantedFloat &&  String((temp_ieee32_wanted * 10 ** dig)).substr(0, similarity) != wantedFloat) {
                            num++
                            temp_ieee32_wanted = temp_ieee32_wanted + num / (10 ** dig)
                        }
                        if (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) == wantedFloat) {

                            let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
                            testDig(dig, averFloat)


                            /* finalFloats[dig] = (`${temp_ieee32_wanted}可做：`) */
                            finalFloats[dig] = (`${getIeee754_32(temp_ieee32_wanted)}可做：`)
                            console.log(`${temp_ieee32_wanted}可做：`,wantedFloat,String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) )
                        } else {
                            finalFloats[dig] = (`磨损：  ${wantedFloat / (10 ** dig)}  不存在，相似磨损为 ${ieee32_wanted} </br>`)

                        }
                    }

                    console.log(finalFloats)
                    var availableFloatsArr = finalItems[dig]
                    /*                   console.log("availableFloatsArr")
                                       console.log(availableFloatsArr) */
                    if (availableFloatsArr == undefined) { continue }
                    for (let grades in defaultJson) {

                        if (grades == '工业级') {

                            document.getElementById('industry').innerHTML += (`<br /><span>${finalFloats[dig]}<span>`)

                        } else if (grades == '军规级') {
                            document.getElementById('mil-spec').innerHTML += (`<br /><span>${finalFloats[dig]}<span>`)
                        } else if (grades == "受限级") {
                            document.getElementById("restricted").innerHTML += (`<br /><span>${finalFloats[dig]}<span>`)
                        } else if (grades == '保密级') {
                            document.getElementById('classfied').innerHTML += (`<br /><span>${finalFloats[dig]}<span>`)
                        } else if (grades == "隐秘级") {
                            document.getElementById("covert").innerHTML += (`<br /><span>${finalFloats[dig]}<span>`)
                        }
                    }

                    for (let grades in defaultJson) {
                        console.log(grades)
                        for (let floats in defaultJson[grades]) {
                            /*   console.log(floats) */
                          /*   console.log(availableFloatsArr, grades, dig) */

                            if (in_arry(floats, availableFloatsArr) && grades == '工业级') {

                                document.getElementById('industry').innerHTML += (`<span>${defaultJson[grades][floats]}、</span>`)

                            } else if (in_arry(floats, availableFloatsArr) && grades == '军规级') {
                                document.getElementById('mil-spec').innerHTML += (`<span>${defaultJson[grades][floats]}、</span>`)
                            } else if (in_arry(floats, availableFloatsArr) && grades == "受限级") {
                                document.getElementById("restricted").innerHTML += (`<span>${defaultJson[grades][floats]}、</span>`)
                            } else if (in_arry(floats, availableFloatsArr) && grades == '保密级') {
                                document.getElementById('classfied').innerHTML += (`<span>${defaultJson[grades][floats]}、</span>`)
                            } else if (in_arry(floats, availableFloatsArr) && grades == "隐秘级") {
                                document.getElementById("covert").innerHTML += (`<span>${defaultJson[grades][floats]}、</span>`)
                            }
                        }

                    }
                 
                }   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                function testDig(dig, averFloat) {
                    var similarity = 8
                    /*     console.log("testDig working")
                        console.log(tempFloats_arr) */
                    let lengthtemp = tempFloats_arr.length
                    /*  console.log(wantedFloat) */


                    finalItems[dig] = myfloatZone_AlltTest(tempFloats_arr, lengthtemp, dig)


                    console.log("testDig finished")
                }



                console.log("generation finished")
            }




            function myfloatZone_AlltTest(tempFloats_arr, lengthtemp, dig) {
                var similarity = 8
               /*  console.log("myfloatZone_AlltTest working") */
                let availableFloatsArr = []
                let wantedFloat = document.getElementById(birthday_input_id).value.replace('-', '').replace('-', '')
                for (let i = 0; i < lengthtemp; i++) {
                    let minFloat = tempFloats_arr[i].split("-")[0]
                    let maxFloat = tempFloats_arr[i].split("-")[1]
                    if ((maxFloat < wantedFloat / (10 ** dig)) || minFloat > wantedFloat / (10 ** dig)) { } else {

                        /*    console.log(minFloat,maxFloat) */
                        ////////////////////////////////////test with final_float and nine_repeate
                        let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat)
                        let nine_floats = nineFloats_repeate(averFloat, dig)

                        let tenAverTrade = tradeUp(getIeee754_32(nine_floats + getIeee754_32(averFloat)), minFloat, maxFloat)
                    /*     console.log(tenAverTrade, dig, similarity)
                        console.log("for") */
                        /*   console.log(dig) */


                        if (String((tenAverTrade * 10 ** dig)).substr(0, similarity) == wantedFloat) {
                            availableFloatsArr.push(tempFloats_arr[i])////////////////////////different code
                         /*    console.log("==") */
                        } else if (String((tenAverTrade * 10 ** dig)).substring(0, similarity) <= wantedFloat) {
                            let simpleTenR_lower = tenAverTrade;
                            let num = 1
                            while (simpleTenR_lower <= wantedFloat / (10 ** dig) && String((simpleTenR_lower * 10 ** dig)).substr(0, similarity) != wantedFloat) {

                                simpleTenR_lower = tradeUp(getIeee754_32(nine_floats + getIeee754_32(averFloat + num / (10 ** dig))), minFloat, maxFloat)
                                num++
                                console.log(simpleTenR_lower.toFixed(16))
                            }
                            if (String((simpleTenR_lower * 10 ** dig)).substr(0, similarity) == wantedFloat) { availableFloatsArr.push(tempFloats_arr[i]) } else { }////////////////////////different code



                        } else {
                            let simpleTenR_greater = tenAverTrade;
                            let num = 1
                            console.log(simpleTenR_greater)

                            while (simpleTenR_greater >= wantedFloat / (10 ** dig) && String((simpleTenR_greater * 10 ** dig)).substr(0, similarity) != wantedFloat) {

                                simpleTenR_greater = tradeUp(getIeee754_32(nine_floats + getIeee754_32(averFloat - num / (10 ** dig))), minFloat, maxFloat)
                                num++
                                console.log(simpleTenR_greater)
                            }
                            if (String((simpleTenR_greater * 10 ** dig)).substr(0, similarity) == wantedFloat) { availableFloatsArr.push(tempFloats_arr[i]) } else { }////////////////////////different code





                        }







                    }
                }
                return availableFloatsArr

            }







            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



            //end if methord == 0





        }//end check_Anime_Concentration

