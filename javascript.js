function cpf(num) {
    var sum = 0;
    var validacao = 0;
    var eloPerdido = 0;
    var aux = 0;
    var count = 0;

    if(num[9] == 'x' || num[9] == 'X') {
        for(i = 10; i > 1; i--) {
            sum += (num[10-i]-'0') * i;
        }
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;
        for(i = 11; i > 2; i--) {
            sum += num[11-i]-'0';
        }
        sum+= validacao*2;
        num = num.replace("x",String.fromCharCode(validacao+48));
        num = num.replace("X",String.fromCharCode(validacao+48));
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;

        if(validacao == num[10] - '0')
        document.querySelector(".alert").innerHTML = "CPF = " + num;
        else {
            document.querySelector(".alert").style.color = "red";
            document.querySelector(".alert").innerHTML = "CPF Invalido!!!";
        }
    }
    else if(num[10] == 'x' || num[10] == 'X') {
        for(i = 10; i > 1; i--) {
            sum += (num[10-i]-'0') * i;
        }
        
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;

        if(validacao == num[9]-'0') {
            for(i = 11; i > 2; i--) {
                sum += num[11-i]-'0';
            }
            sum+= (num[9]-'0') * 2;
            validacao = 11 - (sum%11);
            validacao = validacao > 9 ? 0 : validacao;
            num = num.replace("x",String.fromCharCode(validacao+48));
            num = num.replace("X",String.fromCharCode(validacao+48));
            document.querySelector(".alert").innerHTML = "CPF = " + num;
        } else {
            document.querySelector(".alert").style.color = "red";
            document.querySelector(".alert").innerHTML = "CPF Invalido!!!";
        }
    }
    else{
        for(i = 10; i > 1; i--) {
            console.log("teste");
            if(num[10-i] != 'x' && num[10-i] != 'X') {
                sum += (num[10-i]-'0') * i;
            }
            else {
                eloPerdido = i;
            }
        }
        
        for(i = 0; i < 10; i++) {
            aux = sum + i*eloPerdido;

            validacao = 11 - (aux % 11);
            validacao = validacao > 9 ? 0 : validacao;

            if(validacao == num[9]-'0') {
                for(j = 11; j > 1; j--) {
                    if(num[11-j] != 'x' && num[11-j] != 'X') {
                        aux += (num[11-j]-'0');
                    }
                }
                aux+=validacao+i;
                validacao = 11 - (aux%11);
                validacao = validacao > 9 ? 0 : validacao;
                if(validacao == num[10] - '0') {                    
                    num = num.replace("x",String.fromCharCode(i+48));
                    num = num.replace("X",String.fromCharCode(i+48));
                    document.querySelector(".alert").innerHTML = "CPF = " + num;
                }
                else count++;
            } else count++;
        }
        if(count > 9) {
            document.querySelector(".alert").style.color = "red";
            document.querySelector(".alert").innerHTML = "CPF Invalido!!!";
        }
    }
}

function validarCPF(num) {
    var sum = 0;
    var validacao = 0;

    for(i = 10; i > 1; i--) {
        sum += (num[10-i]-'0') * i;
    }
    
    validacao = 11 - (sum % 11);
    validacao = validacao > 9 ? 0 : validacao;

    if(validacao == num[9]-'0') {
        for(i = 11; i > 2; i--) {
            sum += num[11-i]-'0';
        }
        sum+= validacao * 2;
        validacao = 11 - (sum%11);
        validacao = validacao > 9 ? 0 : validacao;
        if(validacao == num[10] - '0') {
            document.querySelector(".alert").style.color = "green";
            document.querySelector(".alert").innerHTML = "CPF Valido!!!";
        }
        else {
            document.querySelector(".alert").style.color = "red";
            document.querySelector(".alert").innerHTML = "CPF Invalido!!!";
        }
    } else {
        document.querySelector(".alert").style.color = "red";
        document.querySelector(".alert").innerHTML = "CPF Invalido!!!";
    }
}

function validar() {
    document.querySelector(".alert").style.color = "black";
    var num = document.getElementById("cpf-id").value;
    var incorrect = 0;
    var numbers = 0;
    var count = 0;
    if(num.length == 11) {
        for(i = 0; i < 11; i++) {
            if(num[i] >= '0' && num[i] <= '9') numbers++;
            else if(num[i] == 'x' || num[i] == 'X') count++;
            else {
                incorrect = 1;
                break;
            }
        }
        if(incorrect == 1) {
            document.querySelector(".alert").style.color = "red";
            document.querySelector(".alert").innerHTML = "Formato Invalido";
        }
        else {
            if(numbers == 10 && count == 1) cpf(num);
            else if(numbers == 11 && count == 0) validarCPF(num);
            else {
                document.querySelector(".alert").style.color = "red";
                document.querySelector(".alert").innerHTML = "Formato Invalido";
            }
        }
    }
    else if (num.length == 0) document.querySelector(".alert").innerHTML = "Insira um CPF";
    else {
        document.querySelector(".alert").style.color = "red";
        document.querySelector(".alert").innerHTML = "Formato Invalido";
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});
