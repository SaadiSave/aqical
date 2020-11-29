document.addEventListener('DOMContentLoaded',() => {
    document.querySelectorAll('.output').forEach(result => {
        result.style.width = parseInt(window.innerWidth - 290);
    });
    document.querySelector('#type').onchange = () => {
        if (document.querySelector('#type').value === 'Comp'){
            document.querySelector('#system').innerHTML = '<option value="EvN">EAQI vs NAQI</option><option value="EvM">EAQI vs MMAQI</option><option value="MvN">MMAQI vs NAQI</option>';
            document.querySelector('#co').style.display = 'block';
            document.querySelectorAll('.output').forEach(result => {
                result.innerHTML = '';
            });
        } else {
            document.querySelector('#system').innerHTML = '<option value="EAQI">EAQI</option><option value="NAQI">NAQI</option><option value="MMAQI">MMAQI</option>';
            document.querySelector('#co').style.display = 'none';
            document.querySelector('#valueCO').value='';
            document.querySelectorAll('.output').forEach(result => {
                result.innerHTML = '';
            });
        }
    };
    document.querySelector('#input').addEventListener('reset',() => {
       document.querySelectorAll('.output').forEach(result => {
           result.innerHTML = '';
       });
       document.querySelector('#type').value="SI";
       document.querySelector('#system').innerHTML = '<option value="EAQI">EAQI</option><option value="NAQI">NAQI</option><option value="MMAQI">MMAQI</option>s';
       document.querySelector('#co').style.display = 'none';
       document.getElementById('message').children[0].innerHTML = '';
    });
    document.querySelector('#system').onchange = () => {
        document.querySelectorAll('.output').forEach(result => {
                result.innerHTML = '';
            });
            document.querySelector('#result3').style.backgroundColor = '#e0e2db';
            document.querySelector('#result3').color = 'black';
        if (document.querySelector('#type').value === "SI" && document.querySelector('#system').value === "EAQI") {
            document.querySelector('#co').style.display = 'none';
            ddocument.querySelector('#valueCO').value='';
        } else {
            document.querySelector('#co').style.display = 'block';
        }
    };
    document.querySelector('#submit').onclick = () => {
        let d = {
            'pm2': convert('pm2',parseInt(document.querySelector('#valuePM2').value),document.querySelector('#unitPM2').value),
            'pm10':convert('pm10',parseInt(document.querySelector('#valuePM10').value),document.querySelector('#unitPM10').value),
            'no2':convert('no2',parseInt(document.querySelector('#valueNO2').value),document.querySelector('#unitNO2').value),
            'so2':convert('so2',parseInt(document.querySelector('#valueSO2').value),document.querySelector('#unitSO2').value),
            'o3':convert('o3',parseInt(document.querySelector('#valueO3').value),document.querySelector('#unitO3').value),
            'co':convert('co',parseInt(document.querySelector('#valueCO').value),document.querySelector('#unitCO').value)
        };
        for (const key in d){
            if (isNaN(d[key])) {
                delete d[key];
            }
        }
        if (Object.keys(d).length !== 0){
            var a = new dict(Object.keys(d),Object.values(d));
            var b = new dict(Object.keys(d),Object.values(d));
            type = document.querySelector('#type').value;
            system = document.querySelector('#system').value;
            document.querySelector('#input').reset();
            if (type === "Comp"){
                if ((a.keys.length === 1) && (a.keys[0] === 'co')){
                    document.getElementById('message').children[0].innerHTML = 'Atleast 1 field other than CO required';
                } else {
                    document.getElementById('message').children[0].innerHTML = '';
                    if (system === "EvN"){
                        A = new Eaqi(a);A.setres();A.setdes();A.setcol();
                        O = new Naqi(b);O.setres();O.setdes();O.setcol();
                        idx = A.idx;
                        res = O.res;
                        document.querySelector('#result2').innerHTML = `NAQI<br>${res}<br>${O.des.replace(/\n/g,'<br>' )}`;
                        document.querySelector('#result2').style.backgroundColor = O.col;
                        document.querySelector('#result2').style.color = textcol(O.col);
                        document.querySelector('#result1').innerHTML = `EAQI<br>${A.res}<br>${A.des.replace(/\n/g,'<br>' )}`;
                        document.querySelector('#result1').style.backgroundColor = A.col;
                        document.querySelector('#result1').style.color = textcol(A.col);
                        if (res < 500){
                            b = compare([idx,6],[res,500]);
                            if (b > 0){
                                document.querySelector('#result3').innerHTML = `NAQI is ${b}% less than EAQI`;
                            } else {
                                b *= -1;
                                document.querySelector('#result3').innerHTML = `NAQI is ${b}% greater than EAQI`;
                            }
                        }
                    } else if (system === 'EvM') {
                        A = new Eaqi(a);A.setres();A.setdes();A.setcol();
                        O = new Mmaqi(b);O.setres();O.setdes();O.setcol();
                        idx = A.idx;
                        res = O.res;
                        document.querySelector('#result2').innerHTML = `MMAQI<br>${res}<br>${O.des.replace(/\n/g,'<br>' )}`;
                        document.querySelector('#result2').style.backgroundColor = O.col;
                        document.querySelector('#result2').style.color = textcol(O.col);
                        document.querySelector('#result1').innerHTML = `EAQI<br>${A.res}<br>${A.des.replace(/\n/g,'<br>' )}`;
                        document.querySelector('#result1').style.backgroundColor = A.col;
                        document.querySelector('#result1').style.color = textcol(A.col);
                        if (res < 500){
                            b = compare([idx,6],[res,500]);
                            if (b > 0){
                                document.querySelector('#result3').innerHTML = `MMAQI is ${b}% less than EAQI`;
                            } else {
                                b *= -1;
                                document.querySelector('#result3').innerHTML = `MMAQI is ${b}% greater than EAQI`;
                            }
                        }
                    } else if (system === 'MvN') {
                        A = new Naqi(a);A.setres();A.setdes();A.setcol();
                        O = new Mmaqi(b);O.setres();O.setdes();O.setcol();
                        resn = A.res;
                        resm = O.res;
                        document.querySelector('#result1').innerHTML = `MMAQI<br>${resm}<br>${O.des.replace(/\n/g,'<br>' )}`;
                        document.querySelector('#result1').style.backgroundColor = O.col;
                        document.querySelector('#result1').style.color = textcol(O.col);
                        document.querySelector('#result2').innerHTML = `NAQI<br>${resn}<br>${A.des.replace(/\n/g,'<br>' )}`;
                        document.querySelector('#result2').style.backgroundColor = A.col;
                        document.querySelector('#result2').style.color = textcol(A.col);
                        maxn = 500;
                        maxm = 500;
                        b = compare([resm, maxm],[resn,maxn]);
                        if (b > 0){
                            document.querySelector('#result3').innerHTML = `NAQI is ${b}% less than MMAQI`;
                        } else {
                            b *= -1;
                            document.querySelector('#result3').innerHTML = `NAQI is ${b}% greater than MMAQI`;
                        }
                    }
                }
            } else {
                document.getElementById('message').children[0].innerHTML = '';
                if (system === 'EAQI'){
                    A = new Eaqi(a);
                    A.setres();A.setdes();A.setcol();
                    document.querySelectorAll('.output').forEach(result => {
                        if (result.id !== 'result3'){
                            result.style.backgroundColor = A.col;
                            result.style.color = textcol(A.col);
                        }
                        result.style.display = 'block';
                    });
                    document.querySelector('#result1').innerHTML = A.res;
                    document.querySelector('#result2').innerHTML = A.des.replace(/\n/g,'<br>' );
                } else if (system === 'NAQI'){
                    A = new Naqi(a);
                    A.setres();A.setdes();A.setcol();
                    document.querySelectorAll('.output').forEach(result => {
                        if (result.id !== 'result3'){
                            result.style.backgroundColor = A.col;
                            result.style.color = textcol(A.col);
                        }
                        result.style.display = 'block';
                    });
                    document.querySelector('#result1').innerHTML = A.res;
                    document.querySelector('#result2').innerHTML = A.des.replace(/\n/g,'<br>' );
                } else {
                    A = new Mmaqi(a);
                    A.setres();A.setdes();A.setcol();
                    document.querySelectorAll('.output').forEach(result => {
                        if (result.id !== 'result3'){
                            result.style.backgroundColor = A.col;
                            result.style.color = textcol(A.col);
                        }
                        result.style.display = 'block';
                    });
                    document.querySelector('#result1').innerHTML = A.res;
                    document.querySelector('#result2').innerHTML = A.des.replace(/\n/g,'<br>' );
                }
            }
        }
    };
});
function isFloat(evt) {

    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else {
        //if dot sign entered more than once then don't allow to enter dot sign again. 46 is the code for dot sign
        var parts = evt.srcElement.value.split('.');
        if (parts.length > 1 && charCode == 46)
          {
            return false;
          }


        return true;

}
}
function textcol(col) {
    if ((col.length !== 7) || (col[0] !== '#')) {
        throw Error('Colour is not a valid hex string');
    }
    const r = parseInt(col.slice(1, 3), 16);
    const g = parseInt(col.slice(3, 5), 16);
    const b = parseInt(col.slice(5), 16);
    let [R, G, B] = [false, false, false];
    if (r <= 105) {
        R = true;
    }
    if (g <= 105) {
        G = true;
    }
    if (b <= 105) {
        B = true;
    }
    const x = (R && G) || (G && B) || (B && R);
    if (!x === true) {
        return '#000000';
    }
    else {
        return '#ffffff';
    }
}
function isMobile() {
    var check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
        check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};