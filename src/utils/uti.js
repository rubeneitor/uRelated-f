
export const session = {
    get: () => {
        return JSON.parse(localStorage.getItem("sessionData"));
    },

    set: data => {
        localStorage.setItem("sessionData", JSON.stringify(data));
    },

    del: () => {
        localStorage.removeItem("sessionData");
    }
};

export const getUrl = (route = "", includeToken = false) => {
    // let sessionData = session.get();
    let token = "";

    // if (includeToken) {
    //     if (sessionData) {
    //         token = "token=" + sessionData.token;
    //     }
    // }

    return `http://localhost:8000/api${route}${token}`;
};


export const verify = (userInput, isFilled, validation, min, max) => {
    let valid = false;

    //validamos si el cam(po se ha rellenado.

    if (isFilled !== 0 && userInput === "") {
        // console.log("debes de rellenar todos los campos");
        return valid;
    }

    //primero valido el tipo de dato que es y su formato.

    switch (validation) {
        case "password":
            //comprobacion password
            if (userInput.length < 4) {
                return valid;
            }

            break;

        case "email":
            //comprobacion e-mail
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(userInput)) {
                return valid;
            }

            break;

        case "length":
            //comprobacion longitud
            if (userInput.length < min) {
                return valid;
            }

            break;

        case "string":
            //comprobacion string
            if (!/[a-z]/gi.test(userInput)) {
                return valid;
            }

            break;

        case "phone":
            //comprobacion telefono
            if (!/[\d()+-]/g.test(userInput)) {
                return valid;
            }

            break;

        case "number":
            //comprobacion numeros
            if (!/[^[0-9]*$]/g.test(userInput)) {
                return valid;
            }

            break;

        case "postalCode":
            //código postal
            if (!/^\d+$/g.test(userInput)) {
                return valid;
            }

            break;

        case "numLetras":

            if (!/^[A-Za-z0-9]+$/gi.test(userInput)) {
                return valid;
            }

        break;

        case "date":
            //comprobacion fechas
            if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gi.test(userInput)) {
                return valid;
            }

            break;
            

        default:
            return valid = false;
            
    }

    return (valid = true);
};

export const muestraError = (message, timeout = 3, isError = true) => {
    // Pongo la clase
    let className = isError ? "error" : "success";
    this.setState({ messageClassName: className });

    // Pongo el mensaje
    this.setState({ message: message });

    // Ya estoy en loop
    if (this.state.errorTime > 0) {
        this.setState({ errorTime: timeout });
        return; // y salgo
    }

    this.setState({ errorTime: timeout }); // Entro por primera vez, pongo tiempo

    // Loop
    let loop = setInterval(() => {
        if (this.state.errorTime <= 0) {
            this.setState({ message: "" });
            clearInterval(loop); // salgo del loop
        }

        this.setState(preState => ({ errorTime: preState.errorTime - 1 }));
    }, 1000);
};


export const minMax = (n, min, max) => {
    return Math.max(Math.min(n, max), min);
};


export const numToStr = (numero, separador = ".") => {
    // Existe?
    if (!numero) {
        return 0;
    }

    // Convierto
    let strNum = numero.toString();

    // Pregunto
    if (strNum.length <= 3) {
        return strNum;
    }

    // Itero
    let arrNumeros = [];
    let digitos = 0;

    for (let _i = strNum.length - 1; _i >= 0; _i--) {
        arrNumeros.unshift(strNum.charAt(_i));
        digitos++;

        if (digitos === 3) {
            if (_i === 0) {
                break;
            }
            arrNumeros.unshift(separador);
            digitos = 0;
        }
    }

    return arrNumeros.join("");
};

