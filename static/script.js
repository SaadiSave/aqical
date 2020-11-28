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