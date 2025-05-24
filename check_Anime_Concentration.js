function check_Anime_Concentration(methord, birthday_input_id, grade = null) {
  if (methord == 0 && (birthday_input_id == "birthday")) {
    finalFloats = [];
    document.getElementById("outPut_queryFloat").innerHTML = '';
    let maxFloat = document.getElementById("maxFloat").value;
    let minFloat = document.getElementById("minFloat").value;
    let wantedFloat = document.getElementById(birthday_input_id).value.replace('-', '').replace('-', '');
    let similarity = document.getElementById("similarity").value;
    myfloat_single_test(wantedFloat, minFloat, maxFloat, similarity);
  } else if (methord == 0 && birthday_input_id == "wantedFloat") {
    finalFloats = [];
    document.getElementById("outPut_queryFloat").innerHTML = '';
    let maxFloat = document.getElementById("maxFloat").value;
    let minFloat = document.getElementById("minFloat").value;
    let wantedFloat = document.getElementById("wantedFloat").value.replace('-', '').replace('-', '');
    let similarity = document.getElementById("similarity").value;
    myfloat_single_test(wantedFloat, minFloat, maxFloat, similarity);
  } else if (methord == 1 && (birthday_input_id == "generateAvailabe")) {

    // 如果没有指定级别，清空所有级别
    if (!grade) {
      for(let g of ['industry','mil-spec',"restricted",'classfied',"covert"]){
        document.getElementById(g).innerHTML = '';
      }
    }

    finalItems = [];
    finalFloats = [];

    var tempFloats_arr = floatsCollect(defaultJson);
    let wantedFloat = document.getElementById(birthday_input_id).value.replace('-', '').replace('-', '');

    let minFloat = document.getElementById("minFloat").value;
    let maxFloat = document.getElementById("maxFloat").value;

    for (let dig = 8; dig < 11; dig++) {
      var similarity = 8;
      let ieee32_wanted = getIeee754_32(wantedFloat / (10 ** dig));
      
      if (String(ieee32_wanted * 10 ** dig).substr(0, similarity) == wantedFloat) {
        let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat);
        testDig(dig, averFloat, tempFloats_arr, birthday_input_id);  // 传入 birthday_input_id
        finalFloats[dig] = (`${ieee32_wanted}可做：`);
      } else if (String(ieee32_wanted * 10 ** dig).substr(0, similarity) > wantedFloat) {
        let temp_ieee32_wanted = ieee32_wanted;
        let num = 1;
        while (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) > wantedFloat &&
               String((temp_ieee32_wanted * 10 ** dig)).substr(0, similarity) != wantedFloat) {
          num++;
          temp_ieee32_wanted = temp_ieee32_wanted - num / (10 ** dig);
        }
        if (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) == wantedFloat) {
          let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat);
          testDig(dig, averFloat, tempFloats_arr, birthday_input_id);  // 传入 birthday_input_id
          finalFloats[dig] = (`${getIeee754_32(temp_ieee32_wanted)}可做：`);
        } else {
          finalFloats[dig] = (`磨损：  ${wantedFloat / (10 ** dig)}  不存在，相似磨损为 ${ieee32_wanted} </br>`);
        }
      } else {
        let temp_ieee32_wanted = ieee32_wanted;
        let num = 1;
        while (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) < wantedFloat &&
               String((temp_ieee32_wanted * 10 ** dig)).substr(0, similarity) != wantedFloat) {
          num++;
          temp_ieee32_wanted = temp_ieee32_wanted + num / (10 ** dig);
        }
        if (String(getIeee754_32(temp_ieee32_wanted) * 10 ** dig).substr(0, similarity) == wantedFloat) {
          let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat);
          testDig(dig, averFloat, tempFloats_arr, birthday_input_id);  // 传入 birthday_input_id
          finalFloats[dig] = (`${getIeee754_32(temp_ieee32_wanted)}可做：`);
        } else {
          finalFloats[dig] = (`磨损：  ${wantedFloat / (10 ** dig)}  不存在，相似磨损为 ${ieee32_wanted} </br>`);
        }
      }

      var availableFloatsArr = finalItems[dig];
      if (availableFloatsArr == undefined) { continue; }

      if (grade) {
        updateGradeContent(grade, defaultJson, availableFloatsArr, finalFloats[dig]);
      } else {
        for (let grades in defaultJson) {
          let gradeId = '';
          if (grades == '工业级') gradeId = 'industry';
          else if (grades == '军规级') gradeId = 'mil-spec';
          else if (grades == '受限级') gradeId = 'restricted';
          else if (grades == '保密级') gradeId = 'classfied';
          else if (grades == '隐秘级') gradeId = 'covert';

          if (gradeId) {
            document.getElementById(gradeId).innerHTML += (`<br /><span>${finalFloats[dig]}<span>`);
          }
        }

        for (let grades in defaultJson) {
          let gradeId = '';
          if (grades == '工业级') gradeId = 'industry';
          else if (grades == '军规级') gradeId = 'mil-spec';
          else if (grades == '受限级') gradeId = 'restricted';
          else if (grades == '保密级') gradeId = 'classfied';
          else if (grades == '隐秘级') gradeId = 'covert';

          for (let floats in defaultJson[grades]) {
            if (in_arry(floats, availableFloatsArr) && gradeId) {
              document.getElementById(gradeId).innerHTML += 
                (`<span>${defaultJson[grades][floats]}、</span>`);
            }
          }
        }
      }
    }

    console.log("generation finished");
  }
}

