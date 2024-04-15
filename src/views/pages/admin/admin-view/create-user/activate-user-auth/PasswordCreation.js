// ** React Imports
import { Link, useParams } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Button, Progress } from 'reactstrap'

import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import useJwt from "@src/auth/jwt/useJwt";
import { useState } from 'react'

// import { handleSuccess } from './sweet-alert'

let num = 0;
let upper = 0;
let lowe = 0;
let symb = 0;
let char = 0;

const ResetPasswordBasic = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const colorVal = (val) => {
    if (val <= 33) {
      return "danger";
    } else if (val <= 65 && val >= 34) {
      return "warning";
    } else if (val <= 100 && val >= 66) {
      // setpasswordStrength("Strength");
      return "success";
    }
  };

  const { uid, token } = useParams()
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [passwordStrength, setpasswordStrength] = useState("Very Week");
  const [progress, setProgress] = useState(0);

  const validatePassword = (data) => {
    const number = /[\d]/;
    const lowercase = /[a-z]/;
    const uppercase = /[A-Z]/;
    const specialsymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let passwordCardF = true;
    document.getElementById("passwordCard").style.display = "none";
    document.getElementById("passwordCard").style.transition = "all 2s ease";
    document.getElementById("passwordCard").style.height = "auto";
    document.getElementById("passwordCard").style.opacity = "1";
    if (number.test(data)) {
      document.getElementById("number").style.color = "green";
      document.getElementById("number").style.fontWeight = "900";
      const numberCheck = document.getElementById("number-x");
      numberCheck.classList.remove("fa-times");
      numberCheck.classList.add("fa-check");
      numberCheck.style.color = "green";
      num = 20;
    } else {
      document.getElementById("number").style.color = "red";
      document.getElementById("number").style.fontWeight = "900";
      const numberCheck = document.getElementById("number-x");
      numberCheck.classList.remove("fa-check");
      numberCheck.classList.add("fa-times");
      numberCheck.style.color = "red";
      passwordCardF = false;
      num = 0;
    }
    if (lowercase.test(data)) {
      document.getElementById("lowercase").style.color = "green";
      document.getElementById("lowercase").style.fontWeight = "900";
      const lowercaseCheck = document.getElementById("lowercase-x");
      lowercaseCheck.classList.remove("fa-times");
      lowercaseCheck.classList.add("fa-check");
      lowercaseCheck.style.color = "green";
      lowe = 20;
    } else {
      document.getElementById("lowercase").style.color = "red";
      document.getElementById("lowercase").style.fontWeight = "900";
      const lowercaseCheck = document.getElementById("lowercase-x");
      lowercaseCheck.classList.remove("fa-check");
      lowercaseCheck.classList.add("fa-times");
      lowercaseCheck.style.color = "red";
      passwordCardF = false;
      lowe = 0;
    }
    if (uppercase.test(data)) {
      document.getElementById("uppercase").style.color = "green";
      document.getElementById("uppercase").style.fontWeight = "900";
      const uppercaseCheck = document.getElementById("uppercase-x");
      uppercaseCheck.classList.remove("fa-times");
      uppercaseCheck.classList.add("fa-check");
      uppercaseCheck.style.color = "green";
      upper = 20;
    } else {
      document.getElementById("uppercase").style.color = "red";
      document.getElementById("uppercase").style.fontWeight = "900";
      const uppercaseCheck = document.getElementById("uppercase-x");
      uppercaseCheck.classList.remove("fa-check");
      uppercaseCheck.classList.add("fa-times");
      uppercaseCheck.style.color = "red";
      passwordCardF = false;
      upper = 0;
    }
    if (specialsymbols.test(data)) {
      document.getElementById("specialsymbols").style.color = "green";
      document.getElementById("specialsymbols").style.fontWeight = "900";
      const specialsymbolsCheck = document.getElementById("specialsymbols-x");
      specialsymbolsCheck.classList.remove("fa-times");
      specialsymbolsCheck.classList.add("fa-check");
      specialsymbolsCheck.style.color = "green";
      symb = 20;
    } else {
      document.getElementById("specialsymbols").style.color = "red";
      document.getElementById("specialsymbols").style.fontWeight = "900";
      const specialsymbolsCheck = document.getElementById("specialsymbols-x");
      specialsymbolsCheck.classList.remove("fa-check");
      specialsymbolsCheck.classList.add("fa-times");
      specialsymbolsCheck.style.color = "red";
      passwordCardF = false;
      symb = 0;
    }
    if (data.length <= 8) {
      document.getElementById("lengthofPassword").style.color = "red";
      document.getElementById("lengthofPassword-x").style.color = "red";
      document.getElementById("lengthofPassword").style.fontWeight = "900";
      const lengthofPasswordCheck =
        document.getElementById("lengthofPassword-x");
      lengthofPasswordCheck.classList.remove("fa-check");
      lengthofPasswordCheck.classList.add("fa-times");
      lengthofPasswordCheck.style.color = "red";
      passwordCardF = false;
      char = 0;
    } else {
      document.getElementById("lengthofPassword").style.color = "green";
      document.getElementById("lengthofPassword").style.fontWeight = "900";
      const lengthofPasswordCheck =
        document.getElementById("lengthofPassword-x");
      lengthofPasswordCheck.classList.remove("fa-times");
      lengthofPasswordCheck.classList.add("fa-check");
      lengthofPasswordCheck.style.color = "green";
      char = 20;
    }
    if (passwordCardF) {
      document.getElementById("passwordCard").style.display = "none";
    } else {
      document.getElementById("passwordCard").style.display = "block";
    }

    setPassword(data);
    if (confirm_password !== data && confirm_password != "") {
      document.getElementById("passwordNotMatch").style.display = "block";
    } else {
      document.getElementById("passwordNotMatch").style.display = "none";
    }
    let Strength = num + lowe + upper + symb + char;
    setProgress(Strength);
    if (Strength <= 33) {
      setpasswordStrength("Very Week");
      document.getElementById("strength").style.color = "#EA5354";
    } else if (Strength >= 34 && Strength <= 65) {
      document.getElementById("strength").style.color = "#FF9E43";
      setpasswordStrength("Week");
    } else if (Strength >= 66 && Strength <= 100) {
      setpasswordStrength("Strength");
      document.getElementById("strength").style.color = "#FF9E43";
    }
  };

  const strength = {
    fontSize: "15px",
    fontWeight: "bolder",
    marginLeft: "5px",
  };
  const validateConfirmPassword = (conf_password) => {
    setConfirmPassword(conf_password);
    if (conf_password !== password) {
      document.getElementById("passwordNotMatch").style.display = "block";
    } else {
      document.getElementById("passwordNotMatch").style.display = "none";
    }
  };

  const onSubmit = (data) => {
    const tempData = { ...data };
alert('yes')
    if (tempData.password === tempData.confirm_password) {
      // useJwt.resetPasswordOtpRese(uid, token, data).then((res) => {
      useJwt.changePassword(uid,token,{uid,token,...data}).then((res) => {
        if (res?.status === 202) {
          window.location = '/login'
        }
      }).catch((err) => {
        alert(err?.response?.data)
      })
    }
  }

  return (

        <Card className='w-100 h-100'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className='brand-text text-primary ms-1'>LockTrust</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              New Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Creat new password</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputPasswordToggle
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        validatePassword(e.target.value);
                      }} />
                  )}
                />
              </div>
              <div
                id="passwordCard"
                style={{
                  height: "%",
                  opacity: "0",
                  display: "none",
                }}
              >
                <div>
                  <p>
                    Password Strength:
                    <span id="strength" style={strength}>
                      {passwordStrength}
                    </span>
                  </p>
                  <Progress color={colorVal(progress)} value={progress} />
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="uppercase-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="uppercase">Atleast 1 uppercase</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="lowercase-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="lowercase">Atleast 1 lowercase</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="specialsymbols-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="specialsymbols">Atleast 1 special symbols</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="number-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="number">Atleast 1 number</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <i
                    id="lengthofPassword-x"
                    className="fa fa-times me-1"
                    aria-hidden="true"
                  ></i>
                  <p id="lengthofPassword">Atleast 8 Characters</p>
                </div>
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  Confirm Password
                </Label>
                <Controller
                  id='confirm_password'
                  name='confirm_password'
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputPasswordToggle
                      className='input-group-merge'
                      invalid={errors.confirm_password && true}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        validateConfirmPassword(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
              <b
                id="passwordNotMatch"
                style={{ display: "none", color: "red" }}
              >
                password not matched
              </b>
              <Button color='primary' block>
                Set New Password
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/pages/login-basic'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>

  )
}

export default ResetPasswordBasic