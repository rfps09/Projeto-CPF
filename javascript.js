function cpf(num) {
    const numOriginal = num;
    var sum = 0;
    var validacao = 0;
    var eloPerdido = 0;
    var aux = 0;
    var count = 0;

    if(num[9] == 'x' || num[9] == 'X') {
        for(i = 10; i > 1; i--)
            sum += (num[10-i]-'0') * i;
        
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;
        for(i = 11; i > 2; i--)
            sum += num[11-i]-'0';
            
        sum += validacao*2;
        num = num.replace("x",String.fromCharCode(validacao+48));
        num = num.replace("X",String.fromCharCode(validacao+48));
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;

        if(validacao == num[10] - '0') {
            apresentarSaida("CPF = " + formatarCPF(num), "gray");
            atualizarTabela(formatarCPF(numOriginal), "CPF = " + formatarCPF(num));
        }
        else {
            apresentarSaida("CPF Inválido!", "red");
            atualizarTabela(formatarCPF(numOriginal), "CPF Inválido!");
        }
    }
    else if(num[10] == 'x' || num[10] == 'X') {
        for(i = 10; i > 1; i--)
            sum += (num[10-i]-'0') * i;
        
        
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;

        if(validacao == num[9]-'0') {
            for(i = 11; i > 2; i--)
                sum += num[11-i]-'0';
            
            sum += (num[9]-'0') * 2;
            validacao = 11 - (sum%11);
            validacao = validacao > 9 ? 0 : validacao;
            num = num.replace("x",String.fromCharCode(validacao+48));
            num = num.replace("X",String.fromCharCode(validacao+48));
            apresentarSaida("CPF = " + formatarCPF(num), "gray");
            atualizarTabela(formatarCPF(numOriginal), "CPF = " + formatarCPF(num));
            
        } else {
            apresentarSaida("CPF Inválido!", "red");
            atualizarTabela(formatarCPF(numOriginal), "CPF Inválido!");
        }
    }
    else {
        for(i = 10; i > 1; i--) {
            if(num[10-i] != 'x' && num[10-i] != 'X')
                sum += (num[10-i]-'0') * i;
            else
                eloPerdido = i;
        }
        
        for(i = 0; i < 10; i++) {
            aux = sum + i*eloPerdido;

            validacao = 11 - (aux % 11);
            validacao = validacao > 9 ? 0 : validacao;

            if(validacao == num[9]-'0') {
                for(j = 11; j > 1; j--)
                    if(num[11-j] != 'x' && num[11-j] != 'X')
                        aux += (num[11-j]-'0');
                    
                
                aux+=validacao+i;
                validacao = 11 - (aux%11);
                validacao = validacao > 9 ? 0 : validacao;
                if(validacao == num[10] - '0') {
                    num = num.replace("x",String.fromCharCode(i+48));
                    num = num.replace("X",String.fromCharCode(i+48));
                    apresentarSaida("CPF = " + formatarCPF(num), "gray");
                    atualizarTabela(formatarCPF(numOriginal), "CPF = " + formatarCPF(num));
                }
                else
                    count++;
            } else
                count++;
        }
        if(count > 9) {
            apresentarSaida("CPF Inválido!", "red");
            atualizarTabela(numOriginal, "CPF Inválido!");
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
        sum += validacao * 2;
        validacao = 11 - (sum%11);
        validacao = validacao > 9 ? 0 : validacao;
        if(validacao == num[10] - '0') {
            apresentarSaida("CPF Válido!", "green");
            atualizarTabela(formatarCPF(num), "CPF Válido!");
        }
        else {
            apresentarSaida("CPF Inválido!", "red");
            atualizarTabela(formatarCPF(num), "CPF Inválido!");
        }
    } else {
        apresentarSaida("CPF Inválido!", "red");
        atualizarTabela(formatarCPF(num), "CPF Inválido!");
    }
}

function validar() {
    var num = document.getElementById("cpf-id").value.replace(/[.-]/g, '');
    var incorrect = 0;
    var numbers = 0;
    var count = 0;
    if(num.length == 11) {
        for(i = 0; i < 11; i++) {
            if(num[i] >= '0' && num[i] <= '9')
                numbers++;
            else if(num[i] == 'x' || num[i] == 'X')
                count++;
            else {
                incorrect = 1;
                break;
            }
        }
        if(incorrect == 1)
            apresentarSaida("Formato Inválido", "red");
        
        else {
            if(numbers == 10 && count == 1)
                cpf(num);
            else if(numbers == 11 && count == 0)
                validarCPF(num);
            else 
                apresentarSaida("Formato Inválido", "red");
        }
    }
    else if (num.length == 0)
        apresentarSaida("Insira um CPF", "red");
    else
        apresentarSaida("Formato Inválido", "red");
}

document.addEventListener('keydown', (event) => {
    if (event.key == "Enter")
        event.preventDefault();
});

document.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});

$(document).ready(function() {
    $('#cpf-id').mask('000.000.000-00', {
        translation: {
            '0': {
                pattern: /[xX0-9]/
            }
        }
    });
});

function apresentarSaida(menssagem, textColor) {
    document.querySelector(".alert").innerHTML = menssagem
    document.querySelector(".alert").style.background = textColor
}

function atualizarTabela(entrada, resultado) {
    const tabela = document.getElementById("table-results");
    
    if (tabela.rows.length > 2)
        tabela.deleteRow(-1);
    linha = tabela.insertRow(0);
    
    linha.classList.add("odd:bg-white","even:bg-slate-200");
    const EntradaCell = linha.insertCell(0);
    const ResultadoCell = linha.insertCell(1);
    
    EntradaCell.textContent = entrada;
    ResultadoCell.textContent = resultado;
}

let formatarCPF = num => num.replace(/([xX\d]{3})([xX\d]{3})([xX\d]{3})([xX\d]{2})/, '$1.$2.$3-$4');