// ✅ 先定义 myfloatZone_AlltTest 函数，并添加 birthday_input_id 参数
function myfloatZone_AlltTest(tempFloats_arr, lengthtemp, dig, birthday_input_id) {
  var similarity = 8;
  let availableFloatsArr = [];
  let wantedFloat = document.getElementById(birthday_input_id).value.replace('-', '').replace('-', '');

  for (let i = 0; i < lengthtemp; i++) {
    let minFloat = tempFloats_arr[i].split("-")[0];
    let maxFloat = tempFloats_arr[i].split("-")[1];

    if ((maxFloat < wantedFloat / (10 ** dig)) || minFloat > wantedFloat / (10 ** dig)) {
      continue;
    } else {
      let averFloat = (wantedFloat / (10 ** dig) - minFloat) / (maxFloat - minFloat);
      let nine_floats = nineFloats_repeate(averFloat, dig);
      let tenAverTrade = tradeUp(getIeee754_32(nine_floats + getIeee754_32(averFloat)), minFloat, maxFloat);

      if (String((tenAverTrade * 10 ** dig)).substr(0, similarity) == wantedFloat) {
        availableFloatsArr.push(tempFloats_arr[i]);
      } else if (String((tenAverTrade * 10 ** dig)).substring(0, similarity) <= wantedFloat) {
        let simpleTenR_lower = tenAverTrade;
        let num = 1;
        while (simpleTenR_lower <= wantedFloat / (10 ** dig) &&
               String((simpleTenR_lower * 10 ** dig)).substr(0, similarity) != wantedFloat) {
          simpleTenR_lower = tradeUp(getIeee754_32(nine_floats + getIeee754_32(averFloat + num / (10 ** dig))),
                                     minFloat, maxFloat);
          num++;
        }
        if (String((simpleTenR_lower * 10 ** dig)).substr(0, similarity) == wantedFloat) {
          availableFloatsArr.push(tempFloats_arr[i]);
        }
      } else {
        let simpleTenR_greater = tenAverTrade;
        let num = 1;
        while (simpleTenR_greater >= wantedFloat / (10 ** dig) &&
               String((simpleTenR_greater * 10 ** dig)).substr(0, similarity) != wantedFloat) {
          simpleTenR_greater = tradeUp(getIeee754_32(nine_floats + getIeee754_32(averFloat - num / (10 ** dig))),
                                        minFloat, maxFloat);
          num++;
        }
        if (String((simpleTenR_greater * 10 ** dig)).substr(0, similarity) == wantedFloat) {
          availableFloatsArr.push(tempFloats_arr[i]);
        }
      }
    }
  }
  return availableFloatsArr;
}

// ✅ 再定义 testDig 并接收 birthday_input_id 参数
function testDig(dig, averFloat, tempFloats_arr, birthday_input_id) {
  var similarity = 8;
  let lengthtemp = tempFloats_arr.length;
  finalItems[dig] = myfloatZone_AlltTest(tempFloats_arr, lengthtemp, dig, birthday_input_id);
  console.log("testDig finished");
}

// ✅ 新增 updateGradeContent 函数
function updateGradeContent(gradeId, defaultJson, availableFloatsArr, floatText) {
  // 清空当前级别内容
  document.getElementById(gradeId).innerHTML = `<br /><span>${floatText}<span>`;

  // 获取对应中文的级别名称
  let chineseGradeName = '';
  switch(gradeId) {
    case 'industry': chineseGradeName = '工业级'; break;
    case 'mil-spec': chineseGradeName = '军规级'; break;
    case 'restricted': chineseGradeName = '受限级'; break;
    case 'classfied': chineseGradeName = '保密级'; break;
    case 'covert': chineseGradeName = '隐秘级'; break;
  }

  // 只处理指定级别
  if (chineseGradeName && defaultJson[chineseGradeName]) {
    for (let floats in defaultJson[chineseGradeName]) {
      if (in_arry(floats, availableFloatsArr)) {
        document.getElementById(gradeId).innerHTML += 
          (`<span>${defaultJson[chineseGradeName][floats]}、</span>`);
      }
    }
  }
}
