import React from "react";
import axios from "axios";
import { session, getUrl, verify } from "../../utils/uti";
import Select from "react-select";
import "./addOferta.scss";

class addOferta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            titulo: "",
            ciudad: "",
            provincia: "",
            isActive: false,
            exp_requerida: "",
            jornada: "",
            salario: "",
            sector: "",
            num_vacantes: "",
            description: "",

            errores: []
        };

        this.pulsaRegistro = this.pulsaRegistro.bind(this);
    }

    resetState() {
        this.setState({
            step: 1,
            titulo: "",
            ciudad: "",
            provincia: "",
            isActive: false,
            exp_requerida: "",
            tipo_contrato: "",
            salario: 0,
            sector: "",
            num_vacantes: "",
            desc_general: "",

            errores: []
        });
    }

    handleChangeDrop = (ev, action) => {
        this.setState({ [action.name]: ev.value }, () => {});
    };

    handleChange = ev => {
        this.setState({ [ev.target.name]: ev.target.type === "number" ? +ev.target.value : ev.target.value });

        // Excepción para medir caracteres restantes en la descripción
        if (ev.target.name === "description") {
            this.updateDescriptionRemainingCharacters();
        }
    };

    handleChangeCheck = ev => {
        this.setState({ [ev.target.name]: ev.target.type === "number" ? +ev.target.checked : ev.target.checked });
    };

    updateDescriptionRemainingCharacters() {
        let ele = document.querySelector(".textAddInfo");

        if (!document.querySelector(".textAddInfo")) {
            ele = document.querySelector(".textAddInfo2");
        }

        let lenght = ele.value.length;
        let max = ele.maxLength;
        let remaining = document.querySelector("#descriptionRemainingCharacters");

        remaining.innerHTML = `${lenght}/${max}`;

        if (lenght >= max) {
            remaining.classList.add("error");
        } else {
            remaining.classList.remove("error");
        }
    }

    pulsaRegistro() {
        
        let verificado = true;
        let errors = [];

        //título
        if (!(verificado = verify(this.state.titulo, 1, "string"))) {
            errors.push("titulo");
        }

        //ciudad
        if (!(verificado = verify(this.state.ciudad, 1, "string"))) {
            errors.push("ciudad");
        }

        //sector
        if (!(verificado = verify(this.state.sector, 1, "string"))) {
            errors.push("sector");
        }

        //salario
        if (!(verificado = verify(this.state.salario, 1, "number"))) {
            errors.push("salario");
        }

        //vacantes
        if (!(verificado = verify(this.state.num_vacantes, 1, "number"))) {
            errors.push("num_vacantes");
        }

        //experiencia (no necesaria)

        //jornada
        if (!(verificado = verify(this.state.jornada, 1, "string"))) {
            errors.push("jornada");
        }

        //descripcion
        if (this.state.description === "") {
            errors.push("description");
            console.log("siiii");
        }

        if (errors.length) {
            verificado = false;
            this.setState({ errores: errors });
            return;
        }

        if (verificado) {
            this.registraDatos();
        }

    }

    async registraDatos() {

        let idEmpresa = session.get()?.visitor_id;
        let date = new Date().toISOString().slice(0,10); 
        
        try {

        
            //llamada a la DB para registrar la empresa
            let lBody = {
                idEmpresa: idEmpresa,
                titulo: this.state.titulo,
                ciudad: this.state.ciudad,
                salario: this.state.salario,
                sector: this.state.sector,
                vacantes: this.state.num_vacantes,
                experiencia: this.state.exp_requerida,
                jornada: this.state.jornada,
                description: this.state.description,
                fecha: date
            };


            await axios.post(getUrl(`/nuevaOferta`), lBody);
           
            //redirigimos
            setTimeout(() => {
                this.props.history.push("/ofertas");
            }, 1000);


        } catch (err) {
            console.log(err);
        }
    }

    errorCheck(arg) {
        let estiloError = "inputRegister";

        for (let _y of this.state.errores) {
            // eslint-disable-next-line
            if (arg == [_y]) {
                // eslint-disable-next-line
                if (arg == [_y] && arg == "description") {
                    estiloError = "textAddInfo2";
                    return estiloError;
                }

                // eslint-disable-next-line
                if (arg == [_y] && arg == "jornada") {
                    // estiloError = "sel2";
                    console.log("error select");
                    return estiloError;
                }

                estiloError = "inputRegister2";
                return estiloError;
            }
        }
        if (arg === "description") {
            estiloError = "textAddInfo";
            return estiloError;
        }
        estiloError = "inputRegister";
        return estiloError;
    }

    render() {
        return (
            <div className="registerMainO">
                <div className="registerOouter">
                    <div className="registerOinner">
                        <div className="registerOHeader">
                            <div className="registerOTitle">
                                <p className="registerOText mt5 ml3">Registro de oferta</p>
                                <p className="registerOText2">Rellena los campos y da de alta una nueva oferta</p>
                            </div>
                            <div className="registerOimg">
                                <img src="img/jigsaw2.png" alt="logojigsawO" />
                            </div>
                        </div>
                        <div className="registerOLine"></div>
                        <div className="registerOBody">
                            <div className="registerOBodyUp">
                                <div>
                                    <p className="cabeceraInput">Titulo</p>
                                    <input className={this.errorCheck("titulo")} maxLength="240" placeholder="" name="titulo" value={this.state.titulo} onChange={this.handleChange}></input>
                                    {/* <p className="errorInputText">{this.state.password_err}</p> */}
                                </div>
                                <div>
                                    <p className="cabeceraInput">Ciudad</p>
                                    <input className={this.errorCheck("ciudad")} maxLength="240" placeholder="" name="ciudad" value={this.state.ciudad} onChange={this.handleChange}></input>
                                    {/* <p className="errorInputText">{this.state.password_err}</p> */}
                                </div>
                                <div>
                                    <p className="cabeceraInput">Salario</p>
                                    <input className={this.errorCheck("salario")} maxLength="240" placeholder="" name="salario" value={this.state.salario} onChange={this.handleChange}></input>
                                    {/* <p className="errorInputText">{this.state.password_err}</p> */}
                                </div>
                                <div>
                                    <p className="cabeceraInput">Sector</p>
                                    <input className={this.errorCheck("sector")} maxLength="240" placeholder="" name="sector" value={this.state.sector} onChange={this.handleChange}></input>
                                    {/* <p className="errorInputText">{this.state.password_err}</p> */}
                                </div>
                                <div>
                                    <p className="cabeceraInput">Número de vacantes</p>
                                    <input
                                        className={this.errorCheck("num_vacantes")}
                                        maxLength="240"
                                        placeholder=""
                                        name="num_vacantes"
                                        value={this.state.num_vacantes}
                                        onChange={this.handleChange}
                                    ></input>
                                    {/* <p className="errorInputText">{this.state.password_err}</p> */}
                                </div>
                            </div>
                            <div className="registerOBodyMiddle">
                                <div className="sel">
                                    <p>Experiencia requerida</p>
                                    <Select
                                        placeholder=""
                                        name="exp_requerida"
                                        onChange={this.handleChangeDrop}
                                        options={[
                                            { value: "", label: "" },
                                            { value: "1", label: "1 año" },
                                            { value: "2", label: "2 años" },
                                            { value: "3", label: "5 años" },
                                            { value: "4", label: "+ de 5 años" }
                                        ]}
                                    />
                                </div>
                                <div className="sel">
                                    <p>Jornada</p>
                                    <Select
                                        placeholder=""
                                        name="jornada"
                                        onChange={this.handleChangeDrop}
                                        options={[
                                            { value: "Completa", label: "Completa" },
                                            { value: "Media Jornada", label: "Media Jornada" },
                                            { value: "Teletrabajo", label: "Teletrabajo" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="registerOBodyBottom mt5">
                                <div className="bottomContainer">
                                    <div className="descripcionOferta">
                                        <p className="cabeceraInput">Describe tu nueva oferta</p>
                                        <textarea
                                            className={this.errorCheck("description")}
                                            rows="5"
                                            cols="108"
                                            maxLength="2000"
                                            placeholder=""
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                        ></textarea>
                                        <span id="descriptionRemainingCharacters"></span>
                                    </div>
                                    <div className="botonContainer">
                                        <button
                                            className="registerButton mt5"
                                            onClick={() => {
                                                this.pulsaRegistro();
                                            }}
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default addOferta;
